import SwiftUI
import shared

struct EventsView: View {
    @State private var events: [Event] = []
    @State private var isLoading = true
    let repository = ServiceLocator.shared.appRepository
    
    var body: some View {
        NavigationView {
            List {
                if isLoading {
                    HStack {
                        Spacer()
                        ProgressView()
                        Spacer()
                    }
                } else {
                    ForEach(events, id: \.id) { event in
                        EventRow(event: event)
                    }
                }
            }
            .navigationTitle(StringsEs.shared.events)
            .onAppear {
                repository.getUpcomingEvents { data, error in
                    if let data = data {
                        self.events = data
                    }
                    self.isLoading = false
                }
            }
        }
    }
}

struct EventRow: View {
    let event: Event
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(event.title)
                .font(.headline)
                .foregroundColor(Color(hex: AppTheme.shared.lightColors.primary))
            
            HStack {
                Image(systemName: "calendar")
                Text("\(event.date) • \(event.time)")
            }
            .font(.caption)
            .foregroundColor(.secondary)
            
            HStack {
                Image(systemName: "location.fill")
                Text(event.location)
            }
            .font(.caption)
            .foregroundColor(.secondary)
            
            Text(event.description_)
                .font(.body)
                .padding(.top, 4)
        }
        .padding(.vertical, 8)
    }
}
