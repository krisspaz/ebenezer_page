import SwiftUI
import shared

@main
struct iOSApp: App {
    init() {
        // Initialize Koin DI from shared module if exposed or needed
        // Assuming shared module might have an init helper, but for now standard init
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
