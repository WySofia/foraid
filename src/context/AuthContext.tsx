// src/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import Cookies from 'js-cookie';

import {
    AuthContextType,
    LoginData,
    RegisterData,
    Usuario,
} from '../helper/types/authData';

import { loginReq, logoutReq, registerReq, verifyReq } from '@/helper/api/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    // Función para registrarse
    const signup = async (usuario: RegisterData) => {
        try {
            const res = await registerReq(usuario);
            if (res.status === 201) {
                setUsuario(res.data.user);
                Cookies.set('token', res.data.token, {
                    expires: 7,
                    secure: true,
                    sameSite: 'strict',
                });
                setIsAuthenticated(true);
            }
        } catch (error: unknown) {
            //console.error(error.response?.data);
            const message =
                error.response?.data?.message || 'Error al registrarse';
            setErrors([message]);
            setIsAuthenticated(false);
        }
    };

    // Función para iniciar sesión
    const signin = async (usuario: LoginData) => {
        try {
            const res = await loginReq(usuario);
            if (res.status === 200) {
                setUsuario(res.data.user);
                Cookies.set('token', res.data.token, {
                    expires: 7,
                    secure: true,
                    sameSite: 'strict',
                });
                setIsAuthenticated(true);
            }
        } catch (error: unknown) {
            //console.error(error.response?.data);
            const message =
                error.response?.data?.message || 'Error al iniciar sesión';
            setErrors([message]);
            setIsAuthenticated(false);
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        await logoutReq(); // Llamar a la API para cerrar sesión si es necesario
        Cookies.remove('token');
        setUsuario(null);
        setIsAuthenticated(false);
    };

    // Verificar si el usuario está autenticado al cargar la aplicación
    useEffect(() => {
        const checkLogin = async () => {
            const token = Cookies.get('token');
            if (!token || token === 'undefined') {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyReq();
                if (res.status === 200 && res.data.user) {
                    setUsuario(res.data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error: unknown) {
                //console.error('Error al verificar el token:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        void checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                usuario,
                signup,
                signin,
                logout,
                isAuthenticated,
                errors,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
