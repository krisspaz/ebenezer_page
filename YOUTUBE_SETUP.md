# Guía de Configuración de YouTube API

Para que la sección de "Transmisiones Anteriores" muestre automáticamente los videos de tu canal, necesitas dos cosas: una **API Key** y el **ID de tu Canal**.

## 1. Obtener el ID de tu Canal

1. Ve a tu canal de YouTube: [https://www.youtube.com/@iglesiaebenezercoban](https://www.youtube.com/@iglesiaebenezercoban)
2. Haz clic derecho en cualquier parte vacía de la página y selecciona **"Ver código fuente de la página"** (o presiona `Ctrl+U` / `Cmd+Option+U`).
3. Presiona `Ctrl+F` (o `Cmd+F`) para buscar.
4. Escribe: `channelId`
5. Verás algo como `"channelId":"UC..."`. Copia ese código que empieza con `UC`. Ese es tu ID.
   * *Nota: Es una cadena larga de letras y números, por ejemplo: `UC1234567890abcdefg`.*

## 2. Obtener la API Key de Google (Gratis)

1. Ve a la [Google Cloud Console](https://console.cloud.google.com/).
2. Inicia sesión con tu cuenta de Google.
3. **Crear un Proyecto:**
   - Haz clic en el selector de proyectos (arriba a la izquierda) y selecciona **"Proyecto Nuevo"**.
   - Ponle un nombre (ej. "Ebenezer Web") y dale a **Crear**.
4. **Habilitar la API:**
   - En el menú lateral, ve a **"API y servicios"** > **"Biblioteca"**.
   - Busca **"YouTube Data API v3"**.
   - Haz clic en ella y luego en el botón **"Habilitar"**.
5. **Crear Credenciales:**
   - Una vez habilitada, haz clic en el botón **"Crear Credenciales"** (arriba a la derecha).
   - En "Tipo de credencial", selecciona **"Clave de API"** (API Key).
   - ¡Listo! Te mostrará tu clave (empieza con `AIza...`). Cópiala.

## 3. Configurar tu Proyecto

1. En la carpeta de tu proyecto, busca el archivo llamado `.env.example`.
2. Haz una copia de ese archivo y renómbralo a `.env` (sin el `.example`).
3. Abre el archivo `.env` y pega tus datos:

```env
VITE_YOUTUBE_API_KEY=Pega_Aqui_Tu_API_Key_Que_Empieza_Con_AIza
VITE_YOUTUBE_CHANNEL_ID=Pega_Aqui_Tu_ID_De_Canal_Que_Empieza_Con_UC
```

4. Guarda el archivo.
5. Reinicia la terminal donde estás corriendo el proyecto (`Ctrl+C` y luego `npm run dev`) para que tome los cambios.

¡Eso es todo! Ahora la página web cargará automáticamente los últimos videos de tu canal.
