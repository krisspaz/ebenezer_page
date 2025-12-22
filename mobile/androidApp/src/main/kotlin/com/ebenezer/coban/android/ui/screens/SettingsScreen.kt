package com.ebenezer.coban.android.ui.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Slider
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import com.ebenezer.coban.shared.accessibility.FontScale
import com.ebenezer.coban.shared.di.ServiceLocator
import com.ebenezer.coban.shared.theme.ThemeMode

@Composable
fun SettingsScreen() {
    val settingsRepository = ServiceLocator.settingsRepository
    val accessibilityManager = ServiceLocator.accessibilityManager
    
    var themeMode by remember { mutableStateOf(settingsRepository.themeMode) }
    var language by remember { mutableStateOf(settingsRepository.languageCode) }
    var highContrast by remember { mutableStateOf(accessibilityManager.isHighContrastEnabled) }
    var fontScale by remember { mutableStateOf(accessibilityManager.fontScale) }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(
            text = "Ajustes",
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.primary
        )

        Spacer(modifier = Modifier.height(24.dp))
        
        Text(text = "Tema", style = MaterialTheme.typography.titleMedium)
        Column(Modifier.selectableGroup()) {
            ThemeOption("Sistema", themeMode == ThemeMode.SYSTEM) { 
                themeMode = ThemeMode.SYSTEM; settingsRepository.themeMode = ThemeMode.SYSTEM 
            }
            ThemeOption("Claro", themeMode == ThemeMode.LIGHT) { 
                themeMode = ThemeMode.LIGHT; settingsRepository.themeMode = ThemeMode.LIGHT 
            }
            ThemeOption("Oscuro", themeMode == ThemeMode.DARK) { 
                themeMode = ThemeMode.DARK; settingsRepository.themeMode = ThemeMode.DARK 
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
        Text(text = "Accesibilidad", style = MaterialTheme.typography.titleMedium)
        
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Alto Contraste", modifier = Modifier.weight(1f))
            Switch(
                checked = highContrast,
                onCheckedChange = { 
                    highContrast = it
                    accessibilityManager.isHighContrastEnabled = it
                }
            )
        }
        
        Text("Tamaño de Fuente: ${fontScale.name}", style = MaterialTheme.typography.bodyMedium)
        Slider(
            value = fontScale.ordinal.toFloat(),
            onValueChange = { 
                val newScale = FontScale.values()[it.toInt()]
                fontScale = newScale
                accessibilityManager.fontScale = newScale
            },
            valueRange = 0f..(FontScale.values().size - 1).toFloat(),
            steps = FontScale.values().size - 2
        )
    }
}

@Composable
fun ThemeOption(text: String, selected: Boolean, onClick: () -> Unit) {
    Row(
        Modifier
            .fillMaxWidth()
            .height(48.dp)
            .selectable(selected = selected, onClick = onClick, role = Role.RadioButton),
        verticalAlignment = Alignment.CenterVertically
    ) {
        RadioButton(selected = selected, onClick = null)
        Text(text = text, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(start = 16.dp))
    }
}
