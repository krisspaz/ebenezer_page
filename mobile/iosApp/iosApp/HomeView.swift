import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationView {
            ZStack {
                Color.ebenezerLightGray.ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 20) {
                        // Hero Section
                        VStack(alignment: .leading, spacing: 10) {
                            Text("Bienvenido a")
                                .font(.title3)
                                .foregroundColor(.secondary)
                            Text("Ebenezer Cobán")
                                .font(.largeTitle)
                                .fontWeight(.bold)
                                .foregroundColor(.ebenezerBlue)

                            Rectangle()
                                .fill(Color.ebenezerGold)
                                .frame(width: 60, height: 4)
                                .cornerRadius(2)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal)
                        .padding(.top, 20)

                        // Banner/Featured
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color.ebenezerBlue)
                            .frame(height: 200)
                            .overlay(
                                VStack {
                                    Image(systemName: "play.circle.fill")
                                        .resizable()
                                        .frame(width: 50, height: 50)
                                        .foregroundColor(.white)
                                    Text("Última Prédica")
                                        .font(.headline)
                                        .foregroundColor(.white)
                                }
                            )
                            .padding(.horizontal)
                            .shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 5)

                        Spacer()
                    }
                }
            }
            .navigationBarHidden(true)
        }
    }
}
