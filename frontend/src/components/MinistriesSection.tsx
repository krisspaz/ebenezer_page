import { motion } from "framer-motion";
import { Music, Users, BookOpen, Heart, Baby, Mic2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const MinistriesSection = () => {
    const { t } = useTranslation();

    const ministries = [
        {
            id: 1,
            title: "Alabanza",
            description: "Adoración profética continua, sin velo y con gobierno",
            verse: "“Asimismo David y los jefes del ejército apartaron para el ministerio a los hijos de Asaf, de Hemán y de Jedutún, para que profetizasen con arpas, salterios y címbalos; y el número de ellos, hombres idóneos para la obra de su ministerio, fue:” 1 Crónicas 25:1",
            icon: <Music className="w-8 h-8 text-white" />,
            color: "from-[#1e293b]/80 to-[#0f172a]/90",
            size: "col-span-12 md:col-span-6 lg:col-span-8 row-span-2",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Danza",
            description: "Una expresión integral de adoración",
            verse: "“Por lo tanto, amados hermanos, les ruego que entreguen su cuerpo a Dios por todo lo que él ha hecho a favor de ustedes. Que sea un sacrificio vivo y santo, la clase de sacrificio que a él agrada. Esa es la verdadera forma de adorarlo.” Romanos 12:1",
            icon: <Heart className="w-6 h-6 text-white" />,
            color: "from-[#F4C95D]/70 to-[#1e293b]/90",
            size: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
            image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=2069&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Multimedia",
            description: "La voz visual de lo que sucede en el altar, donde Dios se manifiesta",
            verse: "“De la misma manera, dejen que sus buenas acciones brillen a la vista de todos, para que todos alaben a su Padre celestial.” Mateo 5:16",
            icon: <Mic2 className="w-6 h-6 text-white" />,
            color: "from-[#14b8a6]/70 to-[#1e293b]/90",
            size: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
            image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Altar familiar",
            description: "Levantando altares para bendecir familias",
            verse: "“Constrúyanme un altar donde yo determine que recuerden mi nombre, y allí me presentaré ante ustedes y los bendeciré.” Éxodo 20:24",
            icon: <BookOpen className="w-6 h-6 text-white" />,
            color: "from-[#F4C95D]/60 to-[#0f172a]/90",
            size: "col-span-12 md:col-span-6 lg:col-span-4",
            image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?q=80&w=2069&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "Evangelismo",
            description: "Una expresión del amor ágape que busca la restauración del pecador",
            verse: "“Pues el amor de Cristo nos apremia, habiendo llegado a esta conclusión: que uno murió por todos, por consiguiente, todos murieron;” 2 Corintios 5:14",
            icon: <Users className="w-6 h-6 text-white" />,
            color: "from-[#1e293b]/70 to-[#14b8a6]/40",
            size: "col-span-12 md:col-span-6 lg:col-span-4",
            image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "Prejus",
            description: "Formado para honrar a Dios hoy y mañana",
            verse: "“¿Cómo puede mantenerse íntegro el joven?, viviendo conforme a tu palabra.” Salmos 119:9",
            icon: <BookOpen className="w-6 h-6 text-white" />,
            color: "from-[#14b8a6]/60 to-[#0f172a]/90",
            size: "col-span-12 md:col-span-12 lg:col-span-4",
            image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 7,
            title: "Matrimonios",
            description: "Matrimonios que viven el diseño del amor más el respeto",
            verse: "“En todo caso, cada uno de vosotros ame también a su mujer como a sí mismo, y que la mujer respete a su marido.” Efesios 5:33 LBLA",
            icon: <Heart className="w-6 h-6 text-white" />,
            color: "from-[#14b8a6]/70 to-[#1e293b]/90",
            size: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
            image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <section id="ministerios" className="py-20 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-[#1e293b] dark:to-[#0f172a] overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-slate-800 dark:text-white mb-4"
                    >
                        {t('ministries.title')}
                    </motion.h2>
                    <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('ministries.subtitle')}
                    </p>
                </div>

                {/* Bento Grid layout */}
                <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[250px]">
                    {ministries.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${item.size} cursor-pointer`}
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60 mix-blend-overlay`} />
                            </div>

                            <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="bg-[#F4C95D]/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-[#F4C95D]/30">
                                    {item.icon}
                                </div>
                                <h3 className="text-white font-heading text-2xl font-bold mb-1">{item.title}</h3>
                                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    {item.description}
                                </p>
                                <p className="text-yellow-300 text-xs italic mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {item.verse}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MinistriesSection;
