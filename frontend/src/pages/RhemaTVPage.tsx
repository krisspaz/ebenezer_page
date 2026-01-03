import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

const RhemaTVPage = () => {
    return (
        <div className="fixed inset-0 w-full h-full bg-black z-50">
            <SEO
                title="Rhema TV | Ebenezer Cobán"
                description="Señal en vivo de Rhema TV. Disfruta de nuestra programación y servicios en directo."
                url="/rhema-tv"
            />

            {/* Back Button */}
            <Link
                to="/"
                className="absolute top-4 left-4 z-[100] bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all border border-white/20 group"
                title="Regresar al inicio"
            >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </Link>

            {/* TV Player Full Screen */}
            <iframe
                src="https://www.rtv.live/"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Rhema TV En Vivo"
            />
        </div>
    );
};

export default RhemaTVPage;
