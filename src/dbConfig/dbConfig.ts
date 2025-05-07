import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONDO_URI!)
        const connection = mongoose.connection;

        // making this connection variable helps us in getting rid of the issue after a connection to a DB has been made

        connection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure db is up and running' + err);
            process.exit()
        })

    } catch (error){
        console.log("Something went wrong while connecting to DB");
        console.log(error);
    }
}