import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest){
    try {   
        const reqBody = await request.json()
        const {email, password} = reqBody
        // validation
        console.log(reqBody);
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status:400})
        }

        console.log("User Exist")

        const validPassword = await bcrypt.compare(password, user.password) // return true or false

        if(!validPassword){
            return NextResponse.json({error: "Check your credentials"}, {status:400})
        }
        // now user have the correct password, now we will make tokens

        const tokenData = {
            id: user._id,
            usernameL:user.username,
            email: user.email
        }
        // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        // jwt.sign({ Token Data}, Secret Key);

    // jwt.sign({
    //     data: 'foobar'
    //     }, 'secret', { expiresIn: '1h' });

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

    const response = NextResponse.json({
        message: "Logged In Success",
        success: true
    })

    response.cookies.set("token", token, {
        httpOnly: true
    })
    // setting the cookies
    // response.cookies.set("token", token, {
    //     httpOnly: true
    // })
    // response.cookies.set( which things you want to store in cookies,  value of those things {
    //     httpOnly: true // marking this only allows server to make changes in the cookies(read and write privilages), while client only has the reading privilages
    // })
    return response;
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}