import { motion } from "framer-motion";
import { Music, Users, BookOpen, Heart, Sparkles, Video, Church } from "lucide-react";
import { useTranslation } from "react-i18next";

const MinistriesSection = () => {
    const { t } = useTranslation();

    const ministries = [
        {
            id: 1,
            title: "Alabanza",
            description: "Adoración profética continua, sin velo y con gobierno",
            verse: "Asimismo David y los jefes del ejército apartaron para el ministerio a los hijos de Asaf, de Hemán y de Jedutún, para que profetizasen con arpas, salterios y címbalos; y el número de ellos, hombres idóneos para la obra de su ministerio, fue: - 1 Crónicas 25:1",
            icon: <Music className="w-6 h-6 text-white" />,
            image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Danza",
            description: "Una expresión integral de adoración",
            verse: "Por lo tanto, amados hermanos, les ruego que entreguen su cuerpo a Dios por todo lo que él ha hecho a favor de ustedes. Que sea un sacrificio vivo y santo, la clase de sacrificio que a él agrada. Esa es la verdadera forma de adorarlo. - Romanos 12:1",
            icon: <Sparkles className="w-6 h-6 text-white" />,
            image: "/images/danza-ministerio.jpg"
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
        }
    ];

    return (
        <section id="ministerios" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300">
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

                {/* Uniform Bento Grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {ministries.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[400px]"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-colors duration-300" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                {/* Icon at top */}
                                <div className="bg-[#F4C95D]/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center border border-[#F4C95D]/30 self-start">
                                    {item.icon}
                                </div>

                                {/* Text at bottom */}
                                <div>
                                    <h3 className="text-white font-heading text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-200 text-sm mb-3">
                                        {item.description}
                                    </p>
                                    <p className="text-[#F4C95D] text-xs italic leading-relaxed">
                                        {item.verse}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MinistriesSection;
