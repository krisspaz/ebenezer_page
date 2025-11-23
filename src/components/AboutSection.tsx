import { Heart, Users, Book, HandHeart } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Fe",
    description: "Fundamentados en las enseñanzas de Cristo",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Unidos como una familia en el amor de Dios",
  },
  {
    icon: Book,
    title: "Palabra",
    description: "Guiados por las Sagradas Escrituras",
  },
  {
    icon: HandHeart,
    title: "Servicio",
    description: "Sirviendo a nuestra comunidad con amor",
  },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
            SOBRE <span className="text-accent">NOSOTROS</span>
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
            La Iglesia de Cristo Ebenezer Cobán es una comunidad de fe dedicada a compartir
            el amor de Cristo y servir a nuestra ciudad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-24">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center group p-8 rounded-2xl hover:bg-white hover:shadow-elegant transition-all duration-500 border border-transparent hover:border-border/50"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-500 shadow-sm">
                <value.icon className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Misión Card */}
          <div className="bg-white p-10 md:p-12 rounded-2xl shadow-sm border border-border/50 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
            <div className="flex items-start gap-6 mb-6">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-500">
                <Book className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-500" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-heading text-3xl font-bold text-primary mb-2">
                  Misión
                </h3>
                <div className="w-12 h-1 bg-accent/30 rounded-full"></div>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Glorificar a Dios a través de la adoración sincera, el estudio profundo
              de su Palabra, y el servicio comprometido a nuestra comunidad. Buscamos
              ser instrumentos del amor de Cristo, transformando vidas.
            </p>
          </div>

          {/* Visión Card */}
          <div className="bg-white p-10 md:p-12 rounded-2xl shadow-sm border border-border/50 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <div className="flex items-start gap-6 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-500">
                <Heart className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-heading text-3xl font-bold text-primary mb-2">
                  Visión
                </h3>
                <div className="w-12 h-1 bg-primary/30 rounded-full"></div>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Ser una iglesia que impacte positivamente a Cobán y sus alrededores,
              siendo conocidos por nuestro amor genuino, servicio desinteresado y
              compromiso inquebrantable con la verdad del Evangelio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
