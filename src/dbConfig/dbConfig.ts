import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        // making this connection variable helps us in getting rid of the issue after a connection to a DB has been made

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure db is up and running' + err);
            process.exit()
        })

    } catch (error){
        console.log("Something went wrong while connecting to DB");
        console.log(error);
    }
}

// https://chatgpt.com/share/681be6aa-5690-800c-9098-5a07c2f31b55