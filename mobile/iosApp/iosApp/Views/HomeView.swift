import SwiftUI
import shared

struct HomeView: View {
    @State private var dailyVerse: Verse?
    @State private var isLoading = true
    
    // In a real app we'd use a ViewModel, keeping it simple for now
    let repository = ServiceLocator.shared.appRepository
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    if isLoading {
                        ProgressView()
                            .padding()
                    } else if let verse = dailyVerse {
                        DailyVerseCard(verse: verse)
                    }
                    
                    Text("Bienvenido a Ebenezer")
                        .font(.title2)
                        .foregroundColor(Color(hex: AppTheme.shared.lightColors.primary))
                        .padding(.top)
                }
                .padding()
            }
            .navigationTitle(StringsEs.shared.appName)
            .onAppear {
                loadData()
            }
        }
    }
    
    func loadData() {
        repository.getDailyVerse { verse, error in
            if let verse = verse {
                self.dailyVerse = verse
            }
            self.isLoading = false
        }
    }
}

struct DailyVerseCard: View {
    let verse: Verse
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(StringsEs.shared.dailyVerse)
                .font(.caption)
                .foregroundColor(.secondary)
                .textCase(.uppercase)
            
            Text(verse.text)
                .font(.body)
                .italic()
                .padding(.vertical, 4)
            
            Text(verse.reference)
                .font(.headline)
                .foregroundColor(Color(hex: AppTheme.shared.lightColors.primary))
                .frame(maxWidth: .infinity, alignment: .trailing)
        }
        .padding()
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(12)
        .shadow(radius: 2)
    }
}
