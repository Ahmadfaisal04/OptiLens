package com.example.optilens.ui.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.optilens.R
import com.example.optilens.data.model.Card

class CardAdapter(private val cardList: List<Card>) : RecyclerView.Adapter<CardAdapter.CardViewHolder>() {

    // ViewHolder to hold the card views
    class CardViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val imageView: ImageView = view.findViewById(R.id.card_image)
    }

    // Inflate the card layout and create ViewHolder
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CardViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.card_item_layout, parent, false)
        return CardViewHolder(view)
    }

    // Bind the data to the card item
    override fun onBindViewHolder(holder: CardViewHolder, position: Int) {
        val card = cardList[position]
        holder.imageView.setImageResource(card.imageResId)
    }

    override fun getItemCount(): Int = cardList.size
}

