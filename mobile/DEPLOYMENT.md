# Guía de Despliegue y Optimización

## 🚀 Preparación para Tiendas

### Android (Play Store)
1. **Icono de App**: Reemplaza `ic_launcher` en `androidApp/src/main/res/mipmap-*`.
2. **Splash Screen**: Configura `Theme.SplashScreen` en `styles.xml` (Android 12+ usa la API nativa).
3. **Firma**: Genera un Keystore (`.jks`) y configúralo en `build.gradle.kts` para el build `release`.
4. **Build**: Ejecuta `./gradlew androidApp:bundleRelease` para generar el `.aab`.

### iOS (App Store)
1. **Iconos**: Agrega las imágenes en `Assets.xcassets` dentro de Xcode.
2. **Splash Screen**: Edita `LaunchScreen.storyboard` en Xcode.
3. **Firma**: Configura tu Team de Apple Developer en la pestaña "Signing & Capabilities".
4. **Archive**: En Xcode, ve a **Product > Archive** y sube a TestFlight.

## ⚡ Optimización de Rendimiento
- **Imágenes**: Usa WebP para Android y HEIC para iOS cuando sea posible.
- **Listas**: Ya usamos `LazyColumn` (Android) y `LazyStack` (iOS) para renderizado eficiente.
- **R8/Proguard**: Habilitado por defecto en builds de release de Android para minificar código.

## 🧪 Tests
Ejecuta los tests antes de desplegar:
```bash
./gradlew check
```
