import { connect, connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' })

const uri = "mongodb://localhost:27017";

export default function ConnectDB() {
    connect(uri);
    const db = connection;
    db.on('error', (err) => {
        console.log("404 Not Found", err)
    });
    db.once('open', () => {
        console.log("Connection successfull....")
    })
}