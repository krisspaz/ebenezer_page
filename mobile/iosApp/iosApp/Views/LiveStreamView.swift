import SwiftUI
import shared

struct LiveStreamView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text(StringsEs.shared.liveStream)
                    .font(.largeTitle)
                    .foregroundColor(Color(hex: AppTheme.shared.lightColors.primary))
                    .padding()
                
                // Video Player Placeholder
                ZStack {
                    Color.black
                    
                    Image(systemName: "play.fill")
                        .resizable()
                        .frame(width: 50, height: 50)
                        .foregroundColor(.white)
                }
                .aspectRatio(16/9, contentMode: .fit)
                .padding()
                
                Text("Servicio Dominical")
                    .font(.title2)
                    .padding(.top)
                
                Text("Estamos transmitiendo en vivo a través de YouTube y Facebook Live.")
                    .multilineTextAlignment(.center)
                    .padding()
                
                Spacer()
            }
            .navigationTitle(StringsEs.shared.liveStream)
        }
    }
}
