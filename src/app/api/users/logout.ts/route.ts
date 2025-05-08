import {connect} from '@/dbConfig/dbConfig'
import {NextRequest, NextResponse} from 'next/server'

connect() // now we can talk to the database

export async function GET(request: NextRequest){
    try { // for logout we will only expire the token
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}