'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

export default function VerifyEmailPage() {

    // const router = useRouter();

   const [token, setToken] =  useState("")
   const [verified, setVerified] = useState(false)
   const [error, setError] = useState(false)

   const verifyUserEmail = async () => {
    try {
        await axios.post("/api/users/verifyemail", {token})
        setVerified(true)
        setError(false)
    } catch (error:any) {
        console.log("Error in verifying email", error.resaponse.data)
        setError(true)
        
    }
   }

   // this use effect will run when the component mounts i.e. when the page loads
    // and it will extract the token from the url and set it to the state
   useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "" )



    // Actual implementation of next js
    // const {query} = router;  // getting all the queries that are being send to the router
    // const urlTokenTwo = query.token; // fetching the token fomr that query

   }, []) // we can also give a dependency injection of the Router here such that any change in the router will make it fetch a new token


   // this use effect will run when the token is set i.e. change occur in the value of token and it will call the verifyUserEmail function
   useEffect(() => {
    setError(false)
    if(token.length > 0){
        verifyUserEmail()
    }
   }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
  )
}

