import SwiftUI

struct LiveView: View {
    var body: some View {
        NavigationView {
            ZStack {
                Color.ebenezerLightGray.ignoresSafeArea()

                VStack(spacing: 20) {
                    Text("Transmisión en Vivo")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.ebenezerBlue)
                        .padding(.top)

                    // Video Player placeholder
                    Rectangle()
                        .fill(Color.black)
                        .aspectRatio(16 / 9, contentMode: .fit)
                        .overlay(
                            Image(systemName: "play.fill")
                                .font(.system(size: 50))
                                .foregroundColor(.white)
                        )
                        .cornerRadius(10)
                        .padding()

                    Text(
                        "Estamos transmitiendo nuestros servicios para que puedas conectarte desde cualquier lugar."
                    )
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
                    .foregroundColor(.secondary)

                    Spacer()
                }
            }
            .navigationBarHidden(true)
        }
    }
}
