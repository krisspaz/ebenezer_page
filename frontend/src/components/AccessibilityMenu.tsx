import { useState, useEffect } from 'react';
import { Type, Moon, Sun, Monitor, Contrast } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

export function AccessibilityMenu() {
    const { t } = useTranslation();
    const [fontSize, setFontSize] = useState(1); // 0=small, 1=normal, 2=large, 3=xl
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        // Apply font size by toggling class on html element
        document.documentElement.classList.remove('font-scale-0', 'font-scale-1', 'font-scale-2', 'font-scale-3');
        document.documentElement.classList.add(`font-scale-${fontSize}`);

        // Also update data attribute for potential CSS variable usage
        document.documentElement.setAttribute('data-font-size', fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        if (highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    }, [highContrast]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t('settings.accessibility')}>
                    <Type className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t('settings.accessibility')}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="p-2">
                    <label className="text-sm font-medium mb-2 block">{t('settings.fontSize')}</label>
                    <div className="flex gap-1 justify-between bg-muted p-1 rounded-lg">
                        {[0, 1, 2, 3].map((size) => (
                            <button
                                key={size}
                                onClick={() => setFontSize(size)}
                                className={`flex-1 p-1 text-center rounded text-xs ${fontSize === size ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-background'
                                    }`}
                            >
                                {size === 0 ? 'A' : size === 1 ? 'A+' : size === 2 ? 'A++' : 'A+++'}
                            </button>
                        ))}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setHighContrast(!highContrast)}>
                    <Contrast className="mr-2 h-4 w-4" />
                    <span>{t('settings.highContrast')}</span>
                    {highContrast && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
