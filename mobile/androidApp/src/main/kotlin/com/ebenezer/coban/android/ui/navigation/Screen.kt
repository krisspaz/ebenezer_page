package com.ebenezer.coban.android.ui.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Ministries : Screen("ministries")
    object Events : Screen("events")
    object Prayer : Screen("prayer")
    object LiveStream : Screen("livestream")
    object Settings : Screen("settings")
}
