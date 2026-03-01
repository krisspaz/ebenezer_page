import { useState, useEffect, useRef } from "react";

interface UseLazyImageOptions {
    threshold?: number;
    rootMargin?: string;
}

export const useLazyImage = (
    src: string,
    options: UseLazyImageOptions = {}
) => {
    const { threshold = 0.1, rootMargin = "200px" } = options;
    const [imageSrc, setImageSrc] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // If browser doesn't support IntersectionObserver, load immediately
        if (!("IntersectionObserver" in window)) {
            setImageSrc(src);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setImageSrc(src);
                    if (imgRef.current) {
                        observer.unobserve(imgRef.current);
                    }
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [src, threshold, rootMargin]);

    useEffect(() => {
        if (!imageSrc) return;

        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            setIsLoaded(true);
            setIsError(false);
        };

        img.onerror = () => {
            setIsError(true);
            setIsLoaded(false);
        };
    }, [imageSrc]);

    return {
        imgRef,
        imageSrc,
        isLoaded,
        isError,
    };
};
