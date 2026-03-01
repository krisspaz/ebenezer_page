import { motion, AnimatePresence } from "framer-motion";
import { Music, Users, BookOpen, Heart, Sparkles, Video, Church, Baby, GraduationCap, Trophy, Shield, HandHeart, Crown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect } from "react";

interface MinistriesSectionProps {
    isHome?: boolean;
}

const MinistriesSection = ({ isHome = true }: MinistriesSectionProps) => {
    const { t } = useTranslation();
    const [selectedMinistry, setSelectedMinistry] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for premium feel
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const ministries = [
        {
            id: 1,
            title: "Alabanza",
            description: "Adoración profética continua, sin velo y con gobierno",
            verse: "Asimismo David y los jefes del ejército apartaron para el ministerio a los hijos de Asaf, de Hemán y de Jedutún, para que profetizasen con arpas, salterios y címbalos; y el número de ellos, hombres idóneos para la obra de su ministerio, fue: - 1 Crónicas 25:1",
            icon: <Music className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2070&auto=format&fit=crop",
            imagePosition: "object-center"
        },
        {
            id: 2,
            title: "Danza",
            description: "Una expresión integral de adoración",
            verse: "Por lo tanto, amados hermanos, les ruego que entreguen su cuerpo a Dios por todo lo que él ha hecho a favor de ustedes. Que sea un sacrificio vivo y santo, la clase de sacrificio que a él agrada. Esa es la verdadera forma de adorarlo. - Romanos 12:1",
            icon: <Sparkles className="w-6 h-6 text-white" />,
            image: "/assets/images/danza_ministry.jpg",
            imagePosition: "object-top"
        },
        {
            id: 3,
            title: "Multimedia",
            description: "La voz visual de lo que sucede en el altar, donde Dios se manifiesta",
            verse: "De la misma manera, dejen que sus buenas acciones brillen a la vista de todos, para que todos alaben a su Padre celestial. - Mateo 5:16",
            icon: <Video className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Altar Familiar",
            description: "Levantando altares para bendecir familias",
            verse: "Constrúyanme un altar donde yo determine que recuerden mi nombre, y allí me presentaré ante ustedes y los bendeciré. - Éxodo 20:24",
            icon: <Church className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "Evangelismo",
            description: "Una expresión del amor ágape que busca la restauración del pecador",
            verse: "Pues el amor de Cristo nos apremia, habiendo llegado a esta conclusión: que uno murió por todos, por consiguiente, todos murieron. - 2 Corintios 5:14",
            icon: <Users className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "Prejus",
            description: "Formado para honrar a Dios hoy y mañana",
            verse: "¿Cómo puede mantenerse íntegro el joven? Viviendo conforme a tu palabra. - Salmos 119:9",
            icon: <BookOpen className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 7,
            title: "Matrimonios",
            description: "Matrimonios que viven el diseño del amor más el respeto",
            verse: "En todo caso, cada uno de vosotros ame también a su mujer como a sí mismo, y que la mujer respete a su marido. - Efesios 5:33 LBLA",
            icon: <Heart className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 8,
            title: "Ebenekids",
            description: "Acercando a los niños a Cristo",
            verse: "Entonces Jesús les dijo: —Dejen que los niños vengan a mí. No se lo impidan porque el reino de Dios es de los que son como ellos. - Mateo 19:14",
            icon: <Baby className="w-6 h-6 text-white" />,
            image: "/images/ebenekids-ministry.png"
        },
        {
            id: 9,
            title: "Teleios",
            description: "Un grupo de jóvenes maduros, alcanzando la plenitud en Cristo",
            verse: "Hasta que todos lleguemos a la unidad de la fe y del conocimiento del Hijo de Dios, a un varón perfecto, a la medida de la estatura de la plenitud de Cristo. - Efesios 4:13",
            icon: <GraduationCap className="w-6 h-6 text-white" />,
            image: "/images/teleios-ministry.png"
        },
        {
            id: 10,
            title: "Jupernikao",
            description: "El joven no pelea para ganar, pelea desde la victoria que Cristo ya obtuvo",
            verse: "Antes, en todas estas cosas somos más que vencedores por medio de aquel que nos amó. - Romanos 8:37",
            icon: <Trophy className="w-6 h-6 text-white" />,
            image: "/images/jupernikao-ministry.png"
        },
        {
            id: 11,
            title: "Atalayas",
            description: "Despertando a los valientes",
            verse: "Proclamad esto entre las naciones, proclamad guerra, despertad a los valientes, acérquense, vengan todos los hombres de guerra. - Joel 3:9",
            icon: <Shield className="w-6 h-6 text-white" />,
            image: "/images/atalayas-ministry.png"
        },
        {
            id: 12,
            title: "Servicio",
            description: "Un don que trasciende",
            verse: "Pues Dios no es injusto. No olvidará con cuánto esfuerzo han trabajado para él y cómo han demostrado su amor por él sirviendo a otros creyentes como todavía lo hacen. - Hebreos 6:10",
            icon: <HandHeart className="w-6 h-6 text-white" />,
            image: "/images/servicio-ministry.png"
        },
        {
            id: 13,
            title: "Vestidas de Honor",
            description: "Cuando Dios viste a una mujer de honor, transforma su historia y bendice generaciones",
            verse: "Fuerza y honor son su vestidura, y se ríe de lo por venir. - Proverbios 31:25",
            icon: <Crown className="w-6 h-6 text-white" />,
            image: "/images/vestidas-honor-ministry.png"
        }
    ];

    // If on home page, show preview with intro text
    if (isHome) {
        return (
            <section id="ministerios" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - Text content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-800 dark:text-white">
                                Nuestras Áreas Ministeriales
                            </h2>
                            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
                                En Ebenezer Cobán, creemos que cada persona tiene un llamado único y especial.
                                Nuestros ministerios están diseñados para equipar, formar y capacitar a cada
                                miembro de nuestra familia de fe para cumplir su propósito en Cristo.
                            </p>
                            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
                                Los jovenes y ancianos juntamente, desde el servicio hasta la alabanza,
                                tenemos un lugar donde puedes crecer, servir y desarrollar los dones que Dios
                                ha depositado en ti.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                {ministries.slice(0, 6).map((ministry) => (
                                    <div
                                        key={ministry.id}
                                        className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700"
                                    >
                                        <div className="bg-[#F4C95D]/20 p-1.5 rounded-lg">
                                            {ministry.icon}
                                        </div>
                                        <span className="text-slate-700 dark:text-gray-300 text-sm font-medium">
                                            {ministry.title}
                                        </span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2 bg-[#F4C95D]/10 px-4 py-2 rounded-full border border-[#F4C95D]/30">
                                    <span className="text-[#F4C95D] text-sm font-medium">
                                        +{ministries.length - 6} más
                                    </span>
                                </div>
                            </div>
                            <Link
                                to="/ministerios"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F4C95D] to-[#E8B84A] text-slate-900 font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#F4C95D]/30 transition-all duration-300 group mt-4"
                            >
                                Conoce nuestras áreas ministeriales
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Right side - Featured ministry cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="aspect-square rounded-2xl w-full" />
                                ))
                            ) : (
                                ministries.slice(0, 4).map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer aspect-square"
                                    >
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors duration-300" />
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                            <div className="bg-[#F4C95D]/20 backdrop-blur-md w-10 h-10 rounded-xl flex items-center justify-center border border-[#F4C95D]/30 mb-3">
                                                {item.icon}
                                            </div>
                                            <h3 className="text-white font-heading text-lg font-bold">{item.title}</h3>
                                            <p className="text-gray-300 text-xs line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        );
    }

    // Full page view - vertical scroll layout
    return (
        <section id="ministerios" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0b1120] dark:via-[#0f172a] dark:to-[#0b1120] transition-colors duration-300">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#F4C95D]/10 to-transparent rounded-full blur-[150px]" />
                <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-teal-500/10 to-transparent rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <div className="relative pt-20 pb-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F4C95D]/20 to-[#F4C95D]/5 border border-[#F4C95D]/30 px-5 py-2 rounded-full mb-6 backdrop-blur-sm"
                        >
                            <Church className="w-4 h-4 text-[#F4C95D]" />
                            <span className="text-[#d4a33d] dark:text-[#F4C95D] font-bold text-xs uppercase tracking-[0.2em]">
                                Sirve con propósito
                            </span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-800 dark:text-white mb-4 tracking-tight">
                            Nuestras{" "}
                            <span className="bg-gradient-to-r from-[#F4C95D] to-[#E8B84A] bg-clip-text text-transparent">
                                Áreas Ministeriales
                            </span>
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-gray-500 max-w-2xl mx-auto">
                            Descubre todos los ministerios donde puedes crecer, servir y desarrollar tu llamado.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Ministries List - Vertical Scroll */}
            <div className="container mx-auto px-4 pb-24">
                <div className="max-w-5xl mx-auto space-y-8">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 items-stretch`}>
                                <Skeleton className="lg:w-1/2 h-64 lg:h-80 rounded-2xl" />
                                <div className="lg:w-1/2 flex flex-col justify-center">
                                    <Skeleton className="h-48 w-full rounded-2xl" />
                                </div>
                            </div>
                        ))
                    ) : (
                        ministries.map((ministry, index) => (
                            <motion.div
                                key={ministry.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                className="group"
                            >
                                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 items-stretch`}>
                                    {/* Image */}
                                    <div className="lg:w-1/2 relative">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-[#F4C95D]/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                        <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                            {/* Image - with premium filters */}
                                            <img
                                                src={ministry.image}
                                                alt={ministry.title}
                                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${ministry.imagePosition || 'object-center'
                                                    } saturate-[1.10] contrast-[1.05] brightness-[1.02]`}
                                            />

                                            {/* Number badge */}
                                            <div className="absolute top-4 left-4 bg-[#F4C95D] text-slate-900 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                                                {ministry.id.toString().padStart(2, '0')}
                                            </div>

                                            {/* Icon */}
                                            <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-xl w-14 h-14 rounded-xl flex items-center justify-center border border-white/30">
                                                {ministry.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:w-1/2 flex flex-col justify-center">
                                        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg group-hover:shadow-xl transition-all duration-500 h-full">
                                            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-slate-800 dark:text-white mb-3 group-hover:text-[#F4C95D] transition-colors duration-300">
                                                {ministry.title}
                                            </h3>

                                            <p className="text-lg text-slate-600 dark:text-gray-300 mb-5 leading-relaxed">
                                                {ministry.description}
                                            </p>

                                            <div className="h-px bg-gradient-to-r from-[#F4C95D]/50 via-transparent to-transparent mb-5" />

                                            <div className="flex items-start gap-3">
                                                <BookOpen className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                                                <p className="text-sm text-slate-500 dark:text-gray-400 italic leading-relaxed">
                                                    "{ministry.verse}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default MinistriesSection;
