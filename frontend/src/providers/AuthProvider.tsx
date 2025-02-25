import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

export default function AuthProvider({ children }: { children: ReactNode }) {

    const token = Cookies.get('access_token');

    useEffect(() => {
        
    }, [token])

    return (
        <div>
            {children}
        </div>
    )
}