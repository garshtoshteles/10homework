var express = require("express"),
  path = require("path"),
  fs = require("fs"),
  app = express(),
  PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: !0 })),
  app.use(express.json()),
  app.use(express.static("public"));
let storedNotes = [];
//
// ROUTES
//
app.get("/", function (a, b) {
  b.sendFile(path.join(__dirname, "./public/index.html"));
}),
  app.get("/notes", function (a, b) {
    b.sendFile(path.join(__dirname, "./public/notes.html"));
  }),
  app.get("/api/notes", function (a, b) {
    try {
      (storedNotes = fs.readFileSync("./db/db.json", "utf8")),
        (storedNotes = JSON.parse(storedNotes));
    } catch (a) {
      console.log("Error: API-stored notes not retrieved");
    }
    b.json(storedNotes);
  }),
  app.delete("/api/notes/:id", function (a, b) {
    try {
      (storedNotes = fs.readFileSync("./db/db.json", "utf8")),
        (storedNotes = JSON.parse(storedNotes));
      let c = storedNotes.filter(function (b) {
        return b.id != a.params.id;
      });
      (storedNotes = JSON.stringify(c)),
        fs.writeFile("./db/db.json", storedNotes, "utf8", function (a) {
          if (a) throw a;
        }),
        b.send(JSON.parse(storedNotes));
    } catch (a) {
      throw a;
    }
  }),
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
