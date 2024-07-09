'use server'

import { BACKEND_API_URL } from "@/config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";

import { checkAndRefreshToken } from "../_utils/refresh";

 
export async function authenticate(_currentState: unknown, formData: FormData) {
    const email:string = formData.get("email") as string;
    const password:string = formData.get("password") as string;

    const data = await authenticateUser(email,password);

    if(data === null){
        return "Invalid Credentials"
    }
    saveDataInCookies(data);
    redirect("/movies");
}

async function authenticateUser(email:string, password:string){

    const response = await sendRequest(
        `${BACKEND_API_URL}/auth/login`,
        "POST",
        {
            email: email,
            password: password,
        }
    );
    console.log(response);
    if(response.ok){
        const data = await response.json();
        console.log(data);
        return data;
    }
    return null;
}


export async function register(_currentState: unknown, formData: FormData) {

    const email:string = formData.get("email") as string;
    const password:string = formData.get("password") as string;
    const name: string = formData.get("name") as string;
    const profileImageUrl: string =formData.get("profileImageUrl") as string;

    const data = await registerUser(name,email,password,profileImageUrl);
    
    if(data === null){
        return "User already exists or invalid details";
    }
    saveDataInCookies(data);
    redirect("/movies");
}

async function registerUser(name: string,email: string,password: string,profileImageUrl : string){
    const response = await sendRequest(
        `${BACKEND_API_URL}/auth/register`,
        "POST",
        {
            name:name,
            email:email,
            password:password,
            profileImageUrl: profileImageUrl
        }
    );

    if(response.ok){
        const data = await response.json();
        console.log(data);
        return data;
    }
    return null;
}

function sendRequest(url:string, method:string, body:any) {
    const options = {
        method: method,
        headers: new Headers({'content-type': 'application/json'}),
        mode: 'no-cors',
        body: "",
    };

    options.body = JSON.stringify(body);

    return fetch(url, options as any);
}

export async function logout() {

    const cookieStore = cookies();

    const token = cookieStore.get("token");

    await fetch(`${BACKEND_API_URL}/auth/refresh`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({ token: token }),
    });

    cookieStore.delete("user");
    cookieStore.delete("expiresIn");
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");

    redirect("/auth/login");

}

function saveDataInCookies(data : any){
    setCookie("user", data.user, {cookies});
    setCookie("token", data.token.accessToken, {cookies});
    setCookie("refreshToken", data.token.refreshToken, {cookies});
    setCookie("expiresIn", data.token.expiresIn, {cookies});
}

export async function createReview(_currentState: unknown, formData: FormData) {
    const res = await checkAndRefreshToken();
    if(!res){
        return "logout";
    }
    console.log(formData);
    const movieId:string = formData.get("movieId") as string;
    const review:string = formData.get("review") as string;

    const user =JSON.parse(cookies().get("user")?.value ?? "");

    const token = cookies().get("token")?.value;

    console.log({user, movieId, review, token});

    await fetch(`${BACKEND_API_URL}/reviews`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ 
            userId : user?.id,
            movieId : movieId,
            review : review
         }),
    });
    return "refresh";
}


