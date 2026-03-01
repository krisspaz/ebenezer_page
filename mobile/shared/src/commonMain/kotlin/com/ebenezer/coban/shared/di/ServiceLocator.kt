package com.ebenezer.coban.shared.di

import com.ebenezer.coban.shared.data.SettingsRepository
import com.russhwolf.settings.Settings

object ServiceLocator {
    private val settings: Settings by lazy { Settings() }
    
    val settingsRepository: SettingsRepository by lazy {
        SettingsRepository(settings)
    }
    
    val appRepository: com.ebenezer.coban.shared.data.repository.AppRepository by lazy {
        com.ebenezer.coban.shared.data.repository.MockAppRepository()
    }

    val accessibilityManager: com.ebenezer.coban.shared.accessibility.AccessibilityManager by lazy {
        com.ebenezer.coban.shared.accessibility.AccessibilityManager(settings)
    }
}
