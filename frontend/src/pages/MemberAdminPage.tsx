import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
    Users, Lock, Trash2, Ban, CheckCircle, Search,
    ArrowLeft, Shield, Phone, Calendar, UserX, User, Download
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Member, getMembersList, MEMBERS_LIST_KEY } from "../components/MemberRegistration";
import { jsPDF } from "jspdf";
import SEO from "../components/SEO";

// Admin users configuration
const ADMIN_USERS = [
    { username: "Susy", password: "Ebenezercoban25" },
    { username: "Rocael", password: "Ebenezercoban25" },
    { username: "Kriss", password: "Ebenezercoban25" },
];

const MemberAdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminName, setAdminName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [members, setMembers] = useState<Member[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadMembers();
        }
    }, [isAuthenticated]);

    const loadMembers = () => {
        const membersList = getMembersList();
        setMembers(membersList);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            const admin = ADMIN_USERS.find(
                a => a.username.toLowerCase() === username.toLowerCase() && a.password === password
            );

            if (admin) {
                setIsAuthenticated(true);
                setAdminName(admin.username);
                toast.success(`¡Bienvenid@ ${admin.username}!`);
            } else {
                toast.error("Usuario o contraseña incorrectos");
            }
            setIsLoading(false);
        }, 500);
    };

    const toggleBlockMember = (memberId: string) => {
        const updatedMembers = members.map(m => {
            if (m.id === memberId) {
                return { ...m, bloqueado: !m.bloqueado };
            }
            return m;
        });

        setMembers(updatedMembers);
        localStorage.setItem(MEMBERS_LIST_KEY, JSON.stringify(updatedMembers));

        const member = updatedMembers.find(m => m.id === memberId);
        if (member?.bloqueado) {
            toast.success(`${member.nombre} ha sido bloqueado`);
        } else {
            toast.success(`${member?.nombre} ha sido desbloqueado`);
        }
    };

    const deleteMember = (memberId: string) => {
        const member = members.find(m => m.id === memberId);
        if (confirm(`¿Estás seguro de eliminar a ${member?.nombre} ${member?.apellido}?`)) {
            const updatedMembers = members.filter(m => m.id !== memberId);
            setMembers(updatedMembers);
            localStorage.setItem(MEMBERS_LIST_KEY, JSON.stringify(updatedMembers));
            toast.success("Miembro eliminado");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-GT', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatPhone = (phone: string) => {
        if (phone.length === 8) {
            return `${phone.slice(0, 4)}-${phone.slice(4)}`;
        }
        return phone;
    };

    const filteredMembers = members.filter(m =>
        `${m.nombre} ${m.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.telefono.includes(searchTerm)
    );

    // Normalize string for comparison (remove accents, lowercase)
    const normalize = (str: string) =>
        str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    // Deduplicate members with similar names
    const getDeduplicatedMembers = (): Member[] => {
        const seen = new Map<string, Member>();

        for (const member of members) {
            const key = `${normalize(member.nombre)}_${normalize(member.apellido)}`;

            if (!seen.has(key)) {
                seen.set(key, member);
            } else {
                // Keep the one registered first (earlier date)
                const existing = seen.get(key)!;
                if (new Date(member.fechaRegistro) < new Date(existing.fechaRegistro)) {
                    seen.set(key, member);
                }
            }
        }

        // Sort by apellido
        return Array.from(seen.values()).sort((a, b) =>
            normalize(a.apellido).localeCompare(normalize(b.apellido))
        );
    };

    // Export members to PDF
    const exportToPDF = () => {
        const uniqueMembers = getDeduplicatedMembers();
        const activeMembers = uniqueMembers.filter(m => !m.bloqueado);

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Iglesia de Cristo Ebenezer Cobán", pageWidth / 2, 20, { align: "center" });

        doc.setFontSize(16);
        doc.text("Lista de Congregación", pageWidth / 2, 30, { align: "center" });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Generado el: ${new Date().toLocaleDateString('es-GT')}`, pageWidth / 2, 38, { align: "center" });
        doc.text(`Generado por: ${adminName}`, pageWidth / 2, 44, { align: "center" });

        // Summary box
        doc.setFillColor(240, 240, 240);
        doc.rect(20, 52, pageWidth - 40, 20, "F");
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(`Total de miembros: ${activeMembers.length}`, 30, 64);
        doc.text(`Registros duplicados eliminados: ${members.length - uniqueMembers.length}`, pageWidth / 2, 64);

        // Table header
        let y = 85;
        doc.setFillColor(59, 130, 246);
        doc.setTextColor(255, 255, 255);
        doc.rect(20, y - 6, pageWidth - 40, 10, "F");
        doc.setFontSize(10);
        doc.text("#", 25, y);
        doc.text("Apellido", 35, y);
        doc.text("Nombre", 85, y);
        doc.text("Teléfono", 135, y);
        doc.text("Registro", 170, y);

        // Table content
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        y += 10;

        activeMembers.forEach((member, index) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }

            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(249, 250, 251);
                doc.rect(20, y - 5, pageWidth - 40, 8, "F");
            }

            doc.setFontSize(9);
            doc.text(`${index + 1}`, 25, y);
            doc.text(member.apellido.substring(0, 20), 35, y);
            doc.text(member.nombre.substring(0, 20), 85, y);
            doc.text(formatPhone(member.telefono), 135, y);
            doc.text(formatDate(member.fechaRegistro), 170, y);

            y += 8;
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text("Documento confidencial - Iglesia de Cristo Ebenezer Cobán", pageWidth / 2, 285, { align: "center" });

        // Save PDF
        doc.save(`congregacion_ebenezer_${new Date().toISOString().split('T')[0]}.pdf`);
        toast.success(`PDF generado con ${activeMembers.length} miembros`);
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />

                <Card className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border-white/10 shadow-2xl relative z-10">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                            <Shield className="w-8 h-8 text-blue-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">
                            Panel de Administración
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Ingresa tus credenciales para acceder
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Usuario
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        type="text"
                                        placeholder="Nombre de usuario"
                                        className="pl-10 bg-black/50 border-white/10 text-white h-12"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-black/50 border-white/10 text-white h-12"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-semibold"
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    "Acceder"
                                )}
                            </Button>
                        </form>

                        <Button
                            variant="ghost"
                            className="w-full mt-4 text-gray-500 hover:text-white"
                            onClick={() => window.location.href = "/"}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al inicio
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <SEO
                title="Panel de Congregación | Ebenezer Cobán"
                description="Área restringida para administración de miembros."
            />
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.location.href = "/"}
                                className="text-slate-600 dark:text-slate-400"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Inicio
                            </Button>
                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Congregación
                            </h1>
                            <span className="text-sm text-slate-500 hidden md:inline">
                                (Sesión: {adminName})
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={exportToPDF}
                                className="bg-green-600 hover:bg-green-700 text-white"
                                size="sm"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Exportar PDF
                            </Button>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{members.length} registrados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{members.length}</p>
                                    <p className="text-sm text-slate-500">Total Registrados</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {members.filter(m => !m.bloqueado).length}
                                    </p>
                                    <p className="text-sm text-slate-500">Activos</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <Ban className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {members.filter(m => m.bloqueado).length}
                                    </p>
                                    <p className="text-sm text-slate-500">Bloqueados</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            placeholder="Buscar por nombre o teléfono..."
                            className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Members List */}
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                        <CardTitle className="text-lg">Lista de Miembros</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {filteredMembers.length === 0 ? (
                            <div className="p-12 text-center">
                                <UserX className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                                <p className="text-slate-500">No se encontraron miembros</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <AnimatePresence>
                                    {filteredMembers.map((member) => (
                                        <motion.div
                                            key={member.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${member.bloqueado ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${member.bloqueado ? 'bg-red-100 text-red-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>
                                                    {member.nombre.charAt(0)}{member.apellido.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className={`font-semibold ${member.bloqueado ? 'text-red-600 line-through' : 'text-slate-900 dark:text-white'}`}>
                                                        {member.nombre} {member.apellido}
                                                    </h4>
                                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <Phone className="w-3 h-3" />
                                                            {formatPhone(member.telefono)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatDate(member.fechaRegistro)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleBlockMember(member.id)}
                                                    className={member.bloqueado ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-amber-600 hover:text-amber-700 hover:bg-amber-50'}
                                                >
                                                    {member.bloqueado ? (
                                                        <>
                                                            <CheckCircle className="w-4 h-4 mr-1" />
                                                            Desbloquear
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Ban className="w-4 h-4 mr-1" />
                                                            Bloquear
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteMember(member.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MemberAdminPage;
