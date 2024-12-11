package com.example.optilens.ui.activity

import android.annotation.SuppressLint
import android.os.Build
import android.os.Bundle
import android.widget.ImageView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.example.optilens.R
import com.example.optilens.ui.fragment.history.HistoryFragment
import com.example.optilens.ui.fragment.home.HomeFragment
import com.example.optilens.ui.fragment.optiedu.OptieduFragment
import com.example.optilens.ui.fragment.profile.ProfileFragment
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {

    @SuppressLint("UseCompatLoadingForColorStateLists")
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Inisialisasi Bottom Navigation dan NavController
        val bottomNavigationView: BottomNavigationView = findViewById(R.id.bottom_navigation)

        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .replace(R.id.nav_host_fragment, HomeFragment())
                .commit()
        }

        // Setup Bottom Navigation dengan NavController
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            val selectedFragment:   Fragment = when (item.itemId) {
                R.id.nav_home -> HomeFragment()
                R.id.nav_optiedu -> OptieduFragment()
                R.id.nav_history -> HistoryFragment()
                R.id.nav_profile -> ProfileFragment()
                else -> HomeFragment()
            }
            supportFragmentManager.beginTransaction()
                .replace(R.id.nav_host_fragment, selectedFragment)
                .commit()

            true
        }
    }
}
