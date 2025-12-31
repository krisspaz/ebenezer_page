import SwiftUI

struct EventsView: View {
    var body: some View {
        NavigationView {
            ZStack {
                Color.ebenezerLightGray.ignoresSafeArea()

                List {
                    Section(header: Text("Próximos Eventos")) {
                        EventRow(date: "Dom 30", title: "Culto Dominical", time: "10:00 AM")
                        EventRow(date: "Mar 02", title: "Oración y Ayuno", time: "07:00 PM")
                        EventRow(date: "Jue 04", title: "Estudio Bíblico", time: "07:30 PM")
                    }
                }
                .listStyle(InsetGroupedListStyle())
            }
            .navigationTitle("Agenda")
        }
    }
}

struct EventRow: View {
    let date: String
    let title: String
    let time: String

    var body: some View {
        HStack {
            VStack(alignment: .center) {
                Text(date.prefix(3).uppercased())
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.ebenezerGold)
                Text(date.suffix(2))
                    .font(.title3)
                    .fontWeight(.bold)
            }
            .frame(width: 50)

            VStack(alignment: .leading) {
                Text(title)
                    .font(.headline)
                Text(time)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
        }
        .padding(.vertical, 5)
    }
}
