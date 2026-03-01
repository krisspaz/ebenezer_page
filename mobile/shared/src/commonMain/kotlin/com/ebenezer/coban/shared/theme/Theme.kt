package com.ebenezer.coban.shared.theme

enum class ThemeMode {
    SYSTEM,
    LIGHT,
    DARK
}

data class AppColors(
    val primary: Long,
    val onPrimary: Long,
    val secondary: Long,
    val onSecondary: Long,
    val background: Long,
    val onBackground: Long,
    val surface: Long,
    val onSurface: Long
)

object AppTheme {
    val lightColors = AppColors(
        primary = 0xFFF59E0B, // Amber 500
        onPrimary = 0xFFFFFFFF,
        secondary = 0xFF1E3A8A, // Blue 900
        onSecondary = 0xFFFFFFFF,
        background = 0xFFFFFFFF,
        onBackground = 0xFF1F2937,
        surface = 0xFFF3F4F6,
        onSurface = 0xFF1F2937
    )

    val darkColors = AppColors(
        primary = 0xFFFBBF24, // Amber 400
        onPrimary = 0xFF000000,
        secondary = 0xFF3B82F6, // Blue 500
        onSecondary = 0xFFFFFFFF,
        background = 0xFF111827, // Gray 900
        onBackground = 0xFFF9FAFB,
        surface = 0xFF1F2937, // Gray 800
        onSurface = 0xFFF9FAFB
    )
}
