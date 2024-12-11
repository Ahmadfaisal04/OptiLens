package com.example.optilens.ui.activity

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.optilens.R

class SignUpActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)

        // Initialize views
        val signUpButton = findViewById<Button>(R.id.signUpButton)
        val loginLink = findViewById<TextView>(R.id.signInLink)

        // Intent to go to LoginActivity
        loginLink.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        // Intent to go to HomeActivity after sign up
        signUpButton.setOnClickListener {
            // Add sign-up validation here (e.g., checking fields)
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()  // Close SignUpActivity so that the user cannot go back
        }
    }
}
