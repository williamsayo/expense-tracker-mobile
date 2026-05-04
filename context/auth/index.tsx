import { BACKEND_BASE_URL } from "@/constants";
import {
    asyncDeleteItem,
    asyncGetItem,
    asyncSetItem,
} from "@//lib/utils/storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { api } from "@/lib/network/apiClient";
import { SignUpFormData } from "@/components/forms/onboarding/sign-up/sign-up-resolver";

type AuthResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
};

type Auth = {
    isAuthenticated: boolean;
    token: string | null;
};

type AuthContext = {
    auth: Auth;
    authenticate: (email: string, password: string) => void;
    register: (registerData: SignUpFormData) => void;
    logout: () => void;
};
const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<Auth>({
        isAuthenticated: false,
        token: null,
    });

    useEffect(() => {
        const checkAuth = async () => {
            const token = await asyncGetItem("AUTH_TOKEN");
            if (token) {
                api.defaults.headers.common["Authorization"] =
                    `Bearer ${token}`;
                setAuth({
                    isAuthenticated: true,
                    token,
                });
            }
        };
        checkAuth();
        // asyncDeleteItem("AUTH_TOKEN");
    }, []);

    const register = async (registerData: SignUpFormData) => {
        try {
            const response = await api.post("/auth/register", {
                ...registerData,
            });

            if (response.status === 201) {
                await authenticate(registerData.email, registerData.password);
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const authenticate = async (email: string, password: string) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            if (response.status === 200) {
                const { access_token, refresh_token }: AuthResponse =
                    response.data;
                api.defaults.headers.common["Authorization"] =
                    `Bearer ${access_token}`;
                await Promise.all([
                    asyncSetItem("AUTH_TOKEN", access_token),
                    asyncSetItem("REFRESH_TOKEN", refresh_token),
                ]);
                setAuth({
                    isAuthenticated: true,
                    token: access_token,
                });
            }
        } catch (error) {
            console.error("Authentication error:", error);
        }
    };

    const logout = async () => {
        setAuth({
            isAuthenticated: false,
            token: null,
        });
        await Promise.all([
            asyncDeleteItem("AUTH_TOKEN"),
            asyncDeleteItem("REFRESH_TOKEN"),
        ]);
    };

    return (
        <AuthContext.Provider value={{ auth, authenticate, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
