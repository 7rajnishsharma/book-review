var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var dotenv = require("dotenv");
var app = express();

// Load environment variables
dotenv.config();

// App Configs
mongoose.connect(process.env.MONGO_URI);  // No need for deprecated options
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// Define the book schema with a createdAt field
var bookSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  review: String,
  rating: String,
  createdAt: {
    type: Date,
    default: Date.now  // Automatically set the creation date to the current date/time
  }
});

var Book = mongoose.model("Book", bookSchema);

// Routes
app.get("/", function (req, res) {
  res.redirect("/books");
});

app.get("/books", async function (req, res) {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.render("index", { books: books });
  } catch (err) {
    console.log("Error fetching books:", err.message);
    res.redirect("/");
  }
});

app.get("/books/new", function (req, res) {
  res.render("new");
});

app.post("/books", async function (req, res) {
  try {
    req.body.book.title = req.sanitize(req.body.book.title);
    req.body.book.description = req.sanitize(req.body.book.description);
    req.body.book.review = req.sanitize(req.body.book.review);
    
    await Book.create(req.body.book);
    res.redirect("/books");
  } catch (err) {
    console.log("Error creating book:", err.message);
    res.render("new");
  }
});

app.get("/books/:id", async function (req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      console.log("Error: Book not found.");
      return res.redirect("/books");
    }
    res.render("show", { book: book });
  } catch (err) {
    console.log("Error fetching book details:", err.message);
    res.redirect("/books");
  }
});

app.get("/books/:id/edit", async function (req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      console.log("Error: Book not found.");
      return res.redirect("/books");
    }
    res.render("edit", { book: book });
  } catch (err) {
    console.log("Error loading edit form:", err.message);
    res.redirect("/books");
  }
});

app.put("/books/:id", async function (req, res) {
  try {
    req.body.book.title = req.sanitize(req.body.book.title);
    req.body.book.description = req.sanitize(req.body.book.description);
    req.body.book.review = req.sanitize(req.body.book.review);
    
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body.book, { new: true });
    if (!updatedBook) {
      console.log("Error: Book not found.");
      return res.redirect("/books");
    }
    res.redirect("/books/" + req.params.id);
  } catch (err) {
    console.log("Error updating book:", err.message);
    res.redirect("/books");
  }
});

app.delete("/books/:id", async function (req, res) {
  try {
    const result = await Book.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead
    if (!result) {
      console.log("Error: Book not found.");
      return res.redirect("/books");
    }
    res.redirect("/books");
  } catch (err) {
    console.log("Error deleting book:", err.message);
    res.redirect("/books");
  }
});

// Start the server
var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function () {
  console.log(`Server is working on http://localhost:${port}`);
});
