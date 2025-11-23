import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    title: "Servicio de Oración",
    date: "Lunes",
    time: "8:00 AM - 10:00 AM",
    location: "Templo Principal",
    type: "Oración",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    title: "Servicio General",
    date: "Martes",
    time: "7:00 PM - 9:00 PM",
    location: "Templo Principal",
    type: "Servicio",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    iconColor: "text-amber-600",
  },
  {
    title: "Servicio de Jóvenes",
    date: "Viernes",
    time: "7:00 PM - 9:00 PM",
    location: "Salón de Jóvenes",
    type: "Juventud",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    title: "Servicios Dominicales",
    date: "Domingos",
    time: "8:00 AM y 10:30 AM",
    location: "Templo Principal",
    type: "Servicio",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    iconColor: "text-emerald-600",
  },
];

const EventsSection = () => {
  return (
    <section id="eventos" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
            NUESTROS <span className="text-accent">HORARIOS</span>
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Te invitamos a ser parte de nuestras reuniones semanales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge className={`${event.color} border px-3 py-1 text-xs font-semibold rounded-md shadow-none mb-3`}>
                    {event.type.toUpperCase()}
                  </Badge>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">
                    {event.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className={`w-5 h-5 mr-3 ${event.iconColor}`} />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className={`w-5 h-5 mr-3 ${event.iconColor}`} />
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className={`w-5 h-5 mr-3 ${event.iconColor}`} />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
