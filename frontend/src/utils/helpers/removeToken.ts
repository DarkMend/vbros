import Cookies from "js-cookie";

const TOKEN = 'access_token';

export const removeToken = () => {
    Cookies.remove(TOKEN);
}