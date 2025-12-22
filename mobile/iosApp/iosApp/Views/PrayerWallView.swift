import SwiftUI
import shared

struct PrayerWallView: View {
    @State private var prayers: [Prayer] = []
    @State private var isLoading = true
    @State private var newPrayerText = ""
    @State private var authorName = ""
    
    let repository = ServiceLocator.shared.appRepository
    
    var body: some View {
        NavigationView {
            VStack {
                // Submission Form
                VStack(spacing: 12) {
                    Text(StringsEs.shared.prayer)
                        .font(.headline)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    TextField("Nombre (Opcional)", text: $authorName)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                    
                    TextField("Escribe tu petición...", text: $newPrayerText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                    
                    Button(action: submitPrayer) {
                        Text("Enviar Petición")
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 8)
                            .background(Color(hex: AppTheme.shared.lightColors.primary))
                            .foregroundColor(.white)
                            .cornerRadius(8)
                    }
                    .disabled(newPrayerText.isEmpty)
                }
                .padding()
                .background(Color(UIColor.systemGroupedBackground))
                
                // List
                List {
                    if isLoading {
                        ProgressView()
                    } else {
                        ForEach(prayers, id: \.id) { prayer in
                            PrayerRow(prayer: prayer)
                        }
                    }
                }
                .listStyle(PlainListStyle())
            }
            .navigationTitle(StringsEs.shared.prayer)
            .onAppear {
                loadPrayers()
            }
        }
    }
    
    func loadPrayers() {
        repository.getPrayerRequests { data, error in
            if let data = data {
                self.prayers = data
            }
            self.isLoading = false
        }
    }
    
    func submitPrayer() {
        let newPrayer = Prayer(
            id: "temp_\(Date().timeIntervalSince1970)",
            author: authorName.isEmpty ? "Anónimo" : authorName,
            content: newPrayerText,
            timestamp: Int64(Date().timeIntervalSince1970 * 1000),
            isPrivate: false
        )
        
        repository.submitPrayerRequest(prayer: newPrayer) { _ in
            self.prayers.insert(newPrayer, at: 0)
            self.newPrayerText = ""
            self.authorName = ""
        }
    }
}

struct PrayerRow: View {
    let prayer: Prayer
    
    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            Text(prayer.author)
                .font(.subheadline)
                .fontWeight(.bold)
                .foregroundColor(Color(hex: AppTheme.shared.lightColors.secondary))
            
            Text(prayer.content)
                .font(.body)
                .padding(.bottom, 4)
        }
        .padding(.vertical, 4)
    }
}
