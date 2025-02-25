import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function PrivateProvider({ children }: { children: ReactNode }) {

    const token = Cookies.get('access_token');
    const route = useNavigate();

    useEffect(() => {
        if (!token) {
            route('/auth/start')
        }
    }, [token, route]);

    return (
        <div>
            {
                children
            }
        </div>
    )
}