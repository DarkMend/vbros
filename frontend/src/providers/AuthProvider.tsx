import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import PageLoader from "../components/PageLoader/PageLoader";
import { useUserStore } from "../store/userStore";
import { IUser } from "../interfaces/user.interface";

export default function AuthProvider({children}: {children: ReactNode}) {
    const token = Cookies.get('access_token');
    const setUser = useUserStore(state => state.setUser);
    
    const {data, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.infoUser(),
        enabled: !!token
    })

    useEffect(() => {
        if(data){
            setUser(data as IUser);
        }
    }, [data])

    return (
        <div>
            {
            isLoading ? <PageLoader /> : children
            }
        </div>
    )
}