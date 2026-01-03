import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import RhemaPage from "./pages/RhemaPage";
import RhemaTVPage from "./pages/RhemaTVPage";
import EmbedPage from "./pages/EmbedPage";
import MinistriesPage from "./pages/MinistriesPage";
import MemberAdminPage from "./pages/MemberAdminPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleAnalytics from "./components/GoogleAnalytics";

const App = () => {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Analytics />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/rhema" element={<RhemaPage />} />
        <Route path="/rhema-tv" element={<RhemaTVPage />} />
        <Route path="/transmision/:type" element={<EmbedPage />} />
        <Route path="/ministerios" element={<MinistriesPage />} />
        <Route path="/admin/miembros" element={<MemberAdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
