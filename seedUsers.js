// seedUsers.js
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Baca file .env.local
dotenv.config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MONGODB_URI tidak ditemukan di .env.local");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("bemstti"); // sesuaikan dengan nama DB kamu
    const usersCollection = db.collection("users");

    const users = [
      {
        email: "admin@bem.sch.id",
        password: await bcrypt.hash("rthdl123", 10),
        role: "admin",
      },
      {
        email: "subadmin@bem.sch.id",
        password: await bcrypt.hash("subpass123", 10),
        role: "subadmin",
      },
    ];

    for (const user of users) {
      const existing = await usersCollection.findOne({ email: user.email });
      if (existing) {
        console.log(`⚠️ User dengan email ${user.email} sudah ada, skip...`);
      } else {
        await usersCollection.insertOne(user);
        console.log(`✅ User ${user.email} berhasil ditambahkan`);
      }
    }
  } catch (err) {
    console.error("❌ Error saat menambahkan user:", err);
  } finally {
    await client.close();
  }
}

main();
