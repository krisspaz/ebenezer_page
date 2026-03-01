package com.ebenezer.coban.shared

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform
