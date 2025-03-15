import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import PageLoader from "../components/PageLoader/PageLoader";

export default function PrivateProvider({ children }: { children: ReactNode }) {

    const token = Cookies.get('access_token');
    const route = useNavigate();
    const setUser = useUserStore(state => state.setUser);

    const { data, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.infoUser(),
        enabled: !!token
    })

    useEffect(() => {
        if (data) {
            setUser(data);
        }
        
        if (!token) {
            route('/auth/start')
        }
    }, [token, route, data]);

    return (
        <div>
            {
                isLoading ? <PageLoader /> : children
            }
        </div>
    )
}