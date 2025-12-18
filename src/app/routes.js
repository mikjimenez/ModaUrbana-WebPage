import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { useAuth } from '../context/AppContext';

function RequireAuth({ children }) {
    const { isAuthed } = useAuth();
    if (!isAuthed) return <Navigate to="/login" replace />;
    return children;
}


function AppRoutes(){
    return (
        <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos" element={<RequireAuth><Products /></RequireAuth>} />
            <Route path="/contacto" element={<Contact />} />
        </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
