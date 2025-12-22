package com.ebenezer.coban.android.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.ebenezer.coban.android.ui.screens.*

@Composable
fun Navigation() {
    val navController = rememberNavController()
    
    NavHost(navController = navController, startDestination = Screen.Home.route) {
        composable(Screen.Home.route) { HomeScreen() }
        composable(Screen.Ministries.route) { MinistriesScreen() }
        composable(Screen.Events.route) { EventsScreen() }
        composable(Screen.Prayer.route) { PrayerScreen() }
        composable(Screen.LiveStream.route) { LiveStreamScreen() }
        composable(Screen.Settings.route) { SettingsScreen() }
    }
}
