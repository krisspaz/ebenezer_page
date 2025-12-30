import { useTranslation } from 'react-i18next';
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe, Check } from 'lucide-react';

export function LanguageSelector() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const currentLang = i18n.language?.split('-')[0] || 'es';

    const languages = [
        { code: 'es', label: 'Español' },
        { code: 'en', label: 'English' },
        { code: 'qeq', label: "Q'eqchi'" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Seleccionar idioma"
                    className="flex items-center gap-2 px-3 text-white/90 hover:text-[#F4C95D] hover:bg-white/10"
                >
                    <Globe className="h-4 w-4" />
                    <span className="uppercase font-medium text-xs tracking-wider">
                        {currentLang === 'qeq' ? 'QEQ' : currentLang}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 animate-fadeIn">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <span>{lang.label}</span>
                        {currentLang === lang.code && <Check className="h-4 w-4 text-[#F4C95D]" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
