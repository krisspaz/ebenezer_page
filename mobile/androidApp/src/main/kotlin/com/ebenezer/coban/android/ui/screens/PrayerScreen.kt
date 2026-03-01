package com.ebenezer.coban.android.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.ebenezer.coban.shared.data.models.Prayer
import com.ebenezer.coban.shared.di.ServiceLocator
import kotlinx.coroutines.launch
import androidx.compose.runtime.rememberCoroutineScope

@Composable
fun PrayerScreen() {
    val repository = ServiceLocator.appRepository
    val scope = rememberCoroutineScope()
    var prayers by remember { mutableStateOf<List<Prayer>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var newRequestContent by remember { mutableStateOf("") }
    var authorName by remember { mutableStateOf("") }

    LaunchedEffect(Unit) {
        try {
            prayers = repository.getPrayerRequests()
        } catch (e: Exception) {
            // Error handling
        } finally {
            isLoading = false
        }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.tertiaryContainer
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Realizar Petición",
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.onTertiaryContainer
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = authorName,
                        onValueChange = { authorName = it },
                        label = { Text("Nombre (Opcional)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = newRequestContent,
                        onValueChange = { newRequestContent = it },
                        label = { Text("Escribe tu petición aquí...") },
                        modifier = Modifier.fillMaxWidth(),
                        minLines = 3
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Button(
                        onClick = {
                            if (newRequestContent.isNotBlank()) {
                                scope.launch {
                                    val newPrayer = Prayer(
                                        id = "temp_${System.currentTimeMillis()}",
                                        author = authorName.ifBlank { "Anónimo" },
                                        content = newRequestContent,
                                        timestamp = System.currentTimeMillis(),
                                        isPrivate = false
                                    )
                                    repository.submitPrayerRequest(newPrayer)
                                    // Refresh list locally
                                    prayers = listOf(newPrayer) + prayers
                                    newRequestContent = ""
                                    authorName = ""
                                }
                            }
                        },
                        modifier = Modifier.align(Alignment.End)
                    ) {
                        Text("Enviar")
                    }
                }
            }
        }

        item {
            Text(
                text = "Muro de Oración",
                style = MaterialTheme.typography.titleLarge,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.padding(vertical = 8.dp)
            )
        }

        if (isLoading) {
            item {
                Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator()
                }
            }
        } else {
            items(prayers) { prayer ->
                PrayerCard(prayer)
            }
        }
    }
}

@Composable
fun PrayerCard(prayer: Prayer) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = prayer.author,
                style = MaterialTheme.typography.titleSmall,
                color = MaterialTheme.colorScheme.secondary
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = prayer.content,
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}
