import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import PageLoader from "../components/PageLoader/PageLoader";

export default function AuthProvider({children}: {children: ReactNode}) {
    const token = Cookies.get('access_token');
    
    const {data, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.infoUser(),
        enabled: !!token
    })

    useEffect(() => {
        if(data){
            console.log(data);
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