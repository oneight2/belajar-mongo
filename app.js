const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// SETUP EJS
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// Koneksi DB
require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method"));
// gunakan EJS
app.set("view engine", "ejs");

//THIRD PARTY MIDLLE WARE
app.use(expressLayouts);
//built-n MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi FLASH
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
});

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
  const mahasiswa = [
    {
      nama: "syarif",
      email: "syarif@gmail.com",
    },
    {
      nama: "abdul",
      email: "syarif@gmail.com",
    },
    {
      nama: "syarif",
      email: "syarif@gmail.com",
    },
  ];

  res.render("index", {
    layout: "layouts/main-layout",
    nama: "Syarif",
    title: "halaman index",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

  res.render("contact", {
    layout: "layouts/main-layout",
    title: "halaman kontak",
    contacts,
    msg: req.flash("msg"),
  });
});

// Halaman tambah data kontak
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main-layout",
    title: "halaman tambah kontak",
  });
});

// Proses tambah data kontak
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama Kontak sudah digunakan");
      }
      return true;
    }),
    check("email", "Email Tidak Valid").isEmail(),
    check("nomor", "Nomor Tidak Valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        // kirim flash massage
        req.flash("msg", "Data kontak berhasil ditambah!");
        res.redirect("/contact");
      });
    }
  }
);

// PROSES DELETE KONTAK

app.delete("/contact", (req, res) => {
  Contact.deleteOne({ _id: contact._id }).then((result) => {
    req.flash("msg", "Data kontak berhasil dihapus!");
    res.redirect("/contact");
  });
});
// EDIT DATA KONTAK
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    layout: "layouts/main-layout",
    title: "halaman edit kontak",
    contact,
  });
});

// proses ubah data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      console.log(req.body);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Kontak sudah digunakan");
      }
      return true;
    }),
    check("nomor", "Nomor Tidak Valid").isMobilePhone("id-ID"),
    check("email", "Email Tidak Valid").isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            nomor: req.body.nomor,
            email: req.body.email,
          },
        }
      ).then((result) => {
        req.flash("msg", "Data kontak berhasil diubah!");
        res.redirect("/contact");
      });
    }
  }
);

// Detail Kontak
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "halaman detail",
    contact,
  });
});

// 404 Page Not found
app.use("/", (req, res) => {
  res.status(404);
  res.send("404 Page Not Found");
});
