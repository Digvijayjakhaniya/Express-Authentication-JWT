import mongoose from "mongoose";

const conn = async (db_url)=>{
    try {
        const db_option = {
            dbName:'user-auth'
        }
        mongoose.connect(db_url,db_option)
        console.log('DB connection successfully !')
    } catch (error) {
        console.log(error)
    }
}

export default conn;