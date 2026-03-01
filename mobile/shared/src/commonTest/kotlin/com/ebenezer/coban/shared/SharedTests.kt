package com.ebenezer.coban.shared

import com.ebenezer.coban.shared.i18n.StringsEs
import com.ebenezer.coban.shared.theme.ThemeMode
import com.russhwolf.settings.MapSettings
import com.ebenezer.coban.shared.data.SettingsRepository
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class SharedTests {

    @Test
    fun testStrings() {
        assertEquals("Ebenezer Cobán", StringsEs.appName)
        assertEquals("Inicio", StringsEs.home)
    }

    @Test
    fun testSettingsRepository() {
        val settings = MapSettings()
        val repo = SettingsRepository(settings)

        // Default should be SYSTEM
        assertEquals(ThemeMode.SYSTEM, repo.themeMode)

        // Change to DARK
        repo.themeMode = ThemeMode.DARK
        assertEquals(ThemeMode.DARK, repo.themeMode)
        
        // Persistence check
        assertEquals(ThemeMode.DARK.ordinal, settings.getInt("app_theme", -1))
    }
}
