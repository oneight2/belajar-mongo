const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

const { ObjectID } = require("bson");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://syarif:7september@cluster0.bbflo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "WPU";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log(error);
  }
  console.log("berhasil");

  //   Pilih database
  // const db = client.db(dbName);

  // insert data 1
  //   db.collection("mahasiswa").insertOne(
  //     {
  //       nama: "Abdul",
  //       email: "abdul@gmail.com",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log(error);
  //       }
  //       console.log(result);
  //     }
  //   );

  // MENAMBAH LEBIH DARI SATU DATA
  // db.collection("mahasiswa").insertMany(
  //   [
  //     {
  //       nama: "halim",
  //       email: "halim@gmail.com",
  //     },
  //     {
  //       nama: "bayu",
  //       email: "bayu@gmail.com",
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log(result);
  //   }
  // );

  //   MENAMPILKAN SEMUA DATA DI COLLECtion
  //   db.collection("mahasiswa")
  //     .find()
  //     .toArray((error, result) => {
  //       console.log(result);
  //     });

  //   MENAMPILKAN SEMUA DATA DI COLLECtion berdasrkan krtiteria
  // db.collection("mahasiswa")
  //   .find({ nama: "syarif" })
  //   .toArray((error, result) => {
  //     console.log(result);
  //   });

  // MENGUBAH SATU DATA
  // db.collection("mahasiswa").updateOne(
  //   {
  //     _id: ObjectID("610b9d4bc03d63f3e84bcc16"),
  //   },
  //   {
  //     $set: {
  //       nama: "syarif hidayat",
  //     },
  //   }
  // );

  // // MENGHAPUS SATU DATA
  // db.collection("mahasiswa")
  //   .deleteOne({
  //     _id: ObjectID("610b9d4bc03d63f3e84bcc16"),
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // // MENGHAPUS banyak data
  // db.collection("mahasiswa")
  //   .deleteMany({
  //     // Semua nama syarif akan dihapus
  //     nama: "syarif",
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});
