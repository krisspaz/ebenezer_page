import SwiftUI

// MARK: - Home View
struct HomeView: View {
    let images = [
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800",
        "https://images.unsplash.com/photo-1519491050282-cf00c82424aa?w=800",
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
    ]
    @State private var currentIndex = 0

    // Daily Verse logic
    let dailyVerse = (
        text:
            "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
        reference: "Jeremías 29:11"
    )

    var body: some View {
        ZStack {
            LinearGradient(
                colors: [Color(hex: "0f172a"), Color(hex: "1e293b"), Color(hex: "0f172a")],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 0) {
                    // Hero Section
                    ZStack(alignment: .bottom) {
                        TabView(selection: $currentIndex) {
                            ForEach(0..<images.count, id: \.self) { index in
                                AsyncImage(url: URL(string: images[index])) { phase in
                                    switch phase {
                                    case .success(let image):
                                        image.resizable().aspectRatio(contentMode: .fill)
                                    case .failure(_):
                                        Rectangle().fill(Color(hex: "1e293b"))
                                    case .empty:
                                        Rectangle().fill(Color(hex: "1e293b")).overlay(
                                            ProgressView().tint(Color(hex: "F4C95D")))
                                    @unknown default:
                                        Rectangle().fill(Color(hex: "1e293b"))
                                    }
                                }
                                .tag(index)
                            }
                        }
                        .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
                        .frame(height: 380)

                        LinearGradient(
                            colors: [
                                .clear, Color(hex: "0f172a").opacity(0.8), Color(hex: "0f172a"),
                            ],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                        .frame(height: 200)

                        VStack(spacing: 16) {
                            Circle()
                                .fill(
                                    LinearGradient(
                                        colors: [Color(hex: "F4C95D"), Color(hex: "d4a33d")],
                                        startPoint: .topLeading, endPoint: .bottomTrailing)
                                )
                                .frame(width: 80, height: 80)
                                .overlay(
                                    Text("E").font(.system(size: 40, weight: .bold, design: .serif))
                                        .foregroundColor(Color(hex: "0f172a"))
                                )
                                .shadow(color: Color(hex: "F4C95D").opacity(0.5), radius: 20)

                            Text("EBENEZER")
                                .font(.system(size: 32, weight: .black))
                                .tracking(6)
                                .foregroundColor(.white)

                            Text("IGLESIA DE CRISTO • COBÁN")
                                .font(.system(size: 12, weight: .medium))
                                .tracking(3)
                                .foregroundColor(Color(hex: "14b8a6"))

                            HStack(spacing: 8) {
                                ForEach(0..<images.count, id: \.self) { index in
                                    Circle()
                                        .fill(
                                            currentIndex == index
                                                ? Color(hex: "F4C95D") : Color.white.opacity(0.3)
                                        )
                                        .frame(
                                            width: currentIndex == index ? 10 : 6,
                                            height: currentIndex == index ? 10 : 6
                                        )
                                        .animation(.spring(), value: currentIndex)
                                }
                            }
                            .padding(.top, 8)
                        }
                        .padding(.bottom, 20)
                    }

                    // Daily Verse Card
                    VStack(spacing: 16) {
                        HStack {
                            Image(systemName: "sun.max.fill")
                                .renderingMode(.original)
                                .font(.title3)
                            Text("Versículo del Día")
                                .font(.headline)
                                .foregroundColor(.white)
                            Spacer()
                        }

                        Text("\"\(dailyVerse.text)\"")
                            .font(.system(size: 18, weight: .medium, design: .serif))
                            .foregroundColor(.white)
                            .italic()
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)

                        Text(dailyVerse.reference)
                            .font(.subheadline)
                            .fontWeight(.bold)
                            .foregroundColor(Color(hex: "F4C95D"))
                    }
                    .padding(24)
                    .background(
                        RoundedRectangle(cornerRadius: 24).fill(Color(hex: "1e293b"))
                            .overlay(
                                RoundedRectangle(cornerRadius: 24).stroke(
                                    LinearGradient(
                                        colors: [Color(hex: "F4C95D").opacity(0.3), Color.clear],
                                        startPoint: .topLeading, endPoint: .bottomTrailing),
                                    lineWidth: 1))
                    )
                    .padding(.horizontal, 20)
                    .padding(.top, -30)  // Overlap the hero slightly or pull up close

                    // Welcome & Links
                    VStack(spacing: 16) {
                        Text("Donde cada persona encuentra su propósito en Cristo.")
                            .font(.body).foregroundColor(.gray).multilineTextAlignment(.center)
                            .padding(.top, 16)
                    }
                    .padding(.horizontal)

                    // Ministries
                    VStack(alignment: .leading, spacing: 20) {
                        HStack {
                            Text("Ministerios").font(.system(size: 22, weight: .bold))
                                .foregroundColor(.white)
                            Spacer()
                        }
                        .padding(.horizontal, 24)

                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 16) {
                                MinistryCardPro(
                                    icon: "music.note.list", title: "Alabanza",
                                    subtitle: "Música y adoración", gradient: ["14b8a6", "0d9488"])
                                MinistryCardPro(
                                    icon: "person.3.fill", title: "Jóvenes",
                                    subtitle: "Comunidad juvenil", gradient: ["F4C95D", "d4a33d"])
                                MinistryCardPro(
                                    icon: "figure.and.child.holdinghands", title: "Niños",
                                    subtitle: "Escuela dominical", gradient: ["ef4444", "dc2626"])
                                MinistryCardPro(
                                    icon: "heart.fill", title: "Matrimonios",
                                    subtitle: "Familias fuertes", gradient: ["8b5cf6", "7c3aed"])
                            }
                            .padding(.horizontal, 24)
                        }
                    }
                    .padding(.top, 32)
                    .padding(.bottom, 120)
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}

struct MinistryCardPro: View {
    let icon: String
    let title: String
    let subtitle: String
    let gradient: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: gradient.map { Color(hex: $0) }, startPoint: .topLeading,
                            endPoint: .bottomTrailing)
                    )
                    .frame(width: 50, height: 50)
                Image(systemName: icon).font(.system(size: 22)).foregroundColor(.white)
            }
            Text(title).font(.system(size: 16, weight: .bold)).foregroundColor(.white)
            Text(subtitle).font(.caption).foregroundColor(.gray)
        }
        .frame(width: 140)
        .padding(20)
        .background(RoundedRectangle(cornerRadius: 20).fill(Color(hex: "1e293b")))
    }
}
