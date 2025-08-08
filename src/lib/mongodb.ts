import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please add your Mongo URI to environment variables");

const options: MongoClientOptions = {}; // bisa diisi opsi tambahan jika perlu

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // supaya tipe global cache bisa dikenali
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Gunakan global cache agar koneksi mongo reuse saat hot reload dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production: buat client baru setiap start
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
