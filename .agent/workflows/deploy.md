---
description: Cómo publicar cambios en el sitio web (Deploy)
---

# Flujo de Despliegue Automático

Tu sitio está conectado a Vercel. Esto significa que **Vercel observa tu repositorio de GitHub**. Cada vez que "subes" (push) cambios a la rama `main`, Vercel construye y actualiza el sitio automáticamente.

## Pasos para publicar cambios

1.  **Haz tus cambios** en los archivos (código, texto, imágenes).
2.  **Guarda** los archivos.
3.  **Ejecuta estos 3 comandos** en tu terminal:

```bash
# 1. Agrega todos los archivos modificados
git add .

# 2. Crea un paquete con un mensaje descriptivo de lo que hiciste
git commit -m "Describe aquí tus cambios"
# Ejemplo: git commit -m "actualizar horario de servicios"

# 3. Envía los cambios a GitHub (inicia el deploy en Vercel)
git push origin main
```

## ¿Qué pasa después?
1.  Verás que la terminal sube los archivos a GitHub.
2.  Automáticamente, Vercel detecta el cambio.
3.  Vercel inicia un "Build" (se tarda entre 1 y 3 minutos).
4.  Tu sitio se actualiza solo en `ebenezercoban.org`.

> **Nota:** No necesitas entrar a Vercel ni a GoDaddy nunca más para actualizaciones normales. Solo subir el código a GitHub.
