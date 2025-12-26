import SwiftUI
import UIKit

struct ContentView: View {
    @State private var selectedTab = 0

    init() {
        let appearance = UITabBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backgroundColor = UIColor(Color(hex: "0f172a"))
        appearance.stackedLayoutAppearance.selected.iconColor = UIColor(Color(hex: "F4C95D"))
        appearance.stackedLayoutAppearance.selected.titleTextAttributes = [
            .foregroundColor: UIColor(Color(hex: "F4C95D"))
        ]
        appearance.stackedLayoutAppearance.normal.iconColor = UIColor.gray
        appearance.stackedLayoutAppearance.normal.titleTextAttributes = [
            .foregroundColor: UIColor.gray
        ]
        UITabBar.appearance().standardAppearance = appearance
        UITabBar.appearance().scrollEdgeAppearance = appearance
    }

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem {
                    Image(systemName: selectedTab == 0 ? "house.fill" : "house")
                    Text("Inicio")
                }
                .tag(0)

            LiveView()
                .tabItem {
                    Image(systemName: selectedTab == 1 ? "play.tv.fill" : "play.tv")
                    Text("En Vivo")
                }
                .tag(1)

            EventsView()
                .tabItem {
                    Image(systemName: selectedTab == 2 ? "calendar.circle.fill" : "calendar.circle")
                    Text("Eventos")
                }
                .tag(2)

            NativePrayerView()
                .tabItem {
                    Image(systemName: selectedTab == 3 ? "hands.sparkles.fill" : "hands.sparkles")
                    Text("Oración")
                }
                .tag(3)

            ContactView()
                .tabItem {
                    Image(
                        systemName: selectedTab == 4
                            ? "person.crop.circle.fill" : "person.crop.circle")
                    Text("Contacto")
                }
                .tag(4)
        }
        .preferredColorScheme(.dark)
    }
}

#Preview {
    ContentView()
}
