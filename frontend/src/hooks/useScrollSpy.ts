import { useState, useEffect, useRef } from "react";

interface UseScrollSpyOptions {
    offset?: number;
    threshold?: number;
}

export const useScrollSpy = (
    sectionIds: string[],
    options: UseScrollSpyOptions = {}
) => {
    const { offset = 100, threshold = 0.5 } = options;
    const [activeSection, setActiveSection] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const observerOptions = {
            rootMargin: `-${offset}px 0px -${(1 - threshold) * 100}% 0px`,
            threshold: threshold,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe all sections
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [sectionIds, offset, threshold]);

    return activeSection;
};
