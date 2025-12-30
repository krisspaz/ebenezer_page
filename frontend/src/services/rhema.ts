import { z } from 'zod';

/**
 * Zod Schema for Magazine validation.
 * Ensures that every magazine object has a non-empty title and valid URLs for link and image.
 * This prevents the UI from breaking due to malformed data.
 */
export const MagazineSchema = z.object({
    title: z.string().min(1, "El título es obligatorio"),
    link: z.string().url("El enlace debe ser una URL válida"),
    image: z.string().url("La imagen debe ser una URL válida"),
});

export const MagazineListSchema = z.array(MagazineSchema);

// Type Inference
export type Magazine = z.infer<typeof MagazineSchema>;

// Fallback Data
const FALLBACK_DATA: Magazine[] = [
    { title: "DICIEMBRE 2025", link: "https://ebenezer.org.gt/wp-content/uploads/2025/12/189RevistaRhema-Diciembre2025.pdf", image: "https://ebenezer.org.gt/wp-content/uploads/2025/12/Screenshot-2025-12-08-at-3.53.32-PM.png" },
    { title: "NOVIEMBRE 2025", link: "https://ebenezer.org.gt/wp-content/uploads/2025/11/188-Noviembre2025.pdf", image: "https://ebenezer.org.gt/wp-content/uploads/2025/11/IMG_1066.jpeg" },
    { title: "OCTUBRE 2025", link: "https://ebenezer.org.gt/wp-content/uploads/2025/10/187RevistaRhemaOctubre2025.pdf", image: "https://ebenezer.org.gt/wp-content/uploads/2025/10/Screenshot-2025-10-06-at-11.57.21-AM.png" },
    { title: "SEPTIEMBRE 2025", link: "https://ebenezer.org.gt/wp-content/uploads/2025/09/186RevistaRhema-Septiembre2025.pdf", image: "https://ebenezer.org.gt/wp-content/uploads/2025/09/Screenshot-2025-09-08-at-17.37.14.png" },
    { title: "AGOSTO 2025", link: "https://ebenezer.org.gt/wp-content/uploads/2025/08/185RevistaRhema-Agosto2025.pdf", image: "https://ebenezer.org.gt/wp-content/uploads/2025/08/IMG_5565.jpeg" },
    { title: "JULIO 2025", link: "https://www.ebenezer.org.gt/wp-content/uploads/2025/07/Julio2025.pdf", image: "https://www.ebenezer.org.gt/wp-content/uploads/2025/07/IMG_4831.jpeg" },
    { title: "JUNIO 2025", link: "https://ebenezer.org.gt/wp-content/uploads/2025/06/183RevistaRhema-Junio2025.pdf", image: "https://ebenezer.org.gt/wp-content/uploads/2025/06/183RevistaRhema-Junio2025-1.png" },
    { title: "MAYO 2025", link: "https://ebenezer.org.gt/wp-content/uploads/2025/05/182_Mayo2025.pdf", image: "https://ebenezer.org.gt/wp-content/uploads/2025/05/IMG_3521.jpeg" },
];

/**
 * Fetches the list of Rhema magazines from the local JSON file.
 * 
 * @returns {Promise<Magazine[]>} A promise that resolves to an array of validated magazines.
 * If the fetch fails or validation errors occur, it returns a fallback dataset (FALLBACK_DATA)
 * to ensure the UI continues to function gracefully.
 */
export async function fetchRhemaMagazines(): Promise<Magazine[]> {
    try {
        const response = await fetch('/rhema.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} `);
        }
        const rawData = await response.json();

        // Validate data using Zod to ensure type safety at runtime
        const result = MagazineListSchema.safeParse(rawData);

        if (!result.success) {
            console.warn('⚠️ Rhema API Validation Error:', result.error.format());
            return FALLBACK_DATA; // Return safe fallback data on validation failure
        }

        return result.data;
    } catch (error) {
        console.error('❌ Failed to fetch Rhema magazines:', error);
        return FALLBACK_DATA; // Return safe fallback data on network failure
    }
}

