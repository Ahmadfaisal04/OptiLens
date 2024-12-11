package com.example.optilens.ui.activity

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.optilens.R

class WelcomeActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_welcome) // Pastikan layout file sesuai

        // Temukan button "Get Started"
        val btnGetStarted = findViewById<Button>(R.id.btnGetStarted)

        // Menambahkan OnClickListener ke button
        btnGetStarted.setOnClickListener {
            // Membuat Intent untuk navigasi ke SignUpActivity
            val intent = Intent(this, SignUpActivity::class.java)
            startActivity(intent)
        }
    }
}
