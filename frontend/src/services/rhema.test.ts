import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRhemaMagazines, MagazineSchema } from './rhema';

// Mock fetch
global.fetch = vi.fn();

describe('Rhema Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch and validate magazines successfully', async () => {
        const mockData = [
            {
                title: "Edición Enero 2024",
                link: "https://example.com/jan2024",
                image: "https://example.com/img1.jpg"
            }
        ];

        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await fetchRhemaMagazines();
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("Edición Enero 2024");
    });

    it('should return fallback data on API failure', async () => {
        (global.fetch as any).mockRejectedValue(new Error("Network error"));

        const result = await fetchRhemaMagazines();
        expect(result.length).toBeGreaterThan(0); // Should return fallback data
    });

    // Test Schema directly
    it('should validate correct magazine object', () => {
        const validMagazine = {
            title: "Test",
            link: "https://test.com",
            image: "https://test.com/img.jpg"
        };
        const result = MagazineSchema.safeParse(validMagazine);
        expect(result.success).toBe(true);
    });

    it('should reject invalid magazine object', () => {
        const invalidMagazine = {
            title: "", // Empty title
            link: "not-a-url",
            image: "https://test.com/img.jpg"
        };
        const result = MagazineSchema.safeParse(invalidMagazine);
        expect(result.success).toBe(false);
    });
});
