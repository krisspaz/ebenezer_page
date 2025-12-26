import SwiftUI
import UIKit

// MARK: - Color Extension
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a: UInt64
        let r: UInt64
        let g: UInt64
        let b: UInt64
        switch hex.count {
        case 3: (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default: (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB, red: Double(r) / 255, green: Double(g) / 255, blue: Double(b) / 255,
            opacity: Double(a) / 255)
    }
}

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
