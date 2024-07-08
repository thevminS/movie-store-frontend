import { BACKEND_API_URL } from "@/config";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: '/' });


export async function validateAuthToken() {
    const expiredIn = cookies.get("expiresIn");
    const refreshToken = cookies.get("refreshToken");
    if(new Date().getTime() > new Date(expiredIn).getTime()){
        console.log(" -----At refresh------");
        const response = await fetch(`${BACKEND_API_URL}/auth/refresh`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({ token: refreshToken }),
        });

        if(response.status == 200){
            const data = await response.json();
            console.log("data from backend refresh-",data);
            cookies.set("token", data.token.accessToken);
            cookies.set("expiresIn", data.token.expiresIn);
            return true;
        }else{
            removeCookies();
            return false;
        }
    }else{
        if(refreshToken){
            return true;
        }
        removeCookies();
        // console.log("--- Redirect ----")
        return false;
    }
    
}

function removeCookies(){
    cookies.remove("token");
    cookies.remove("expiresIn");
    cookies.remove("user");
    cookies.remove("refreshToken");
}