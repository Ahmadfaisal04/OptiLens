package com.example.optilens.ui.activity

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.optilens.R

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)  // Make sure this matches your layout file

        // Handle Login button click
        val loginButton = findViewById<Button>(R.id.loginButton)
        loginButton.setOnClickListener {
            // Navigate to HomeActivity when login button is clicked
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish() // Optional: finish LoginActivity so it doesn't remain in the back stack
        }

        // Handle Sign Up link click
        val signUpLink = findViewById<TextView>(R.id.signUpLink)
        signUpLink.setOnClickListener {
            // Navigate to SignupActivity when Sign Up link is clicked
            val intent = Intent(this, SignUpActivity::class.java)
            startActivity(intent)
        }

        // Optionally, you can handle 'Forgot Password' functionality or Google login if required
    }
}
