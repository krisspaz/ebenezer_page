package com.ebenezer.coban.shared.accessibility

import com.russhwolf.settings.Settings

enum class FontScale(val multiplier: Float) {
    SMALL(0.85f),
    NORMAL(1.0f),
    LARGE(1.15f),
    EXTRA_LARGE(1.3f)
}

class AccessibilityManager(private val settings: Settings) {
    
    companion object {
        private const val KEY_FONT_SCALE = "acc_font_scale"
        private const val KEY_HIGH_CONTRAST = "acc_high_contrast"
    }

    var fontScale: FontScale
        get() {
            val ordinal = settings.getInt(KEY_FONT_SCALE, FontScale.NORMAL.ordinal)
            return FontScale.values().getOrElse(ordinal) { FontScale.NORMAL }
        }
        set(value) {
            settings.putInt(KEY_FONT_SCALE, value.ordinal)
        }

    var isHighContrastEnabled: Boolean
        get() = settings.getBoolean(KEY_HIGH_CONTRAST, false)
        set(value) {
            settings.putBoolean(KEY_HIGH_CONTRAST, value)
        }
}
