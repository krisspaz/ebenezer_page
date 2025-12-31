import Index from "./pages/Index";
import RhemaPage from "./pages/RhemaPage";
import MinistriesPage from "./pages/MinistriesPage";
import MemberAdminPage from "./pages/MemberAdminPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/rhema" element={<RhemaPage />} />
        <Route path="/ministerios" element={<MinistriesPage />} />
        <Route path="/admin/miembros" element={<MemberAdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
