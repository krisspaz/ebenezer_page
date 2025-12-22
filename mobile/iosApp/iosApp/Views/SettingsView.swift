import SwiftUI
import shared

struct SettingsView: View {
    @State private var themeMode: ThemeMode = ServiceLocator.shared.settingsRepository.themeMode
    @State private var highContrast: Bool = ServiceLocator.shared.accessibilityManager.isHighContrastEnabled
    // Font scale is usually handled by iOS system settings (Dynamic Type), but we can override/augment
    
    let settingsRepo = ServiceLocator.shared.settingsRepository
    let accessManager = ServiceLocator.shared.accessibilityManager
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text(StringsEs.shared.theme)) {
                    Picker("Modo", selection: $themeMode) {
                        Text("Sistema").tag(ThemeMode.system)
                        Text("Claro").tag(ThemeMode.light)
                        Text("Oscuro").tag(ThemeMode.dark)
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    .onChange(of: themeMode) { newValue in
                        settingsRepo.themeMode = newValue
                    }
                }
                
                Section(header: Text("Accesibilidad")) {
                    Toggle("Alto Contraste", isOn: $highContrast)
                        .onChange(of: highContrast) { newValue in
                            accessManager.isHighContrastEnabled = newValue
                        }
                    
                    Text("Nota: El tamaño de letra respeta la configuración del sistema iOS.")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Section(header: Text(StringsEs.shared.language)) {
                    Text("Idioma actual: \(settingsRepo.languageCode)")
                }
                
                Section {
                    Text("Versión 1.0.0")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            .navigationTitle(StringsEs.shared.settings)
            .onAppear {
                themeMode = settingsRepo.themeMode
                highContrast = accessManager.isHighContrastEnabled
            }
        }
    }
}
