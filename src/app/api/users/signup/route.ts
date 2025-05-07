import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcrypt from "bcryptjs";
import {sendEmail} from '@/helpers/mailer'

connect() // now we can talk to the database

export async function POST(request: NextRequest){ // localhost:3000/api/users/signup
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        // validation
        console.log(reqBody);
       const user = await username.findOne({email})
       if(user) {
        return NextResponse.json({error: "User already exists"}, {status: 400})
       }

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const newUser = new User({
            username,
            email, 
            password: hashedPassword
       })

       const savedUser = await newUser.save()
       console.log(savedUser);

       // send verification email
       await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

       return NextResponse.json({
        message: "User registered successfully",
        success: true,
        savedUser
    })



    } catch (error: any) {
        return NextResponse.json({error: error.messsage}, {status: 500})
    }
}