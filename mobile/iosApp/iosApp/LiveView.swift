import AVFoundation
import SwiftUI

// MARK: - Live View with REAL Audio
struct LiveView: View {
    @ObservedObject private var radioPlayer = RadioPlayer.shared
    @Environment(\.openURL) var openURL

    var body: some View {
        ZStack {
            Color(hex: "0f172a").ignoresSafeArea()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 24) {
                    VStack(spacing: 8) {
                        Text("EN VIVO").font(.system(size: 12, weight: .bold)).tracking(4)
                            .foregroundColor(Color(hex: "14b8a6"))
                        Text("Transmisiones").font(.system(size: 32, weight: .black))
                            .foregroundColor(.white)
                    }
                    .padding(.top, 60)

                    // Radio Card
                    VStack(spacing: 0) {
                        ZStack {
                            LinearGradient(
                                colors: [Color(hex: "14b8a6").opacity(0.2), Color(hex: "0f172a")],
                                startPoint: .top, endPoint: .bottom)

                            VStack(spacing: 20) {
                                HStack(spacing: 4) {
                                    ForEach(0..<20, id: \.self) { i in
                                        RoundedRectangle(cornerRadius: 2)
                                            .fill(Color(hex: "14b8a6"))
                                            .frame(
                                                width: 4,
                                                height: radioPlayer.isPlaying
                                                    ? CGFloat.random(in: 10...50) : 10
                                            )
                                            .animation(
                                                .easeInOut(duration: 0.3).repeatForever(
                                                    autoreverses: true
                                                ).delay(Double(i) * 0.05),
                                                value: radioPlayer.isPlaying)
                                    }
                                }
                                .frame(height: 60)

                                Image(systemName: "radio.fill").font(.system(size: 50))
                                    .foregroundColor(Color(hex: "14b8a6"))
                            }
                        }
                        .frame(height: 180)

                        VStack(spacing: 16) {
                            Text("Radio Ebenezer").font(.system(size: 24, weight: .bold))
                                .foregroundColor(.white)
                            Text(
                                radioPlayer.isPlaying ? "🔴 Reproduciendo ahora..." : "En vivo 24/7"
                            ).font(.subheadline).foregroundColor(.gray)

                            Button(action: { radioPlayer.togglePlay() }) {
                                HStack(spacing: 12) {
                                    Image(
                                        systemName: radioPlayer.isPlaying
                                            ? "pause.fill" : "play.fill"
                                    ).font(.system(size: 20))
                                    Text(radioPlayer.isPlaying ? "Pausar" : "Escuchar Ahora").font(
                                        .system(size: 16, weight: .bold))
                                }
                                .foregroundColor(Color(hex: "0f172a"))
                                .padding(.horizontal, 32)
                                .padding(.vertical, 16)
                                .background(
                                    Capsule().fill(
                                        LinearGradient(
                                            colors: [Color(hex: "14b8a6"), Color(hex: "0d9488")],
                                            startPoint: .leading, endPoint: .trailing))
                                )
                                .shadow(color: Color(hex: "14b8a6").opacity(0.4), radius: 20, y: 10)
                            }
                        }
                        .padding(24)
                    }
                    .background(RoundedRectangle(cornerRadius: 28).fill(Color(hex: "1e293b")))
                    .padding(.horizontal, 20)

                    // YouTube Section
                    VStack(alignment: .leading, spacing: 16) {
                        HStack {
                            Image(systemName: "play.rectangle.fill").foregroundColor(.red)
                            Text("YouTube").font(.headline).foregroundColor(.white)
                        }

                        Button(action: {
                            if let url = URL(
                                string: "https://www.youtube.com/@IglesiadeCristoEbenezerCoba")
                            {
                                openURL(url)
                            }
                        }) {
                            HStack {
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("Canal de YouTube").font(.system(size: 18, weight: .bold))
                                        .foregroundColor(.white)
                                    Text("Ver últimos servicios").font(.caption).foregroundColor(
                                        .gray)
                                }
                                Spacer()
                                Image(systemName: "arrow.up.right").font(
                                    .system(size: 20, weight: .bold)
                                ).foregroundColor(.red)
                            }
                            .padding(20)
                            .background(
                                RoundedRectangle(cornerRadius: 16).fill(Color(hex: "1e293b"))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 16).stroke(
                                            Color.red.opacity(0.3), lineWidth: 1)))
                        }
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 120)
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}
