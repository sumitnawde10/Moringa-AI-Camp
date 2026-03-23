import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import HealthAssessment from "./pages/HealthAssessment";
import CampSelection from "./pages/CampSelection";
import EyeForm from "./pages/CampForms/EyeForm";
import SummaryPage from "./pages/SummaryPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/health" element={<HealthAssessment />} />
        <Route path="/camp" element={<CampSelection />} />
        <Route path="/camp/eye" element={<EyeForm />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;