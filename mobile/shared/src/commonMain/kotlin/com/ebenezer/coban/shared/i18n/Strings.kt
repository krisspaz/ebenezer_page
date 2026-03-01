package com.ebenezer.coban.shared.i18n

interface Strings {
    val appName: String
    val home: String
    val ministries: String
    val events: String
    val prayer: String
    val liveStream: String
    val settings: String
    val theme: String
    val language: String
    val dailyVerse: String
}

object StringsEs : Strings {
    override val appName = "Ebenezer Cobán"
    override val home = "Inicio"
    override val ministries = "Ministerios"
    override val events = "Eventos"
    override val prayer = "Oración"
    override val liveStream = "En Vivo"
    override val settings = "Ajustes"
    override val theme = "Tema"
    override val language = "Idioma"
    override val dailyVerse = "Versículo del Día"
}

object StringsEn : Strings {
    override val appName = "Ebenezer Cobán"
    override val home = "Home"
    override val ministries = "Ministries"
    override val events = "Events"
    override val prayer = "Prayer"
    override val liveStream = "Live"
    override val settings = "Settings"
    override val theme = "Theme"
    override val language = "Language"
    override val dailyVerse = "Daily Verse"
}

object StringsQeq : Strings {
    override val appName = "Ebenezer Cobán"
    override val home = "Chochochnal" // Aproximado/Placeholder
    override val ministries = "K'anjel"
    override val events = "Ch'utam"
    override val prayer = "Tijoc"
    override val liveStream = "Chi tzol"
    override val settings = "Xb'aanuhom"
    override val theme = "B'onol"
    override val language = "Aatinob'aal"
    override val dailyVerse = "Raqual Li Santil Hu"
}
