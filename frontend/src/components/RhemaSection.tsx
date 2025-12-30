import { useState, useEffect } from 'react';
import { Search, Loader2, BookOpen, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Magazine {
    title: string;
    link: string;
    image: string;
}

interface RhemaSectionProps {
    isHome?: boolean;
}

// Magazine Card Component with proper error handling
const MagazineCard = ({ mag, colorClass }: { mag: Magazine; colorClass: string }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <a
            href={mag.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <Card className="overflow-hidden border-0 bg-transparent shadow-none group-hover:-translate-y-2 transition-transform duration-300">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10">
                    {!imageError ? (
                        <img
                            src={mag.image}
                            alt={mag.title}
                            referrerPolicy="no-referrer"
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} flex flex-col items-center justify-center p-6 text-center`}>
                            <div className="w-20 h-20 mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                <BookOpen className="w-10 h-10 text-white" />
                            </div>
                            <span className="text-white/80 text-xs uppercase tracking-widest mb-2 font-medium">Revista Rhema</span>
                            <span className="text-white font-bold text-xl leading-tight">{mag.title}</span>
                            <div className="mt-4 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Leer Ahora
                        </span>
                    </div>
                </div>
                <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {mag.title}
                    </h3>
                </CardContent>
            </Card>
        </a>
    );
};

export const RhemaSection = ({ isHome = false }: RhemaSectionProps) => {
    const [magazines, setMagazines] = useState<Magazine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                // Fetch from static JSON file in public folder
                const response = await fetch('/rhema.json');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setMagazines(data);
            } catch (err) {
                console.error(err);
                setError(true);
                // Fallback data for demo/local purposes if API fails
                setMagazines([
                    { "title": "DICIEMBRE 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/12/189RevistaRhema-Diciembre2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/12/Screenshot-2025-12-08-at-3.53.32-PM.png" },
                    { "title": "NOVIEMBRE 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/11/188-Noviembre2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/11/IMG_1066.jpeg" },
                    { "title": "OCTUBRE 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/10/187RevistaRhemaOctubre2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/10/Screenshot-2025-10-06-at-11.57.21-AM.png" },
                    { "title": "SEPTIEMBRE 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/09/186RevistaRhema-Septiembre2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/09/Screenshot-2025-09-08-at-17.37.14.png" },
                    { "title": "AGOSTO 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/08/185RevistaRhema-Agosto2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/08/IMG_5565.jpeg" },
                    { "title": "JULIO 2025", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2025/07/Julio2025.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2025/07/IMG_4831.jpeg" },
                    { "title": "JUNIO 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/183RevistaRhema-Junio2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/183RevistaRhema-Junio2025-1.png" },
                    { "title": "MAYO 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/05/182_Mayo2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/05/IMG_3521.jpeg" },
                    { "title": "ABRIL 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/04/181_RhemaRevista_Abril.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/04/IMG_2999.jpeg" },
                    { "title": "MARZO 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/03/180_RhemaRevista_Espanol_Marzo2025_15Aniversario.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/03/IMG_2308.jpeg" },
                    { "title": "FEBRERO 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/02/179_RhemaRevista_Espanol_Febrero2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/02/IMG_0536.jpeg" },
                    { "title": "ENERO 2025", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/01/178_RhemaRevista_Espanol_Enero2025.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/01/178_RhemaRevista_Espanol_Enero2025-1.jpg" },
                    { "title": "DICIEMBRE 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/177_RhemaRevista_Espanol_Diciembre2024.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.32.19.png" },
                    { "title": "PRE PROCLAMA 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/PreProclamaProfetica_2024_ByRevistaRhema.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.34.32.png" },
                    { "title": "NOVIEMBRE 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/176_RhemaRevista_Espanol_Noviembre2024.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.30.48.png" },
                    { "title": "OCTUBRE 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/175_RhemaRevista_Espanol_Octubre2024.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.28.49.png" },
                    { "title": "RETIRO LAS VEGAS 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Retiro_Pastores_LasVegas2024_ByRevistaRhema.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.24.10.png" },
                    { "title": "SEPTIEMBRE 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/174_RhemaRevista_Espanol_Septiembre2024.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.21.54.png" },
                    { "title": "AGOSTO 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/173_RhemaRevista_Espanol_Agosto2024.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-13.05.20.png" },
                    { "title": "JULIO 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/172_RhemaRevista_Espanol_Julio2024.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.52.49.png" },
                    { "title": "JUNIO 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/171_RhemaRevista_Espanol_Junio2024.pdf.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.06.50.png" },
                    { "title": "MAYO 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/170.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-11.51.38.png" },
                    { "title": "ABRIL 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/169_RhemaRevista_Espanol_Abril2024-2.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-12.10.28.png" },
                    { "title": "MARZO 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/168-2.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-11.14.33.png" },
                    { "title": "FEBRERO 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/167.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-11.12.11.png" },
                    { "title": "ENERO 2024", "link": "https://ebenezer.org.gt/wp-content/uploads/2025/06/166.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2025/06/Screenshot-2025-06-05-at-11.07.26.png" },
                    { "title": "ENERO", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/01/154_RhemaRevista_Espanol_Ene23-2.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/01/154_RhemaRevista_Espanol_Ene23-2-1.jpg" },
                    { "title": "FEBRERO", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/02/155_RhemaRevista_Espanol_Feb23-1.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/02/Captura-de-pantalla-2023-02-05-140806.jpg" },
                    { "title": "MARZO", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/03/05791733-e636-4b9a-b956-fa896f3343cb.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/03/Captura.png" },
                    { "title": "ABRIL", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/04/6105f914-bf24-4ad5-b205-cafe27c24b4f.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/04/Captura.png" },
                    { "title": "MAYO", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/05/158-_RhemaRevista_Espanol_Mayo23.pdf.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/05/2BD984F7-E98A-4C36-BA07-BEC6315F6352-scaled.jpeg" },
                    { "title": "JUNIO", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2023/06/159-_RhemaRevista_Espanol_Junio23-1.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2023/06/Imagen-de-WhatsApp-2023-06-04-a-las-11.39.37.jpg" },
                    { "title": "JULIO", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/07/160-_RhemaRevista_Espanol_Julio23.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/07/160portada-scaled.jpg" },
                    { "title": "AGOSTO", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/08/161-_RhemaRevista_Espanol_Agosto23.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/08/A1378F8E-4304-4911-970D-A9D974989AD2-scaled.jpeg" },
                    { "title": "SEPTIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/09/162-_RhemaRevista_Espanol_Septiembre23.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/09/IMG_2620.jpeg" },
                    { "title": "OCTUBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/10/163-_RhemaRevista_Espanol_Octubre23-2.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/09/Captura-de-pantalla-2023-09-30-210905.png" },
                    { "title": "NOVIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/11/164-_RhemaRevista_Espanol_Noviembre23.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/11/NOV-2023-11-04-125648.png" },
                    { "title": "DICIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2023/12/165-_RhemaRevista_Espanol_Diciembre23.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2023/12/revista-dic.png" },
                    { "title": "ENERO", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2022/01/142_Revista_Rhema.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2022/01/photo_2022-01-02_12-06-21.jpg" },
                    { "title": "FEBRERO", "link": "https://ebenezer.org.gt/wp-content/uploads/2022/03/143_RevistaRhema.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2022/02/image_2022-02-07_17-59-29.png" },
                    { "title": "MARZO", "link": "https://ebenezer.org.gt/wp-content/uploads/2022/03/144_Rev_Marzo.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2022/03/Captura-de-Pantalla-2022-03-05-a-las-09.33.06.png" },
                    { "title": "ABRIL", "link": "https://ebenezer.org.gt/wp-content/uploads/2022/04/Edicion_145_abril_2022.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2022/04/image_2022-04-02_00-07-33.png" },
                    { "title": "MAYO", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2022/05/Edicio%CC%81n_Especial_146_mayo_2022.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2022/05/Captura-de-Pantalla-2022-05-08-a-las-12.51.21.png" },
                    { "title": "JUNIO", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2022/06/147Rhema_Revista_Espan%CC%83ol.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2022/06/Captura-de-Pantalla-2022-06-03-a-las-18.24.06.png" },
                    { "title": "JULIO", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2022/07/148Rhema_Revista_Espan%CC%83ol.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2022/07/VIENDO-EL-ESPITIRU.jpg" },
                    { "title": "AGOSTO", "link": "https://ebenezer.org.gt/wp-content/uploads/2022/08/149Rhema_Revista_Espan%CC%83ol.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2022/08/Captura-de-pantalla-2022-08-07-092231.jpg" },
                    { "title": "SEPTIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2022/09/150Rhema_Revista_Espan%CC%83ol.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2022/09/Revista-Septiembre.jpg" },
                    { "title": "OCTUBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2022/10/151Rhema_Revista_Espanol.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2022/10/5EF5E7D3-53F4-4B70-9451-4EBA944E8EF0-scaled.jpeg" },
                    { "title": "NOVIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2022/11/152Rhema_Revista_Espanol.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2022/11/5D97E909-810A-4C76-8237-9E1349E26D50.jpeg" },
                    { "title": "DICIEMBRE", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2022/12/153_RhemaRevista_Espanol_Dic22.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2022/12/Captura-de-pantalla-2022-12-04-122919.jpg" },
                    { "title": "ENERO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/130.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/10/photo_2021-10-04_15-03-32.jpg" },
                    { "title": "FEBRERO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/131-1.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/10/photo_2021-10-04_15-03-41.jpg" },
                    { "title": "MARZO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/132-Revista-Rhema.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/132-Revista-Rhema-1.jpg" },
                    { "title": "ABRIL", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/133.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/10/photo_2021-10-04_15-03-45.jpg" },
                    { "title": "MAYO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/134.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/10/photo_2021-10-04_15-03-36.jpg" },
                    { "title": "JUNIO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/06/135_revistarhema_junio_web.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/06/135_revistarhema_junio_web-1.jpg" },
                    { "title": "JULIO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/07/136_revistarhema_final2.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/07/Captura-de-Pantalla-2021-07-07-a-las-16.59.21.png" },
                    { "title": "AGOSTO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/08/Final_03_137_revistarhema_agosto.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/08/REVISTA-AGOSTO.jpeg" },
                    { "title": "SEPTIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/09/Revista-Rhema-138.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/09/photo_2021-09-05_11-32-46.jpg" },
                    { "title": "OCTUBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/10/139_revistarhema_octubre.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/10/photo_2021-10-03_08-59-50-1.jpg" },
                    { "title": "NOVIEMBRE", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2021/11/Final_140_revistarhema_noviembre.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2021/11/photo_2021-11-07_10-51-32.jpg" },
                    { "title": "DICIEMBRE", "link": "https://www.ebenezer.org.gt/wp-content/uploads/2021/12/141_web_revistarhema_diciembre.pdf", "image": "https://www.ebenezer.org.gt/wp-content/uploads/2021/12/image_2021-12-05_08-29-33.png" },
                    { "title": "ENERO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/118.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/1-ENERO-1.jpg" },
                    { "title": "FEBRERO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/119pdf.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/2-FEBRERO-1.jpg" },
                    { "title": "MARZO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/120-2.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/3-MARZO-1.jpg" },
                    { "title": "ABRIL", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/121.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/4-ABRIL.jpg" },
                    { "title": "MAYO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/122.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/5-MAYO.jpg" },
                    { "title": "JUNIO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/123.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/6-JUNIO.jpg" },
                    { "title": "JULIO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/124.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/7-JULIO.jpg" },
                    { "title": "AGOSTO", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/125.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/8.jpg" },
                    { "title": "SEPTIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/126.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/9-SEPTIEMBRE.jpg" },
                    { "title": "OCTUBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/127.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/10-OCTUBRE.jpg" },
                    { "title": "NOVIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/128_Noviembre-optimized.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/11-NOVIEMBRE.jpg" },
                    { "title": "DICIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/129.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/12-DICIEMBRE.jpg" },
                    { "title": "DICIEMBRE", "link": "https://ebenezer.org.gt/wp-content/uploads/2021/05/9.pdf", "image": "https://ebenezer.org.gt/wp-content/uploads/2021/05/Diciembre.jpg" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchMagazines();
    }, []);

    // Extract year from title (e.g., "DICIEMBRE 2024" -> 2024)
    const extractYear = (title: string): string => {
        const match = title.match(/\b(20\d{2})\b/);
        return match ? match[1] : 'Otros';
    };

    // Group magazines by year
    const groupByYear = (mags: Magazine[]): Record<string, Magazine[]> => {
        return mags.reduce((acc, mag) => {
            const year = extractYear(mag.title);
            if (!acc[year]) acc[year] = [];
            acc[year].push(mag);
            return acc;
        }, {} as Record<string, Magazine[]>);
    };

    const filteredMagazines = magazines.filter(mag =>
        mag.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get grouped magazines for full page view
    const groupedMagazines = groupByYear(filteredMagazines);
    const sortedYears = Object.keys(groupedMagazines).sort((a, b) => {
        if (a === 'Otros') return 1;
        if (b === 'Otros') return -1;
        return parseInt(b) - parseInt(a);
    });

    // Show only first 4 if home, otherwise use grouped view
    const displayedMagazines = isHome ? magazines.slice(0, 4) : filteredMagazines;

    return (
        <section id="rhema" className="py-24 bg-slate-50 dark:bg-[#0b1120] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                        <BookOpen className="w-4 h-4" />
                        <span>Edificación</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Revista Rhema
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Descubre nuestras ediciones mensuales llenas de palabra, enseñanza y profecía para tu vida.
                    </p>
                </div>

                {/* Search Bar */}
                {!isHome && (
                    <div className="max-w-md mx-auto mb-12 relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Buscar revista por mes o año..."
                                className="pl-10 h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Content - Home View (simple grid) */}
                {isHome && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ))
                        ) : (
                            displayedMagazines.map((mag, index) => {
                                const gradientColors = [
                                    'from-blue-600 via-indigo-600 to-purple-700',
                                    'from-amber-500 via-orange-500 to-red-600',
                                    'from-emerald-500 via-teal-500 to-cyan-600',
                                    'from-rose-500 via-pink-500 to-purple-600',
                                ];
                                const colorClass = gradientColors[index % gradientColors.length];
                                return (
                                    <MagazineCard
                                        key={index}
                                        mag={mag}
                                        colorClass={colorClass}
                                    />
                                );
                            })
                        )}
                    </div>
                )}

                {/* Content - Full Page View (grouped by year) */}
                {!isHome && (
                    <div className="space-y-12">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="space-y-4">
                                        <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                ))}
                            </div>
                        ) : sortedYears.length > 0 ? (
                            sortedYears.map((year) => (
                                <div key={year}>
                                    {/* Year Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                                            {year}
                                        </h3>
                                        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent" />
                                        <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                            {groupedMagazines[year].length} ediciones
                                        </span>
                                    </div>

                                    {/* Year Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                        {groupedMagazines[year].map((mag, index) => {
                                            const gradientColors = [
                                                'from-blue-600 via-indigo-600 to-purple-700',
                                                'from-amber-500 via-orange-500 to-red-600',
                                                'from-emerald-500 via-teal-500 to-cyan-600',
                                                'from-rose-500 via-pink-500 to-purple-600',
                                                'from-violet-600 via-purple-600 to-indigo-700',
                                                'from-cyan-500 via-blue-500 to-indigo-600',
                                            ];
                                            const colorClass = gradientColors[index % gradientColors.length];
                                            return (
                                                <MagazineCard
                                                    key={`${year}-${index}`}
                                                    mag={mag}
                                                    colorClass={colorClass}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                                    <AlertCircle className="w-6 h-6 text-slate-400" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-400">
                                    No se encontraron revistas que coincidan con tu búsqueda.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {error && !loading && (
                    <p className="text-xs text-center text-slate-400 mt-8">
                        * Mostrando últimas ediciones disponibles.
                    </p>
                )}
            </div>
        </section>
    );
};
