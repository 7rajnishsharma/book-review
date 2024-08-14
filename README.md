---

# Book Review App

A web application for managing and reviewing books. This application allows users to add, edit, delete, and view book reviews. It is built with Node.js, Express, and MongoDB, and uses Semantic UI for styling.

## Features

- **Add New Book Reviews:** Users can submit new book reviews, including title, cover image URL, summary, and rating.
- **Edit Book Reviews:** Users can modify existing reviews.
- **Delete Book Reviews:** Users can remove reviews.
- **View Book Reviews:** Users can view a list of all book reviews with options to see detailed information.

## Installation

Follow these steps to get the application up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 18.x.x)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud database like MongoDB Atlas)

### Clone the Repository

```bash
git clone https://github.com/7rajnishsharma/book-review.git
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project directory with the following content:

```plaintext
MONGO_URI=mongodb://localhost:27017/book-review-app
PORT=3000
```

Replace `mongodb://localhost:27017/book-review-app` with your MongoDB connection string if you're using a cloud database like MongoDB Atlas. 

### Running the Application

Start the application with:

```bash
npm start
```

For development with automatic restarts on file changes:

```bash
npm run dev
```

### File Structure

- `app.js`: Main application file where the server and routes are defined.
- `views/`: Contains EJS templates for rendering pages.
  - `partials/`: Includes header and footer partials.
  - `index.ejs`: Displays a list of all book reviews.
  - `new.ejs`: Form for adding a new book review.
  - `edit.ejs`: Form for editing an existing book review.
  - `show.ejs`: Detailed view of a single book review.
- `public/`: Contains static assets.
  - `stylesheets/`: Contains CSS files (e.g., `app.css`).
  - `scripts/`: Contains JavaScript files (e.g., `bookapp.js`).
- `models/`: Contains Mongoose schemas and models.
- `package.json`: Contains project metadata and dependencies.

### Dependencies

- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `ejs`: Templating engine for rendering views.
- `body-parser`: Middleware to parse request bodies.
- `express-sanitizer`: Middleware to sanitize user inputs.
- `method-override`: Middleware to support HTTP verbs like PUT and DELETE.
- `dotenv`: Loads environment variables from a `.env` file.
- `nodemon`: Development tool to automatically restart the server.

### Contributing

Feel free to fork the repository and submit pull requests. Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

---
