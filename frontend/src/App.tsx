import Index from "./pages/Index";
import RhemaPage from "./pages/RhemaPage";
import MinistriesPage from "./pages/MinistriesPage";
import MemberAdminPage from "./pages/MemberAdminPage";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleAnalytics from "./components/GoogleAnalytics";

const App = () => {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/rhema" element={<RhemaPage />} />
        <Route path="/ministerios" element={<MinistriesPage />} />
        <Route path="/admin/miembros" element={<MemberAdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
