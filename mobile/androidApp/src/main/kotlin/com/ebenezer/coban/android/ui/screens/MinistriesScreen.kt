package com.ebenezer.coban.android.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
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
import com.ebenezer.coban.shared.data.models.Ministry
import com.ebenezer.coban.shared.di.ServiceLocator

@Composable
fun MinistriesScreen() {
    val repository = ServiceLocator.appRepository
    var ministries by remember { mutableStateOf<List<Ministry>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            ministries = repository.getMinistries()
        } catch (e: Exception) {
            // Error
        } finally {
            isLoading = false
        }
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(
            text = "Nuestros Ministerios",
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        if (isLoading) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        } else {
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                items(ministries) { ministry ->
                    MinistryCard(ministry)
                }
            }
        }
    }
}

@Composable
fun MinistryCard(ministry: Ministry) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = ministry.name,
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = "Líder: ${ministry.leaderName}",
                style = MaterialTheme.typography.labelSmall,
                modifier = Modifier.padding(top = 4.dp)
            )
            Text(
                text = ministry.description,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 8.dp),
                maxLines = 3
            )
        }
    }
}
