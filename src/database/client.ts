import { MongoClient, ServerApiVersion, MongoClientOptions } from "mongodb"

const uri = "mongodb+srv://thewisepigeon:pVnNZP5wq7BeQYY0@randomizer.8ebez.mongodb.net/?retryWrites=true&w=majority"
const config: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
} as MongoClientOptions
const client = new MongoClient(uri, config );
export default client