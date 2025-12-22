package com.ebenezer.coban.shared.data.repository

import com.ebenezer.coban.shared.data.models.Event
import com.ebenezer.coban.shared.data.models.Ministry
import com.ebenezer.coban.shared.data.models.Prayer
import com.ebenezer.coban.shared.data.models.Verse
import kotlinx.coroutines.delay

interface AppRepository {
    suspend fun getDailyVerse(): Verse
    suspend fun getUpcomingEvents(): List<Event>
    suspend fun getMinistries(): List<Ministry>
    suspend fun getPrayerRequests(): List<Prayer>
    suspend fun submitPrayerRequest(prayer: Prayer)
}

class MockAppRepository : AppRepository {
    override suspend fun getDailyVerse(): Verse {
        delay(500) // Simulate network
        return Verse(
            id = "1",
            reference = "Salmos 23:1",
            text = "Jehová es mi pastor; nada me faltará.",
            date = "2024-05-20"
        )
    }

    override suspend fun getUpcomingEvents(): List<Event> {
        delay(800)
        return listOf(
            Event(
                id = "1",
                title = "Servicio Dominical",
                description = "Acompáñanos en nuestro servicio de adoración.",
                date = "2024-05-26",
                time = "10:00 AM",
                location = "Templo Central"
            ),
            Event(
                id = "2",
                title = "Reunión de Jóvenes",
                description = "Tiempo de alabanza y palabra para jóvenes.",
                date = "2024-05-25",
                time = "04:00 PM",
                location = "Salón de Usos Múltiples"
            )
        )
    }

    override suspend fun getMinistries(): List<Ministry> {
        delay(600)
        return listOf(
            Ministry("1", "Alabanza", "Ministerio de adoración musical", "", "Juan Pérez"),
            Ministry("2", "Escuela Dominical", "Enseñanza para niños", "", "Ana López"),
            Ministry("3", "Ujieres", "Servicio y orden", "", "Carlos Ruiz")
        )
    }

    override suspend fun getPrayerRequests(): List<Prayer> {
        delay(700)
        return listOf(
            Prayer("1", "María G.", "Pido oración por sanidad.", 1716182400000, false),
            Prayer("2", "Anónimo", "Por provisión laboral.", 1716096000000, true)
        )
    }

    override suspend fun submitPrayerRequest(prayer: Prayer) {
        delay(1000)
        // In a real app, this would post to API
    }
}
