const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "WPU";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi Gagal");
  }

  //   Pilih database
  const db = client.db(dbName);

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
  //   db.collection("mahasiswa").insertMany(
  //     [
  //       {
  //         nama: "halim",
  //         email: "halim@gmail.com",
  //       },
  //       {
  //         nama: "bayu",
  //         email: "bayu@gmail.com",
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log(error);
  //       }
  //       console.log(result);
  //     }
  //   );

  //   MENAMPILKAN SEMUA DATA DI COLLECtion
  //   db.collection("mahasiswa")
  //     .find()
  //     .toArray((error, result) => {
  //       console.log(result);
  //     });

  //   MENAMPILKAN SEMUA DATA DI COLLECtion berdasrkan krtiteria
  db.collection("mahasiswa")
    .find({ nama: "syarif" })
    .toArray((error, result) => {
      console.log(result);
    });
});
