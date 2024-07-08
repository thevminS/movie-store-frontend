import { setRefreshCookies } from "@/app/lib/actions";
import { BACKEND_API_URL } from "@/config";
import { getCookies, setCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    
    const {token} =await request.json();

    console.log("---- in client side refresh --- \n token -", token)

    const response = await fetch(`${BACKEND_API_URL}/auth/refresh`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ token: token }),
    })
    console.log("response form back end refresh- ",response.status);
    if(response.ok){
        const data = await response.json();
        console.log("data from backend refresh-",data);
        await setRefreshCookies({
            token: data.token.accessToken,
            expiredIn: data.token.expiresIn
        });
        // setCookie("token", data.token.accessToken, {cookies});
        // setCookie("expiresIn", data.token.expiresIn, {cookies});
        return NextResponse.json({ message: "Hello World" }, { status: 200 });

        

    }

    return NextResponse.json({message: "Not"},{status: 403});



    
  }