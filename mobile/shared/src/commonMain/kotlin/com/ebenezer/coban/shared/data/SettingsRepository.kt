package com.ebenezer.coban.shared.data

import com.ebenezer.coban.shared.theme.ThemeMode
import com.russhwolf.settings.Settings

class SettingsRepository(private val settings: Settings) {
    
    companion object {
        private const val KEY_THEME = "app_theme"
        private const val KEY_LANGUAGE = "app_language"
    }

    var themeMode: ThemeMode
        get() {
            val ordinal = settings.getInt(KEY_THEME, ThemeMode.SYSTEM.ordinal)
            return ThemeMode.values().getOrElse(ordinal) { ThemeMode.SYSTEM }
        }
        set(value) {
            settings.putInt(KEY_THEME, value.ordinal)
        }

    var languageCode: String
        get() = settings.getString(KEY_LANGUAGE, "es")
        set(value) {
            settings.putString(KEY_LANGUAGE, value)
        }
}
