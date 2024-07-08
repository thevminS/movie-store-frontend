import { BACKEND_API_URL} from "@/config";
import { cookies } from "next/headers";

export async function checkAndRefreshToken(){
    const expiredIn = cookies().get("expiresIn")?.value;
    const refreshToken = cookies().get("refreshToken")?.value;
    // console.log("At refresh");
    // console.log(expiredIn);
    if(new Date().getTime() > new Date(expiredIn as string).getTime()){
        // console.log(" -----At refresh------");
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
            cookies().set("token", data.token.accessToken);
            cookies().set("expiresIn", data.token.expiresIn);
            return true;
        }else{
            removeCookies();
            return false;
        }
    }else{
        if(refreshToken){
            return true;
        }else{
            removeCookies();
            // console.log("--- Redirect ----");
            return false;
        } 
    }
}

function removeCookies(){
    cookies().delete("token");
    cookies().delete("expiresIn");
    cookies().delete("user");
    cookies().delete("refreshToken");
}
