# Configuración de Notificaciones y Deep Linking

## 1. Notificaciones Push (Firebase Cloud Messaging)

Para habilitar notificaciones, sigue estos pasos:

### Android
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Registra la app Android (`com.ebenezer.coban.android`).
3. Descarga `google-services.json` y colócalo en `mobile/androidApp/`.
4. Agrega el plugin de Google Services en `build.gradle.kts`.

### iOS
1. Registra la app iOS en Firebase.
2. Descarga `GoogleService-Info.plist` y agrégalo al proyecto Xcode (`mobile/iosApp`).
3. Habilita "Push Notifications" en las Capabilities de Xcode.

## 2. Deep Linking

### Android
El archivo `AndroidManifest.xml` ya está preparado. Para manejar links específicos (ej. `ebenezer://eventos/123`), agrega:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="ebenezer" android:host="eventos" />
</intent-filter>
```

### iOS
En Xcode, ve a **Info > URL Types** y agrega `ebenezer` como esquema.
