import SwiftUI

// MARK: - Contact View
struct ContactView: View {
    @Environment(\.openURL) var openURL

    var body: some View {
        ZStack {
            Color(hex: "0f172a").ignoresSafeArea()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 24) {
                    VStack(spacing: 8) {
                        Text("CONEXIÓN").font(.system(size: 12, weight: .bold)).tracking(4)
                            .foregroundColor(Color(hex: "F4C95D"))
                        Text("Contacto").font(.system(size: 32, weight: .black)).foregroundColor(
                            .white)
                    }
                    .padding(.top, 60)

                    VStack(spacing: 16) {
                        ContactCardPro(
                            icon: "mappin.circle.fill", title: "Ubicación",
                            value: "4ta Calle 3-12 Zona 3\nCobán, Alta Verapaz", color: "ef4444")
                        ContactCardPro(
                            icon: "phone.circle.fill", title: "Teléfono", value: "+502 7951-0000",
                            color: "14b8a6")
                        ContactCardPro(
                            icon: "envelope.circle.fill", title: "Email",
                            value: "info@ebenezercoban.org", color: "F4C95D")
                        ContactCardPro(
                            icon: "clock.circle.fill", title: "Horario",
                            value: "Lun - Vie: 9:00 - 17:00", color: "8b5cf6")
                    }
                    .padding(.horizontal, 20)

                    VStack(spacing: 20) {
                        Text("Síguenos").font(.headline).foregroundColor(.white)

                        HStack(spacing: 20) {
                            Button(action: {
                                if let url = URL(string: "https://facebook.com") {
                                    openURL(url)
                                }
                            }) {
                                SocialButtonPro(icon: "globe", name: "Facebook", color: "3b5998")
                            }
                            Button(action: {
                                if let url = URL(
                                    string: "https://youtube.com/@IglesiadeCristoEbenezerCoba")
                                {
                                    openURL(url)
                                }
                            }) {
                                SocialButtonPro(
                                    icon: "play.rectangle.fill", name: "YouTube", color: "ff0000")
                            }
                            Button(action: {
                                if let url = URL(string: "https://instagram.com") {
                                    openURL(url)
                                }
                            }) {
                                SocialButtonPro(
                                    icon: "camera.fill", name: "Instagram", color: "e1306c")
                            }
                        }
                    }
                    .padding(24)
                    .frame(maxWidth: .infinity)
                    .background(RoundedRectangle(cornerRadius: 24).fill(Color(hex: "1e293b")))
                    .padding(.horizontal, 20)
                    .padding(.bottom, 120)
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}

struct ContactCardPro: View {
    let icon: String
    let title: String
    let value: String
    let color: String

    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: icon).font(.system(size: 36)).foregroundColor(Color(hex: color))
            VStack(alignment: .leading, spacing: 4) {
                Text(title).font(.caption).foregroundColor(.gray)
                Text(value).font(.system(size: 15, weight: .medium)).foregroundColor(.white)
            }
            Spacer()
        }
        .padding(20)
        .background(RoundedRectangle(cornerRadius: 20).fill(Color(hex: "1e293b")))
    }
}

struct SocialButtonPro: View {
    let icon: String
    let name: String
    let color: String

    var body: some View {
        VStack(spacing: 8) {
            Circle().fill(Color(hex: color)).frame(width: 56, height: 56)
                .overlay(Image(systemName: icon).font(.system(size: 24)).foregroundColor(.white))
            Text(name).font(.caption2).foregroundColor(.gray)
        }
    }
}
