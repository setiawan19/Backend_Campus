var mysql = require("mysql");
var express = require("express");
var cors = require("cors");
const bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.json());
app.use(cors());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "kampus"
});
db.connect(() => {
  console.log("Terhubung ke MySQL Kampus!");
  // db.end()
});

//======= dashboard =============
//admin count
app.get("/dash_admin", (req, res) => {
  var ambildata = `SELECT COUNT(*) FROM user`;
  db.query(ambildata, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});
//mahasiswa count
app.get("/dash_mhs", (req, res) => {
  var ambildata = `SELECT COUNT(*) FROM mahasiswa`;
  db.query(ambildata, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});
//fakultas count
app.get("/dash_fk", (req, res) => {
  var ambildata = `SELECT COUNT(*) FROM fakultas`;
  db.query(ambildata, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});
//prodi count
app.get("/dash_pr", (req, res) => {
  var ambildata = `SELECT COUNT(*) FROM prodi`;
  db.query(ambildata, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});
//===============================

//ambil all data admin
app.get("/admin", (req, res) => {
  var ambildata = `SELECT * FROM user`;
  db.query(ambildata, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});

// ambil all data mahasiswa
app.get("/mahasiswa", (req, res) => {
  var ambildata = `select mahasiswa.nim AS nim, mahasiswa.nama AS nama, mahasiswa.jenis_kelamin AS jenis_kelamin,
                    mahasiswa.tahun_masuk_kuliah AS tahun_masuk_kuliah, 
                    mahasiswa.no_hp AS no_hp, mahasiswa.email AS email, 
                    prodi.nama AS nama_prodi, prodi.total_sks AS total_sks , fakultas.nama AS fakultas
                    from mahasiswa JOIN prodi, fakultas WHERE mahasiswa.id_prodi = prodi.id AND prodi.id_fk = fakultas.id`;
  db.query(ambildata, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});
//get data mahasiswa by NIM
app.get("/mahasiswa/:nim", (req, res) => {
  var sql = `select mahasiswa.nim, mahasiswa.nama, mahasiswa.jenis_kelamin,
                    mahasiswa.tempat_lahir, mahasiswa.tanggal_lahir,
                    mahasiswa.asal_sekolah, mahasiswa.nilai_UN, mahasiswa.tahun_lulus ,
                    mahasiswa.tahun_masuk_kuliah, mahasiswa.no_hp, mahasiswa.email, 
                    mahasiswa.pekerjaan_orangtua, mahasiswa.jurusan_sekolah,
                    prodi.nama AS prodi, prodi.total_sks AS total_sks , fakultas.nama AS fakultas
                    FROM mahasiswa JOIN prodi,fakultas WHERE mahasiswa.nim = ${
                      req.params.nim
                    } 
                    AND mahasiswa.id_prodi = prodi.id AND prodi.id_fk = fakultas.id`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//insert/add mahasiswa
app.post("/mahasiswa", (req, res) => {
  var data = {
    nim: req.body.nim,
    nama: req.body.nama,
    jenis_kelamin: req.body.jenis_kelamin,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    asal_sekolah: req.body.asal_sekolah,
    nilai_UN: req.body.nilai_UN,
    tahun_lulus: req.body.tahun_lulus,
    tahun_masuk_kuliah: req.body.tahun_masuk_kuliah,
    no_hp: req.body.no_hp,
    email: req.body.email,
    pekerjaan_orangtua: req.body.pekerjaan_orangtua,
    jurusan_sekolah: req.body.jurusan_sekolah,
    id_prodi: req.body.id_prodi
  };
  var sql = `INSERT INTO mahasiswa SET ?`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("anda tidak dapat insert data mahasiswa");
      throw err;
    } else {
      res.send({
        status: "Data Mahasiswa Berhasil di Tambahkan",
        nim: req.body.nim,
        nama: req.body.nama,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        asal_sekolah: req.body.asal_sekolah,
        nilai_UN: req.body.nilai_UN,
        tahun_lulus: req.body.tahun_lulus,
        tahun_masuk_kuliah: req.body.tahun_masuk_kuliah,
        no_hp: req.body.no_hp,
        email: req.body.email,
        pekerjaan_orangtua: req.body.pekerjaan_orangtua,
        jurusan_sekolah: req.body.jurusan_sekolah,
        id_prodi: req.body.id_prodi
      });
    }
  });
});

//update or edit data mahasiswa by nim
app.put("mahasiswa/:nim", (req, res) => {
  var data = {
    nim: req.body.nim,
    nama: req.body.nama,
    jenis_kelamin: req.body.jenis_kelamin,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    asal_sekolah: req.body.asal_sekolah,
    nilai_UN: req.body.nilai_UN,
    tahun_lulus: req.body.tahun_lulus,
    tahun_masuk_kuliah: req.body.tahun_masuk_kuliah,
    no_hp: req.body.no_hp,
    email: req.body.email,
    pekerjaan_orangtua: req.body.pekerjaan_orangtua,
    jurusan_sekolah: req.body.jurusan_sekolah,
    id_prodi: req.body.id_prodi
  };

  var sql = `UPDATE mahasiswa SET ? WHERE nim = ${req.params.nim}`;

  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
      console.log("UPDATE data mahasiswa GAGAL");
    } else {
      console.log("Update data Mahasiswa By NIM Berhasil");
      res.send({
        status: `Data Mahasiswa Berhasil di Update`,
        nim: req.body.nim,
        nama: req.body.nama,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        asal_sekolah: req.body.asal_sekolah,
        nilai_UN: req.body.nilai_UN,
        tahun_lulus: req.body.tahun_lulus,
        tahun_masuk_kuliah: req.body.tahun_masuk_kuliah,
        no_hp: req.body.no_hp,
        email: req.body.email,
        pekerjaan_orangtua: req.body.pekerjaan_orangtua,
        jurusan_sekolah: req.body.jurusan_sekolah,
        id_prodi: req.body.id_prodi
      });
    }
  });
});
//delete data mahasiswa by nim
app.delete("/mahasiswa/:nim", (req, res) => {
  var sql = "DELETE FROM mahasiswa WHERE nim = ?";
  db.query(sql, req.params.nim, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.send({
        status: `Data dari NIM : ${req.params.nim} Berhasil Dihapus`
      });
    }
  });
});

//get all prodi & fakultas
app.get("/jurusan", (req, res) => {
  var sql =
    "select fakultas.nama AS fakultas, prodi.nama AS prodi, prodi.total_sks from fakultas JOIN prodi on fakultas.id = prodi.id_fk";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});
// insert or add fakultas
app.post("/fakultas", (req, res) => {
  console.log(req.body);
  var data = {
    id: req.body.nama,
    nama: req.body.nama
  };
  var sql = `INSERT INTO fakultas SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: "Data Fakultas Sukses di tambahkan",
        id: null,
        nama: req.body.nama
      });
    }
  });
});
//get all fakultas
app.get("/fakultas", (req, res) => {
  var sql = `SELECT * FROM fakultas`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//get fakultas by id
app.get("/fakultas/:id", (req, res) => {
  var sql = `SELECT * FROM fakultas WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//edit fakultas by id
app.put("/fakultas/edit/:id", (req, res) => {
  console.log(req.body);
  var data = {
    id: req.body.id,
    nama: req.body.nama
  };
  var sql = `UPDATE fakultas set ? WHERE id = ${req.params.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Berhasil di Update`,
        id: req.body.id,
        nama: req.body.nama
      });
    }
  });
});
//delete fakultas by id
app.delete("/fakultas/:id", (req, res) => {
  var sql = "DELETE FROM fakultas WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Fakultas Berhasil dihapus`
      });
    }
  });
});
// insert or add prodi
app.post("/prodi", (req, res) => {
  var data = {
    nama: req.body.nama,
    total_sks: req.body.total_sks,
    id_fk: req.body.id_fk
  };
  var sql = `INSERT INTO prodi SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: "Data Prodi Berhasil di Insert",
        id: null,
        nama: req.body.nama,
        total_sks: req.body.total_sks,
        id_fk: req.body.id_fk
      });
    }
  });
});
//get all prodi
app.get("/prodi", (req, res) => {
  var sql = "SELECT * FROM prodi";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//get prodi by id
app.get("/prodi/:id", (req, res) => {
  var sql = `SELECT * FROM prodi WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//edit or update data prodi by id
app.put("/prodi/edit/:id", (req, res) => {
  var data = {
    id: req.body.id,
    nama: req.body.nama,
    total_sks: req.body.total_sks,
    id_fk: req.body.id_fk
  };
  var sql = `UPDATE prodi SET ? WHERE id = ${req.params.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Prodi Berhasil di UPDATE`,
        id: req.body.id,
        nama: req.body.nama,
        total_sks: req.body.total_sks,
        id_fk: req.body.id_fk
      });
    }
  });
});
//delete prodi by id
app.delete("/prodi/:id", (req, res) => {
  var sql = "DELETE FROM prodi WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Prodi Berhasil dihapus`
      });
    }
  });
});

//get data prodi n fakultas
app.get("/prodifk", (req, res) => {
  var sql = `SELECT prodi.id, prodi.nama AS prodi, fakultas.nama AS fakultas 
              FROM prodi JOIN fakultas
              WHERE prodi.id_fk = fakultas.id`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//==================== PREDIKSI SKS LULUS MAHASISWA ===========================/

//Get All Data Prediksi Mahasiswa yang sudah terdaftar
app.get("/view_sks", (req, res) => {
  var sql = `SELECT sks.nim, mahasiswa.nama AS nama,
                prodi.nama AS prodi, fakultas.nama AS fk,
                prodi.total_sks AS total_sks, sks.ipk
                FROM sks, mahasiswa JOIN prodi, fakultas
                WHERE sks.nim = mahasiswa.nim 
                AND mahasiswa.id_prodi = prodi.id
                AND prodi.id_fk = fakultas.id
                GROUP BY sks.nim
                `;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//get data prediksi sks lulus by nim
app.get("/view_sks/:nim", (req, res) => {
  var sql = `SELECT sks.nim, mahasiswa.nama AS nama, 
                sks.sks_lulus, sks.ips, 
                sks.ipk, sks.semester, sks.tahun, 
                sks.sisa_sks, prodi.total_sks AS total_sks, sks.status_mhs AS status_mhs,
                sks.target_wisuda, prodi.nama AS prodi, fakultas.nama AS fakultas  
                FROM sks, mahasiswa JOIN prodi, fakultas  
                WHERE sks.nim = ${req.params.nim}
                AND sks.nim = mahasiswa.nim
                AND mahasiswa.id_prodi = prodi.id
                AND prodi.id_fk = fakultas.id`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//delete data prediksi by id
app.delete("/view_sks/:id", (req, res) => {
  var sql = "DELETE FROM sks WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Prediksi by id Berhasil dihapus`
      });
    }
  });
});
//select value column if semester value max
app.get("/semester/:nim", (req, res) => {
  var sql = `SELECT * from sks WHERE sks.nim = ${
    req.params.nim
  } ORDER BY semester DESC LIMIT 1`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//insert/add data mahasiswa ke daftar prediksi sks
app.post("/view_sks", (req, res) => {
  var data = {
    nim: req.body.nim,
    sks_lulus: req.body.sks_lulus,
    ips: req.body.ips,
    ipk: req.body.ipk,
    semester: req.body.semester,
    tahun: req.body.tahun,
    sisa_sks: req.body.sisa_sks,
    target_wisuda: req.body.target_wisuda,
    status_mhs: req.body.status_mhs
  };
  var sql = `INSERT INTO sks SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Mahasiswa Berhasil ditambahkan ke Prediksi Kelulusan`,
        nim: req.body.nim,
        sks_lulus: req.body.sks_lulus,
        ips: req.body.ips,
        ipk: req.body.ipk,
        semester: req.body.semester,
        tahun: req.body.tahun,
        sisa_sks: req.body.sisa_sks,
        target_wisuda: req.body.target_wisuda
      });
    }
  });
});

//insert sks lulus mahasiswa tiap semester
app.post("/view_sks/add/:nim", (req, res) => {
  var data = {
    nim: req.body.nim,
    sks_lulus: req.body.sks_lulus,
    ips: req.body.ips,
    ipk: req.body.ipk,
    semester: req.body.semester,
    tahun: req.body.tahun,
    sisa_sks: req.body.sisa_sks,
    target_wisuda: req.body.target_wisuda,
    status_mhs: req.body.status_mhs
  };

  var sql = `INSERT INTO sks SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data SKS Lulus Semester ${
          req.body.semester
        } Berhasil Ditambahkan`,
        nim: req.body.nim,
        sks_lulus: req.body.sks_lulus,
        ips: req.body.ips,
        ipk: req.body.ipk,
        semester: req.body.semester,
        tahun: req.body.tahun,
        sisa_sks: req.body.sisa_sks,
        target_wisuda: req.body.target_wisuda
      });
    }
  });
});

//update data prediksi sks mahasiswa by nim
app.put("/view_sks/edit/:nim", (req, res) => {
  var data = {
    //nim : req.body.nim,
    sks_lulus: req.body.sks_lulus,
    ips: req.body.ips,
    ipk: req.body.ipk,
    semester: req.body.semester,
    tahun: req.body.tahun,
    sisa_sks: req.body.sisa_sks,
    target_wisuda: req.body.target_wisuda,
    status_mhs: req.body.status_mhs
  };
  var sql = `UPDATE sks SET ? WHERE nim = ${req.params.nim}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Prediksi Dari ${req.params.nim} Berhasil di Update`,
        sks_lulus: req.body.sks_lulus,
        ips: req.body.ips,
        ipk: req.body.ipk,
        semester: req.body.semester,
        tahun: req.body.tahun,
        sisa_sks: req.body.sisa_sks,
        target_wisuda: req.body.target_wisuda
      });
    }
  });
});

// aktivasi server
app.listen(3210, () => {
  console.log("Server aktif di port 3210!");
});
