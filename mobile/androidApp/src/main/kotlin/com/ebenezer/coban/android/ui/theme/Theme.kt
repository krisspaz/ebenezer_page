package com.ebenezer.coban.android.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat
import com.ebenezer.coban.shared.theme.AppTheme

private val DarkColorScheme = darkColorScheme(
    primary = Color(AppTheme.darkColors.primary),
    onPrimary = Color(AppTheme.darkColors.onPrimary),
    secondary = Color(AppTheme.darkColors.secondary),
    onSecondary = Color(AppTheme.darkColors.onSecondary),
    background = Color(AppTheme.darkColors.background),
    onBackground = Color(AppTheme.darkColors.onBackground),
    surface = Color(AppTheme.darkColors.surface),
    onSurface = Color(AppTheme.darkColors.onSurface)
)

private val LightColorScheme = lightColorScheme(
    primary = Color(AppTheme.lightColors.primary),
    onPrimary = Color(AppTheme.lightColors.onPrimary),
    secondary = Color(AppTheme.lightColors.secondary),
    onSecondary = Color(AppTheme.lightColors.onSecondary),
    background = Color(AppTheme.lightColors.background),
    onBackground = Color(AppTheme.lightColors.onBackground),
    surface = Color(AppTheme.lightColors.surface),
    onSurface = Color(AppTheme.lightColors.onSurface)
)

@Composable
fun EbenezerTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = false, // Disabled for brand consistency but can be enabled
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
