package com.example.optilens.ui.fragment.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.Button
import android.widget.ImageButton
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.optilens.R
import com.example.optilens.data.model.Card
import com.example.optilens.databinding.FragmentHomeBinding
import com.example.optilens.ui.adapter.CardAdapter
import com.example.optilens.ui.fragment.test.cataract.CataractDialogFragment // Import CataractDialogFragment
import com.example.optilens.ui.fragment.test.blindness.BlindnessFragment

class HomeFragment : Fragment(R.layout.fragment_home) {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: CardAdapter
    private lateinit var cardList: List<Card>
    private lateinit var btnStartTest: Button
    private lateinit var imageButtonCataract: ImageButton
    private lateinit var imageButtonBlindness: ImageButton

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)

        // Initialize RecyclerView
        recyclerView = binding.cardRecyclerView
        recyclerView.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)

        // Initialize the card list
        cardList = listOf(
            Card(R.drawable.scan),
            Card(R.drawable.blindess),
            Card(R.drawable.articles),
            Card(R.drawable.scan),
            Card(R.drawable.blindess),
            Card(R.drawable.articles),
            Card(R.drawable.scan),
            Card(R.drawable.blindess),
            Card(R.drawable.articles)
        )

        // Set the adapter for the RecyclerView
        adapter = CardAdapter(cardList)
        recyclerView.adapter = adapter

        // Initialize the buttons
        imageButtonCataract = binding.imageButtonCataract
        imageButtonBlindness = binding.imageButtonBlindness
        btnStartTest = binding.btnStartTest

        // Set onClickListeners for the test buttons
        imageButtonCataract.setOnClickListener {
            markButtonAsSelected(binding.layoutCataract, binding.layoutBlindness)
            enableStartButton()
        }

        imageButtonBlindness.setOnClickListener {
            markButtonAsSelected(binding.layoutBlindness, binding.layoutCataract)
            enableStartButton()
        }

        // Handle the "Start Test" button click
        btnStartTest.setOnClickListener {
            navigateToSelectedTest()
        }
        return binding.root
    }

    private fun applyAnimation(view: View) {
        val scaleAnimation: Animation = AnimationUtils.loadAnimation(requireContext(), R.anim.scale_animation)
        view.startAnimation(scaleAnimation)
    }

    private fun markButtonAsSelected(selectedLayout: View, otherLayout: View) {
        // Highlight the selected layout and reset the other layout
        selectedLayout.setBackgroundColor(ContextCompat.getColor(requireContext(), R.color.selected_button))
        otherLayout.setBackgroundColor(ContextCompat.getColor(requireContext(), android.R.color.transparent))
    }

    private fun enableStartButton() {
        // Enable the "Start Test" button and change its color
        btnStartTest.isEnabled = true
        btnStartTest.setBackgroundColor(ContextCompat.getColor(requireContext(), R.color.primary))
    }

    private fun navigateToSelectedTest() {
        val fragment = when {
            binding.layoutCataract.background != null -> CataractDialogFragment() // Show CataractDialogFragment as overlay
            binding.layoutBlindness.background != null -> BlindnessFragment() // Navigate to Blindness Test
            else -> null
        }

        fragment?.let {
            if (it is CataractDialogFragment) {
                it.show(parentFragmentManager, "CataractDialogFragment") // Show CataractDialogFragment as an overlay
            } else {
                parentFragmentManager.beginTransaction()
                    .replace(R.id.fragmentContainer, it) // Replace with the new fragment
                    .addToBackStack(null) // Add to back stack for navigation
                    .commit()
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
