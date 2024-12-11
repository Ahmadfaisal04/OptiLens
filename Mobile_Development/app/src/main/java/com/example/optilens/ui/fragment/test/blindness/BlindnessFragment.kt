package com.example.optilens.ui.fragment.test.blindness

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.optilens.R

class BlindnessFragment : Fragment(R.layout.fragment_blindness) {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment_blindness, container, false)
    }
}
