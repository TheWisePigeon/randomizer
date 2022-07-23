import client from "./client";

export default function connect(){
    const connection = client.connect(
        err=>{
            console.log(err);
            
        }
    )
    return connection
}