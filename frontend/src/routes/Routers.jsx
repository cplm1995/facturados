import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Facturas from '../pages/Facturas';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Facturas />} />
        <Route path="/facturas" element={<Facturas />} />
      </Routes>
    </Router>
  );
};

export default Routers;
