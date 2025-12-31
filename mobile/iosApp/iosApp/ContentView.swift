import SwiftUI

struct ContentView: View {
    @State private var selection = 0

    var body: some View {
        TabView(selection: $selection) {
            HomeView()
                .tabItem {
                    Label("Inicio", systemImage: "house.fill")
                }
                .tag(0)

            LiveView()
                .tabItem {
                    Label("En Vivo", systemImage: "play.tv.fill")
                }
                .tag(1)

            EventsView()
                .tabItem {
                    Label("Agenda", systemImage: "calendar")
                }
                .tag(2)

            NativePrayerView()
                .tabItem {
                    Label("Oración", systemImage: "hands.sparkles.fill")
                }
                .tag(3)

            ContactView()
                .tabItem {
                    Label("Contacto", systemImage: "envelope.fill")
                }
                .tag(4)
        }
        .accentColor(.ebenezerGold)
        .onAppear {
            let appearance = UITabBarAppearance()
            appearance.configureWithOpaqueBackground()
            appearance.backgroundColor = UIColor(Color.ebenezerBlue)

            UITabBar.appearance().standardAppearance = appearance
            UITabBar.appearance().scrollEdgeAppearance = appearance
        }
    }
}
