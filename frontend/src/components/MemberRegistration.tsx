import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { User, Phone, UserPlus, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Storage keys
export const MEMBER_KEY = 'ebenezer_member';
export const MEMBERS_LIST_KEY = 'ebenezer_members_list';

export interface Member {
    id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    fechaRegistro: string;
    bloqueado: boolean;
}

// Helper functions for member management
export const getMember = (): Member | null => {
    const data = localStorage.getItem(MEMBER_KEY);
    return data ? JSON.parse(data) : null;
};

export const getMembersList = (): Member[] => {
    const data = localStorage.getItem(MEMBERS_LIST_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveMemberToList = (member: Member) => {
    const list = getMembersList();
    const existingIndex = list.findIndex(m => m.id === member.id);
    if (existingIndex >= 0) {
        list[existingIndex] = member;
    } else {
        list.push(member);
    }
    localStorage.setItem(MEMBERS_LIST_KEY, JSON.stringify(list));
};

export const isMemberBlocked = (memberId: string): boolean => {
    const list = getMembersList();
    const member = list.find(m => m.id === memberId);
    return member?.bloqueado ?? false;
};

interface MemberRegistrationProps {
    onRegistered: (member: Member) => void;
}

const MemberRegistration = ({ onRegistered }: MemberRegistrationProps) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatPhoneNumber = (value: string) => {
        // Remove non-digits
        const digits = value.replace(/\D/g, '');
        // Format as XXXX-XXXX for Guatemala numbers
        if (digits.length <= 4) return digits;
        return `${digits.slice(0, 4)}-${digits.slice(4, 8)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setTelefono(formatted);
    };

    const validateForm = (): boolean => {
        if (!nombre.trim()) {
            toast.error("Por favor ingresa tu nombre");
            return false;
        }
        if (!apellido.trim()) {
            toast.error("Por favor ingresa tu apellido");
            return false;
        }
        const phoneDigits = telefono.replace(/\D/g, '');
        if (phoneDigits.length !== 8) {
            toast.error("Por favor ingresa un número de teléfono válido (8 dígitos)");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate a brief delay for UX
        await new Promise(resolve => setTimeout(resolve, 500));

        const newMember: Member = {
            id: crypto.randomUUID(),
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.replace(/\D/g, ''),
            fechaRegistro: new Date().toISOString(),
            bloqueado: false
        };

        // Save to localStorage
        localStorage.setItem(MEMBER_KEY, JSON.stringify(newMember));
        saveMemberToList(newMember);

        toast.success(`¡Bienvenido/a ${nombre}! Ya puedes acceder al Muro de Oración`);
        setIsSubmitting(false);
        onRegistered(newMember);
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                    {/* Decorative header */}
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                    <CardHeader className="text-center pb-2 pt-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white dark:border-slate-700"
                        >
                            <img
                                src="/logo_gold.jpg"
                                alt="Logo Ebenezer"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            Muro de Oración
                            <Sparkles className="w-5 h-5 text-amber-500" />
                        </CardTitle>

                        <CardDescription className="text-slate-600 dark:text-slate-400 mt-2 text-base">
                            Regístrate para compartir y orar por las peticiones de nuestra congregación
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 pt-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Nombre
                                </label>
                                <Input
                                    placeholder="Ej. María"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Apellido */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Apellido
                                </label>
                                <Input
                                    placeholder="Ej. González"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Teléfono */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Número de Teléfono
                                </label>
                                <Input
                                    placeholder="1234-5678"
                                    value={telefono}
                                    onChange={handlePhoneChange}
                                    maxLength={9}
                                    className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Tu información es privada y solo se usa para identificarte
                                </p>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02]"
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5 mr-2" />
                                        Registrarme y Acceder
                                    </>
                                )}
                            </Button>
                        </form>

                        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
                            Iglesia de Cristo Ebenezer Cobán
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default MemberRegistration;
