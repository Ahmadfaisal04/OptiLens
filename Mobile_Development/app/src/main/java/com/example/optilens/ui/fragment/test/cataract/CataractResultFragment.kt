package com.example.optilens.ui.fragment.test.cataract

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.optilens.databinding.FragmentCataractResultBinding

class CataractResultFragment : Fragment() {

    private var _binding: FragmentCataractResultBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCataractResultBinding.inflate(inflater, container, false)

        // Get data from arguments
        val detectionResult = arguments?.getString("DETECTION_RESULT") ?: "No result"

        // Display the results
        binding.resultTextView.text = "Result: $detectionResult"

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
