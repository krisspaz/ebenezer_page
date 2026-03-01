import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "rectangular" | "circular" | "text";
    animation?: "pulse" | "wave" | "none";
}

const LoadingSkeleton = ({
    className,
    variant = "rectangular",
    animation = "wave",
}: SkeletonProps) => {
    const baseClasses = "bg-muted";

    const variantClasses = {
        rectangular: "rounded-md",
        circular: "rounded-full",
        text: "rounded h-4",
    };

    const animationClasses = {
        pulse: "animate-pulse",
        wave: "skeleton-wave",
        none: "",
    };

    return (
        <div
            className={cn(
                baseClasses,
                variantClasses[variant],
                animationClasses[animation],
                className
            )}
            role="status"
            aria-label="Cargando..."
        >
            <span className="sr-only">Cargando...</span>
        </div>
    );
};

// Preset skeleton layouts for common use cases
export const CardSkeleton = () => (
    <div className="space-y-4 p-6 border border-border rounded-lg bg-card">
        <LoadingSkeleton className="h-48 w-full" />
        <LoadingSkeleton variant="text" className="w-3/4" />
        <LoadingSkeleton variant="text" className="w-1/2" />
        <div className="flex gap-2">
            <LoadingSkeleton className="h-8 w-20" />
            <LoadingSkeleton className="h-8 w-20" />
        </div>
    </div>
);

export const EventSkeleton = () => (
    <div className="flex gap-4 p-4 border border-border rounded-lg bg-card">
        <LoadingSkeleton variant="rectangular" className="h-20 w-20 flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <LoadingSkeleton variant="text" className="w-full" />
            <LoadingSkeleton variant="text" className="w-3/4" />
            <LoadingSkeleton variant="text" className="w-1/2" />
        </div>
    </div>
);

export const AvatarSkeleton = () => (
    <div className="flex items-center gap-3">
        <LoadingSkeleton variant="circular" className="h-12 w-12" />
        <div className="space-y-2 flex-1">
            <LoadingSkeleton variant="text" className="w-32" />
            <LoadingSkeleton variant="text" className="w-24" />
        </div>
    </div>
);

export default LoadingSkeleton;
