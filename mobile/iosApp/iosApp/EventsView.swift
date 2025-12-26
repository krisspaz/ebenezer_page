import SwiftUI

// MARK: - Events View
struct EventsView: View {
    let services = [
        ("DOM", "9:00", "AM", "Culto Dominical", "14b8a6"),
        ("DOM", "5:00", "PM", "Culto de Oración", "F4C95D"),
        ("MIÉ", "7:00", "PM", "Estudio Bíblico", "8b5cf6"),
        ("VIE", "7:00", "PM", "Reunión de Jóvenes", "ef4444"),
        ("SÁB", "4:00", "PM", "Culto de Niños", "14b8a6"),
    ]

    var body: some View {
        ZStack {
            Color(hex: "0f172a").ignoresSafeArea()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 24) {
                    VStack(spacing: 8) {
                        Text("AGENDA").font(.system(size: 12, weight: .bold)).tracking(4)
                            .foregroundColor(Color(hex: "F4C95D"))
                        Text("Eventos").font(.system(size: 32, weight: .black)).foregroundColor(
                            .white)
                    }
                    .padding(.top, 60)

                    VStack(spacing: 16) {
                        Text("PRÓXIMO CULTO").font(.system(size: 10, weight: .bold)).tracking(2)
                            .foregroundColor(Color(hex: "14b8a6"))
                        Text("Domingo").font(.system(size: 40, weight: .black)).foregroundColor(
                            .white)
                        HStack(spacing: 4) {
                            Text("9:00").font(.system(size: 50, weight: .black)).foregroundColor(
                                Color(hex: "F4C95D"))
                            Text("AM").font(.system(size: 20, weight: .bold)).foregroundColor(
                                Color(hex: "F4C95D")
                            ).offset(y: 10)
                        }
                        Text("Culto Dominical").font(.headline).foregroundColor(.gray)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 40)
                    .background(
                        RoundedRectangle(cornerRadius: 28).fill(Color(hex: "1e293b"))
                            .overlay(
                                RoundedRectangle(cornerRadius: 28).stroke(
                                    LinearGradient(
                                        colors: [Color(hex: "F4C95D").opacity(0.5), Color.clear],
                                        startPoint: .topLeading, endPoint: .bottomTrailing),
                                    lineWidth: 1))
                    )
                    .padding(.horizontal, 20)

                    VStack(alignment: .leading, spacing: 16) {
                        Text("Horario Semanal").font(.headline).foregroundColor(.white).padding(
                            .horizontal, 24)

                        ForEach(services, id: \.3) { service in
                            HStack(spacing: 16) {
                                Text(service.0).font(.system(size: 12, weight: .bold))
                                    .foregroundColor(.white)
                                    .frame(width: 44, height: 44)
                                    .background(
                                        RoundedRectangle(cornerRadius: 12).fill(
                                            Color(hex: service.4)))

                                VStack(alignment: .leading, spacing: 2) {
                                    Text(service.3).font(.system(size: 16, weight: .semibold))
                                        .foregroundColor(.white)
                                    Text("\(service.1) \(service.2)").font(.caption)
                                        .foregroundColor(.gray)
                                }
                                Spacer()
                            }
                            .padding(16)
                            .background(
                                RoundedRectangle(cornerRadius: 16).fill(Color(hex: "1e293b"))
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
