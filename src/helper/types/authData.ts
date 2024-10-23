export interface LoginData {
    correo: string;
    contrasenia_hash: string;
}

export interface RegisterData {
    correo: string;
    contrasenia_hash: string;
    nombre: string;
    apellido: string;
    cargo: string;
    rango: string;
}

export interface Usuario {
    id_usuario: string;
    correo: string;
    nombre: string;
    apellido: string;
    cargo: string;
    rango: string;
}

export interface AuthContextType {
    usuario: Usuario | null;
    isAuthenticated: boolean;
    signup: (usuario: RegisterData) => Promise<void>;
    signin: (usuario: LoginData) => Promise<void>;
    logout: () => void;
    errors: string[];
    loading: boolean;
}
