import SwiftUI

struct ContactView: View {
    var body: some View {
        NavigationView {
            ZStack {
                Color.ebenezerLightGray.ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 20) {
                        // Map Placeholder
                        Rectangle()
                            .fill(Color.gray.opacity(0.3))
                            .frame(height: 200)
                            .overlay(Text("Mapa de Ubicación"))
                            .cornerRadius(10)
                            .padding()

                        VStack(alignment: .leading, spacing: 15) {
                            ContactRow(
                                icon: "mappin.circle.fill", text: "8a. Calle 1-23 Zona 4, Cobán")
                            ContactRow(icon: "phone.fill", text: "+502 7952 1234")
                            ContactRow(icon: "envelope.fill", text: "info@ebenezercoban.org")
                        }
                        .padding()
                        .background(Color.white)
                        .cornerRadius(10)
                        .padding(.horizontal)

                        Spacer()
                    }
                }
            }
            .navigationTitle("Contáctanos")
        }
    }
}

struct ContactRow: View {
    let icon: String
    let text: String

    var body: some View {
        HStack(spacing: 15) {
            Image(systemName: icon)
                .foregroundColor(.ebenezerGold)
                .frame(width: 24)
            Text(text)
                .font(.body)
                .foregroundColor(.primary)
            Spacer()
        }
    }
}
