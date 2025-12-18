import { createContext, useContext, useMemo, useState } from 'react';
import { login as apiLogin } from '../api/modaUrbanaApi';

const AppContext = createContext(null);

const TOKEN_KEY = 'modaUrbana.jwt';

export function AppProvider({ children }){
    const [cartCount, setCartCount] = useState(0);
    const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_KEY) || '');

    const addToCart = () => setCartCount(c => c + 1);

    const isAuthed = Boolean(token);

    const login = async (username, password) => {
        const res = await apiLogin({ username, password });
        const jwt = res?.token;
        if (!jwt) throw new Error('Login OK pero no llegó token');
        window.localStorage.setItem(TOKEN_KEY, jwt);
        setToken(jwt);
        return jwt;
    };

    const logout = () => {
        window.localStorage.removeItem(TOKEN_KEY);
        setToken('');
    };

    const value = useMemo(() => ({
        cartCount,
        addToCart,
        token,
        isAuthed,
        login,
        logout,
    }), [cartCount, token, isAuthed]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useCart(){
    const ctx = useContext(AppContext);
    if(!ctx) throw new Error('useCart debe usarse dentro de AppProvider');
    return ctx;
}

export function useAuth() {
    const ctx = useContext(AppContext);
    if(!ctx) throw new Error('useAuth debe usarse dentro de AppProvider');
    const { token, isAuthed, login, logout } = ctx;
    return { token, isAuthed, login, logout };
}
