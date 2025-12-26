import AVFoundation
import SwiftUI
import UIKit

struct ContentView: View {
    @State private var selectedTab = 0
    @ObservedObject private var radioPlayer = RadioPlayer.shared

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
        ZStack(alignment: .bottom) {
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
                        Image(
                            systemName: selectedTab == 2
                                ? "calendar.circle.fill" : "calendar.circle")
                        Text("Eventos")
                    }
                    .tag(2)

                NativePrayerView()
                    .tabItem {
                        Image(
                            systemName: selectedTab == 3 ? "hands.sparkles.fill" : "hands.sparkles")
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

            // Floating Mini Player - appears when radio is playing and not on LiveView tab
            if radioPlayer.isPlaying && selectedTab != 1 {
                MiniPlayerView(
                    radioPlayer: radioPlayer,
                    onTap: {
                        selectedTab = 1  // Go to Live tab when tapped
                    }
                )
                .transition(.move(edge: .bottom).combined(with: .opacity))
                .padding(.bottom, 49)  // Height of tab bar
            }
        }
        .preferredColorScheme(.dark)
        .animation(.spring(response: 0.3), value: radioPlayer.isPlaying)
    }
}

// MARK: - Mini Player View (Floating)
struct MiniPlayerView: View {
    @ObservedObject var radioPlayer: RadioPlayer
    var onTap: () -> Void

    var body: some View {
        HStack(spacing: 16) {
            // Animated bars
            HStack(spacing: 3) {
                ForEach(0..<5, id: \.self) { i in
                    RoundedRectangle(cornerRadius: 2)
                        .fill(Color(hex: "14b8a6"))
                        .frame(
                            width: 3, height: radioPlayer.isPlaying ? CGFloat.random(in: 8...20) : 8
                        )
                        .animation(
                            .easeInOut(duration: 0.4).repeatForever(autoreverses: true).delay(
                                Double(i) * 0.1),
                            value: radioPlayer.isPlaying
                        )
                }
            }
            .frame(width: 24, height: 24)

            VStack(alignment: .leading, spacing: 2) {
                Text("Radio Ebenezer")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(.white)
                Text("🔴 En vivo")
                    .font(.system(size: 11))
                    .foregroundColor(Color(hex: "14b8a6"))
            }

            Spacer()

            // Play/Pause button
            Button(action: { radioPlayer.togglePlay() }) {
                Image(systemName: radioPlayer.isPlaying ? "pause.fill" : "play.fill")
                    .font(.system(size: 20))
                    .foregroundColor(.white)
                    .frame(width: 40, height: 40)
                    .background(Circle().fill(Color(hex: "14b8a6")))
            }

            // Close button
            Button(action: { radioPlayer.pause() }) {
                Image(systemName: "xmark")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(.gray)
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color(hex: "1e293b"))
                .shadow(color: Color.black.opacity(0.3), radius: 10, y: -5)
        )
        .padding(.horizontal, 12)
        .onTapGesture {
            onTap()
        }
    }
}

#Preview {
    ContentView()
}
