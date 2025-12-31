import SwiftUI

struct NativePrayerView: View {
    @State private var name: String = ""
    @State private var request: String = ""
    @State private var isAnonymous: Bool = false

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Tus Datos")) {
                    TextField("Nombre Completo", text: $name)
                    Toggle("Petición Anónima", isOn: $isAnonymous)
                }

                Section(header: Text("Tu Petición")) {
                    TextEditor(text: $request)
                        .frame(height: 150)
                }

                Section {
                    Button(action: {
                        // Submit action
                    }) {
                        Text("Enviar Petición")
                            .frame(maxWidth: .infinity, alignment: .center)
                            .foregroundColor(.white)
                    }
                    .listRowBackground(Color.ebenezerGold)
                }
            }
            .navigationTitle("Muro de Oración")
        }
    }
}
