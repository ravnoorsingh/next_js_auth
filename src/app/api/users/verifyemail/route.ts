import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody =  await request.json()
        const {token} = reqBody
        console.log(token);

        // Assume token is received

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry:{$gt: Date.now()}}) // both the conditoin,  token should mathch and expiry date greater than the current then only we will get a user

        if(!user){
            return NextResponse.json({error:"Invalid Token"}, {status: 500})
        }

        console.log(user);

        user.isVerified = true
        user.verifyToke = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Email verofoed successfully",
            success: true,
        }, {status: 500})


    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 500})
    }
}