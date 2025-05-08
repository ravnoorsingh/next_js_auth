// displaying all the user information

import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import { getDatafromToken } from '@/helpers/getDataFromToken';

connect() // connecting to the database

export async function POST(request: NextRequest){
    // here we will extract every user's unique id from the token , send that id to the database, databes will match the id and the required info of that user to frontned

    // extract data from token :- making a utility to perform this => getDataFromToken.ts(inside helpers folder)
    // geting the id using getDataFromToken.ts(inside helpers folder)
    try{
        const userId =  await getDatafromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")
    // .select("-password") :- to avoid getting the password
    
    // Check if there is no user
    // if (!user) {
    //     return NextResponse.json(
    //         { error: "User not found" },
    //         { status: 404 }
    //     );
    // }
    

    // if the user exists then send the response
    return NextResponse.json({
        message: "User found",
        data: user
    })
    }
    catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}  

 