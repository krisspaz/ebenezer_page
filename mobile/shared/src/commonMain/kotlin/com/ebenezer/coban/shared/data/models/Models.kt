package com.ebenezer.coban.shared.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Ministry(
    val id: String,
    val name: String,
    val description: String,
    val imageUrl: String,
    val leaderName: String
)

@Serializable
data class Event(
    val id: String,
    val title: String,
    val description: String,
    val date: String, // ISO 8601 format
    val time: String,
    val location: String,
    val imageUrl: String? = null
)

@Serializable
data class Prayer(
    val id: String,
    val author: String,
    val content: String,
    val timestamp: Long,
    val isPrivate: Boolean
)

@Serializable
data class Verse(
    val id: String,
    val reference: String,
    val text: String,
    val date: String // YYYY-MM-DD
)
