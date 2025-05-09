import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

// request: NextRequest :- we will send a request whose type will bw NextRequest

export const getDatafromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value  || "" // getting the value of the token that we set in the login>>route.ts, if we are not able to get the value then set the value of token in empty string("")

        // decoding the token using jwt 
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        // const tokenData = {
        //     id: user._id,
        //     usernameL:user.username,
        //     email: user.email
        // }
    // In decoded token we will get all the that in passed in the tokenData in login>>route.ts
        return decodedToken.id  // geting this :- id: user._id,

    } catch (error:any) {
        throw new Error(error.message)
    }
}

// https://chatgpt.com/share/681d8fbd-136c-800c-991e-d9974e7d2771