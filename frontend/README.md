# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a6d723fe-888e-45ed-a181-a351d8502d74

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a6d723fe-888e-45ed-a181-a351d8502d74) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a6d723fe-888e-45ed-a181-a351d8502d74) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Docker

Instrucciones rápidas para construir y ejecutar la aplicación en Docker (multi-stage build, servido por nginx):

1. Construir la imagen Docker:

```bash
docker build -t ebenezer-app:latest .
```

2. Ejecutar la imagen en un contenedor (mapear puerto 80 del contenedor a 8080 local):

```bash
docker run -p 8080:80 --rm --name ebenezer-app ebenezer-app:latest
```

3. Abre http://localhost:8080 en tu navegador.

Notas:
- El `Dockerfile` hace un build con `npm ci` y luego copia `dist/` a un contenedor nginx para servir contenido estático.
- Si prefieres usar `bun`, instala Bun en tu host y ajusta el `Dockerfile` según tus preferencias.
