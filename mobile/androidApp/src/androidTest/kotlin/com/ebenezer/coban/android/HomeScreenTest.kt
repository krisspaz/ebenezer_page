package com.ebenezer.coban.android

import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.assertIsDisplayed
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class HomeScreenTest {

    @get:Rule
    val composeTestRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun testHomeContentIsDisplayed() {
        // Check if "Bienvenido a Ebenezer" title is displayed
        composeTestRule.onNodeWithText("Bienvenido a Ebenezer").assertIsDisplayed()
    }
}
