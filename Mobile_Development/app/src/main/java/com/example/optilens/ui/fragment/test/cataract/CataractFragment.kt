package com.example.optilens.ui.fragment.test.cataract

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.provider.MediaStore
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.DialogFragment
import androidx.navigation.Navigation
import androidx.navigation.findNavController
import androidx.navigation.fragment.findNavController
import com.example.optilens.R
import com.example.optilens.databinding.FragmentCataractBinding
import com.example.optilens.helper.ImageDetectionHelper

class CataractDialogFragment : DialogFragment() {

    private var _binding: FragmentCataractBinding? = null
    private val binding get() = _binding!!
    private val CAMERA_REQUEST_CODE = 100
    private val GALLERY_REQUEST_CODE = 101

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        dialog?.window?.setBackgroundDrawableResource(android.R.color.transparent)

        _binding = FragmentCataractBinding.inflate(inflater, container, false)

        // Set up click listeners
        binding.btnCamera.setOnClickListener {
            openCamera()
        }

        binding.btnGallery.setOnClickListener {
            openGallery()
        }

        binding.closeButton.setOnClickListener {
            dismiss() // Close the overlay
        }

        return binding.root
    }

    override fun onStart() {
        super.onStart()
        dialog?.window?.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
        dialog?.window?.setBackgroundDrawableResource(android.R.color.transparent)
    }

    @SuppressLint("QueryPermissionsNeeded")
    private fun openCamera() {
        val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        if (cameraIntent.resolveActivity(requireActivity().packageManager) != null) {
            startActivityForResult(cameraIntent, CAMERA_REQUEST_CODE)
        } else {
            Toast.makeText(requireContext(), "Camera not available", Toast.LENGTH_SHORT).show()
        }
    }

    @SuppressLint("QueryPermissionsNeeded")
    private fun openGallery() {
        val galleryIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        if (galleryIntent.resolveActivity(requireActivity().packageManager) != null) {
            startActivityForResult(galleryIntent, GALLERY_REQUEST_CODE)
        } else {
            Toast.makeText(requireContext(), "Gallery not available", Toast.LENGTH_SHORT).show()
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (resultCode == Activity.RESULT_OK) {
            when (requestCode) {
                CAMERA_REQUEST_CODE -> {
                    val imageBitmap = data?.extras?.get("data") as? Bitmap
                    imageBitmap?.let { handleImageResult(it) } ?: showError("Failed to capture image")
                }
                GALLERY_REQUEST_CODE -> {
                    val imageUri = data?.data
                    if (imageUri != null) {
                        try {
                            val imageBitmap = MediaStore.Images.Media.getBitmap(requireContext().contentResolver, imageUri)
                            handleImageResult(imageBitmap)
                        } catch (e: Exception) {
                            showError("Failed to load image from gallery")
                        }
                    } else {
                        showError("Failed to load image")
                    }
                }
            }
        } else {
            Toast.makeText(requireContext(), "Action canceled", Toast.LENGTH_SHORT).show()
        }
    }

    private fun showError(message: String) {
        Toast.makeText(requireContext(), message, Toast.LENGTH_SHORT).show()
    }


    private fun handleImageResult(bitmap: Bitmap) {
        val helper = ImageDetectionHelper(requireContext(), "OptiLens_model.tflite")
        val imageSize = 224 // Adjust based on your model's input size
        val results = helper.detectImage(bitmap, imageSize)

        // Process results (detected class)
        val detectedClass = results.indexOf(results.maxOrNull())
        val resultMessage = "Detected class: $detectedClass"

        // Send result to ResultFragment
        sendResultToFragment(resultMessage)
    }

    private fun sendResultToFragment(result: String) {
        val bundle = Bundle().apply {
            putString("DETECTION_RESULT", result)
        }
        val navController = Navigation.findNavController(requireActivity(), R.id.nav_host_fragment)
        // Using requireActivity() to get the NavController from the activity context
        requireActivity().findNavController(R.id.nav_host_fragment).navigate(R.id.action_cataractFragment_to_resultFragment, bundle)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
