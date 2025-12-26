import SwiftUI

// MARK: - Native Prayer View (Muro de Oración)
struct NativePrayerView: View {
    @State private var prayerText = ""
    @State private var authorName = ""
    @State private var prayers: [(id: UUID, name: String, text: String, count: Int)] = [
        (UUID(), "Marta L.", "Pido oración por mi hijo que está en el hospital.", 15),
        (UUID(), "Carlos R.", "Por sabiduría para tomar una decisión importante.", 8),
        (UUID(), "Familia Pérez", "Agradeciendo a Dios por un año más de vida.", 24),
        (UUID(), "Anónimo", "Por la paz en mi hogar.", 5),
    ]
    @State private var showingForm = false

    var body: some View {
        ZStack {
            Color(hex: "0f172a").ignoresSafeArea()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 8) {
                        Text("COMUNIDAD").font(.system(size: 12, weight: .bold)).tracking(4)
                            .foregroundColor(Color(hex: "14b8a6"))
                        Text("Muro de Oración").font(.system(size: 32, weight: .black))
                            .foregroundColor(.white)
                    }
                    .padding(.top, 60)

                    // Add Button
                    Button(action: { showingForm.toggle() }) {
                        HStack {
                            Image(systemName: "plus.circle.fill")
                            Text("Nueva Petición")
                        }
                        .font(.headline)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(
                            LinearGradient(
                                colors: [Color(hex: "F4C95D"), Color(hex: "d4a33d")],
                                startPoint: .leading, endPoint: .trailing)
                        )
                        .foregroundColor(Color(hex: "0f172a"))
                        .cornerRadius(16)
                        .shadow(color: Color(hex: "F4C95D").opacity(0.3), radius: 10)
                    }
                    .padding(.horizontal, 20)

                    if showingForm {
                        VStack(spacing: 16) {
                            TextField("Tu nombre", text: $authorName)
                                .padding()
                                .background(Color(hex: "0f172a"))
                                .cornerRadius(12)
                                .foregroundColor(.white)

                            TextEditor(text: $prayerText)
                                .frame(height: 80)
                                .padding(4)
                                .background(Color(hex: "0f172a"))
                                .cornerRadius(12)
                                .foregroundColor(.white)
                                .overlay(
                                    Text(prayerText.isEmpty ? "Escribe tu petición aquí..." : "")
                                        .foregroundColor(.gray)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 12)
                                        .allowsHitTesting(false),
                                    alignment: .topLeading
                                )

                            Button(action: {
                                if !prayerText.isEmpty && !authorName.isEmpty {
                                    withAnimation {
                                        prayers.insert((UUID(), authorName, prayerText, 0), at: 0)
                                        prayerText = ""
                                        authorName = ""
                                        showingForm = false
                                    }
                                }
                            }) {
                                Text("Publicar").fontWeight(.bold)
                                    .frame(maxWidth: .infinity)
                                    .padding()
                                    .background(Color(hex: "14b8a6"))
                                    .foregroundColor(.white)
                                    .cornerRadius(12)
                            }
                        }
                        .padding(20)
                        .background(RoundedRectangle(cornerRadius: 20).fill(Color(hex: "1e293b")))
                        .padding(.horizontal, 20)
                        .transition(.scale.combined(with: .opacity))
                    }

                    // Prayer List
                    VStack(spacing: 16) {
                        ForEach(prayers, id: \.id) { prayer in
                            VStack(alignment: .leading, spacing: 12) {
                                HStack {
                                    Circle()
                                        .fill(
                                            LinearGradient(
                                                colors: [
                                                    Color(hex: "14b8a6"), Color(hex: "0d9488"),
                                                ], startPoint: .topLeading,
                                                endPoint: .bottomTrailing)
                                        )
                                        .frame(width: 40, height: 40)
                                        .overlay(
                                            Text(String(prayer.name.prefix(1))).font(.headline)
                                                .foregroundColor(.white))

                                    VStack(alignment: .leading) {
                                        Text(prayer.name).font(.headline).foregroundColor(.white)
                                        Text("Hace un momento").font(.caption).foregroundColor(
                                            .gray)
                                    }
                                    Spacer()
                                }

                                Text("\"\(prayer.text)\"")
                                    .font(.body)
                                    .foregroundColor(.gray)
                                    .fixedSize(horizontal: false, vertical: true)

                                Rectangle()
                                    .fill(Color.white.opacity(0.1))
                                    .frame(height: 1)

                                HStack {
                                    Button(action: {
                                        if let index = prayers.firstIndex(where: {
                                            $0.id == prayer.id
                                        }) {
                                            prayers[index].count += 1
                                        }
                                    }) {
                                        HStack {
                                            Image(systemName: "hands.sparkles.fill")
                                            Text("Orar")
                                        }
                                        .font(.subheadline)
                                        .foregroundColor(Color(hex: "F4C95D"))
                                    }

                                    Spacer()

                                    Text("\(prayer.count) personas orando")
                                        .font(.caption)
                                        .foregroundColor(Color(hex: "14b8a6"))
                                }
                            }
                            .padding(20)
                            .background(
                                RoundedRectangle(cornerRadius: 24).fill(Color(hex: "1e293b"))
                            )
                            .padding(.horizontal, 20)
                        }
                    }
                    .padding(.bottom, 120)
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}
