import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Download, FileSpreadsheet, Search } from "lucide-react";
import { Input } from "../components/ui/input";

// Mock Data - In the future this comes from Supabase
const MOCK_DATA = [
    { id: 1, name: "Juan Pérez", ministry: "Alabanza", date: "2024-05-20", startTime: "20:55", endTime: "22:05", duration: "1h 10m" },
    { id: 2, name: "Maria Garcia", ministry: "Danza", date: "2024-05-20", startTime: "21:00", endTime: "21:45", duration: "0h 45m" },
    { id: 3, name: "Carlos Lopez", ministry: "Multimedia", date: "2024-05-20", startTime: "20:50", endTime: "22:00", duration: "1h 10m" },
    { id: 4, name: "Ana Torres", ministry: "Intercesión", date: "2024-05-20", startTime: "21:05", endTime: "22:15", duration: "1h 10m" },
    { id: 5, name: "Pedro Méndez", ministry: "Ujieres", date: "2024-05-20", startTime: "20:58", endTime: "22:00", duration: "1h 02m" },
];

const AttendanceReport = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            (username === "Kriss Paz" && password === "Krispaz2001") ||
            (username === "Rocael Castellanos" && password === "Ebenezer2025")
        ) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    const filteredData = MOCK_DATA.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.ministry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const downloadCSV = () => {
        // Defines the CSV headers
        const headers = ["Nombre,Ministerio,Fecha,Hora Inicio,Hora Fin,Duración"];

        // Formats the data rows
        const rows = filteredData.map(row =>
            `${row.name},${row.ministry},${row.date},${row.startTime},${row.endTime},${row.duration}`
        );

        // Combines headers and rows
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");

        // Creates a virtual link to trigger download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "reporte_asistencia_ebenezer.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-zinc-900 border-white/10">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-white">Acceso Administrativo</CardTitle>
                        <CardDescription>Ingresa tus credenciales para ver los reportes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Usuario</label>
                                <Input
                                    className="bg-black/50 border-white/10 text-white"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Nombre de usuario"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Contraseña</label>
                                <Input
                                    type="password"
                                    className="bg-black/50 border-white/10 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <Button type="submit" className="w-full bg-[#F4C95D] text-black hover:bg-[#e6b650]">
                                Entrar al Panel
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Reporte de Asistencia</h1>
                        <p className="text-gray-400">Resumen semanal del grupo privado de Facebook.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            className="bg-white text-black hover:bg-gray-200 font-medium"
                            onClick={() => window.print()}
                        >
                            Imprimir PDF
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white font-bold"
                            onClick={downloadCSV}
                        >
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Descargar Excel (CSV)
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card className="bg-zinc-900 border-white/10">
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Buscar por nombre o ministerio..."
                                className="pl-10 bg-black/50 border-white/10 text-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card className="bg-zinc-900 border-white/10 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-white">Registros Recientes</CardTitle>
                        <CardDescription className="text-gray-400">
                            Mostrando {filteredData.length} registros.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-black/40">
                                    <TableRow className="border-white/10 hover:bg-transparent">
                                        <TableHead className="text-gray-300">Nombre</TableHead>
                                        <TableHead className="text-gray-300">Ministerio</TableHead>
                                        <TableHead className="text-gray-300">Fecha</TableHead>
                                        <TableHead className="text-gray-300">Entrada</TableHead>
                                        <TableHead className="text-gray-300">Salida</TableHead>
                                        <TableHead className="text-gray-300 text-right">Duración</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row) => (
                                            <TableRow key={row.id} className="border-white/5 hover:bg-white/5">
                                                <TableCell className="font-medium text-white">{row.name}</TableCell>
                                                <TableCell className="text-gray-300">
                                                    <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                                                        {row.ministry}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-400">{row.date}</TableCell>
                                                <TableCell className="text-gray-400 font-mono text-xs">{row.startTime}</TableCell>
                                                <TableCell className="text-gray-400 font-mono text-xs">{row.endTime}</TableCell>
                                                <TableCell className="text-right font-bold text-green-400">{row.duration}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                                                No se encontraron resultados.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AttendanceReport;
