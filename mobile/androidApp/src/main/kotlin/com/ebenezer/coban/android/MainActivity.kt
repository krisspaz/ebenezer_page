package com.ebenezer.coban.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.ebenezer.coban.android.ui.navigation.Navigation
import com.ebenezer.coban.android.ui.theme.EbenezerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            EbenezerTheme {
                Navigation()
            }
        }
    }
}
