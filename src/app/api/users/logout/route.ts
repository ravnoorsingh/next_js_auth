// import { NextResponse} from 'next/server'

// // connect() // now we can talk to the database

// export async function GET(){
//     try { // for logout we will only expire the token
//         const response = NextResponse.json({
//             message: "Logout Successfully",
//             success: true
//         })

//         response.cookies.set("token", "", {
//             httpOnly: true,
//             expires: new Date(0)
//         })

//         return response;
        
//     } catch (error:any) {
//         return NextResponse.json({error: error.message}, {status: 500})
//     }
// }

// import { NextResponse } from "next/server";


// export async function GET() {
//     try {
//         const response = NextResponse.json(
//             {
//                 message: "Logout successful",
//                 success: true,
//             }
//         )
//         response.cookies.set("token", "", 
//         { httpOnly: true, expires: new Date(0) 
//         });
//         return response;
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
        
//     }

import { NextResponse } from "next/server";

export async function GET() {
    console.log("Logout route hit");
    try {
        console.log("Logout route hit");
        // Create a response to clear the token cookie
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Clear the token cookie by setting it to an empty value and expiring it
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Expire the cookie immediately
        });

        return response;
    } catch (error: any) {
        console.error("Error in logout route:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


