import SwiftUI
import shared

struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label(StringsEs.shared.home, systemImage: "house.fill")
                }
            
            MinistriesView()
                .tabItem {
                    Label(StringsEs.shared.ministries, systemImage: "person.3.fill")
                }
                
            EventsView()
                .tabItem {
                    Label(StringsEs.shared.events, systemImage: "calendar")
                }
            
            PrayerWallView()
                .tabItem {
                    Label(StringsEs.shared.prayer, systemImage: "hands.sparkles.fill")
                }
                
            LiveStreamView()
                .tabItem {
                    Label(StringsEs.shared.liveStream, systemImage: "play.tv.fill")
                }
                
            SettingsView()
                .tabItem {
                    Label(StringsEs.shared.settings, systemImage: "gearshape.fill")
                }
        }
        .accentColor(Color(hex: AppTheme.shared.lightColors.primary))
    }
}
