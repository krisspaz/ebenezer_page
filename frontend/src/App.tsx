import Index from "./pages/Index";
import AttendancePage from "./pages/AttendancePage";
import AttendanceReport from "./pages/AttendanceReport";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/asistencia" element={<AttendancePage />} />
        <Route path="/asistencia/reporte" element={<AttendanceReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
