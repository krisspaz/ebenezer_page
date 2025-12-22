import SwiftUI
import shared

struct MinistriesView: View {
    @State private var ministries: [Ministry] = []
    @State private var isLoading = true
    let repository = ServiceLocator.shared.appRepository

    let columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

    var body: some View {
        NavigationView {
            ScrollView {
                if isLoading {
                    ProgressView()
                        .padding()
                } else {
                    LazyVGrid(columns: columns, spacing: 16) {
                        ForEach(ministries, id: \.id) { ministry in
                            MinistryItem(ministry: ministry)
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle(StringsEs.shared.ministries)
            .onAppear {
                repository.getMinistries { data, error in
                    if let data = data {
                        self.ministries = data
                    }
                    self.isLoading = false
                }
            }
        }
    }
}

struct MinistryItem: View {
    let ministry: Ministry
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(ministry.name)
                .font(.headline)
                .foregroundColor(Color(hex: AppTheme.shared.lightColors.primary))
                .lineLimit(2)
            
            Text("Líder: \(ministry.leaderName)")
                .font(.caption)
                .foregroundColor(.secondary)
            
            Text(ministry.description_)
                .font(.caption2)
                .lineLimit(3)
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(12)
    }
}
