import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ExternalLink, Radio, Loader2, FileText } from "lucide-react";

const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/369657626563015";

const MINISTRIES = [
    "Selecciona tu Ministerio",
    "Alabanza",
    "Danza",
    "Intercesión",
    "Multimedia",
    "Protocolo",
    "Ujieres",
    "Escuela Dominical",
    "Jóvenes",
    "Damas",
    "Caballeros"
];

const AttendancePage = () => {
    const [userName, setUserName] = useState("");
    const [ministry, setMinistry] = useState("");
    const [sessionActive, setSessionActive] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [elapsedTime, setElapsedTime] = useState("00:00:00");

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (sessionActive && startTime) {
            // 1. UPDATE TIMER UI
            interval = setInterval(() => {
                const now = new Date();
                const diff = now.getTime() - startTime.getTime();

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setElapsedTime(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );

                // 2. HEARTBEAT LOGIC (Mock)
                // Every minute, we would update Supabase here:
                // supabase.from('sessions').update({ last_seen: new Date() }).eq('id', sessionId)
                console.log("💗 Heartbeat sent to server...");

            }, 1000);
        }
        return () => clearInterval(interval);
    }, [sessionActive, startTime]);

    const handleStartSession = () => {
        if (!userName || !ministry || ministry === "Selecciona tu Ministerio") {
            alert("Por favor completa tu nombre y ministerio");
            return;
        }

        // 1. Start Local Timer
        setStartTime(new Date());
        setSessionActive(true);

        // 2. Redirect to Facebook (New Tab)
        window.open(FACEBOOK_GROUP_URL, "_blank");
    };

    const handleStopSession = () => {
        setSessionActive(false);
        // Logic to finalize session in DB
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Ambience */}
            <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${sessionActive ? 'opacity-100' : 'opacity-30'}`}>
                <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <Card className="w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border-white/10 shadow-2xl relative z-10 transition-all duration-500">
                <CardHeader className="text-center pb-2">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${sessionActive ? 'bg-red-500/20 text-red-500 scale-110 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'bg-blue-500/20 text-blue-500'}`}>
                        {sessionActive ? <Radio className="w-8 h-8 animate-pulse" /> : <ExternalLink className="w-8 h-8" />}
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-white">
                        {sessionActive ? "Grabando Asistencia..." : "Pasarela de Asistencia"}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        {sessionActive
                            ? "Estamos contando tu tiempo. NO CIERRES ESTA PESTAÑA mientras ves la transmisión."
                            : "Regístrate antes de entrar al Grupo de Facebook."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                    {!sessionActive ? (
                        /* START FORM */
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</label>
                                <Input
                                    placeholder="Ej. Juan Pérez"
                                    className="bg-black/50 border-white/10 text-white h-12 focused:border-blue-500 transition-colors"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ministerio</label>
                                <Select onValueChange={setMinistry}>
                                    <SelectTrigger className="bg-black/50 border-white/10 text-white h-12">
                                        <SelectValue placeholder="Selecciona..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MINISTRIES.map((m) => (
                                            <SelectItem key={m} value={m} disabled={m.startsWith("Select")}>
                                                {m}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]"
                                onClick={handleStartSession}
                            >
                                <ExternalLink className="mr-2 h-5 w-5" />
                                IR A LA TRANSMISIÓN
                            </Button>
                            <p className="text-xs text-center text-gray-500">
                                Al hacer clic, se abrirá Facebook y empezará a contar tu tiempo.
                            </p>
                        </div>
                    ) : (
                        /* ACTIVE TRACKING UI */
                        <div className="space-y-8 animate-in zoom-in duration-500">
                            <div className="text-center p-8 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    <p className="text-sm font-bold text-red-500 tracking-widest uppercase">EN VIVO</p>
                                </div>

                                <p className="text-6xl font-mono font-bold text-white tracking-wider tabular-nums text-shadow-glow">
                                    {elapsedTime}
                                </p>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
                                <Loader2 className="w-5 h-5 text-yellow-500 animate-spin shrink-0 mt-0.5" />
                                <p className="text-sm text-yellow-200/80">
                                    <strong>Importante:</strong> Mantén esta pestaña abierta en segundo plano. Si la cierras, tu tiempo dejará de contar.
                                </p>
                            </div>

                            <Button
                                size="lg"
                                variant="secondary"
                                className="w-full h-12 font-medium bg-white/10 hover:bg-white/20 text-white border border-white/5"
                                onClick={handleStopSession}
                            >
                                Ya terminé de ver
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <p className="absolute bottom-6 text-xs text-gray-600 text-center max-w-sm">
                Sistema de Control de Asistencia<br />Iglesia de Cristo Ebenezer Cobán
            </p>

            <Button
                variant="ghost"
                className="absolute top-4 right-4 text-gray-500 hover:text-white hover:bg-white/10"
                onClick={() => window.location.href = "/asistencia/reporte"}
            >
                <FileText className="mr-2 h-4 w-4" />
                Panel Admin
            </Button>
        </div>
    );
};

export default AttendancePage;
