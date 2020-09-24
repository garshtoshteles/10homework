var express = require("express"),
  path = require("path"),
  fs = require("fs"),
  app = express(),
  PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true })),
  app.use(express.json()),
  app.use(express.static("public"));
let storedNotes = [];
app.get("/", function (c, a) {
  a.sendFile(path.join(__dirname, "./public/index.html"));
}),
  app.get("/notes", function (c, a) {
    a.sendFile(path.join(__dirname, "./public/notes.html"));
  }),
  app.get("/api/notes", function (c, a) {
    try {
      (storedNotes = fs.readFileSync("./db/db.json", "utf8")),
        (storedNotes = JSON.parse(storedNotes));
    } catch (b) {
      console.log("Error: API-stored notes not retrieved");
    }
    a.json(storedNotes);
  }),
  app.post("/api/notes", function (c, a) {
    try {
      (storedNotes = fs.readFileSync("./db/db.json", "utf8")),
        (storedNotes = JSON.parse(storedNotes)),
        (c.body.id = Math.floor(Math.random() * Math.floor(1000000))),
        storedNotes.push(c.body),
        (storedNotes = JSON.stringify(storedNotes)),
        fs.writeFile("./db/db.json", storedNotes, "utf8", function (b) {
          if (b) throw b;
        }),
        a.json(JSON.parse(storedNotes));
    } catch (b) {
      throw b;
    }
  }),
  app.delete("/api/notes/:id", function (c, a) {
    try {
      (storedNotes = fs.readFileSync("./db/db.json", "utf8")),
        (storedNotes = JSON.parse(storedNotes));
      let b = storedNotes.filter(function (a) {
        return a.id != c.params.id;
      });
      (storedNotes = JSON.stringify(b)),
        fs.writeFile("./db/db.json", storedNotes, "utf8", function (b) {
          if (b) throw b;
        }),
        a.send(JSON.parse(storedNotes));
    } catch (b) {
      throw b;
    }
  }),
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
