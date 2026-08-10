require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const Person = require("./models/person");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

const app = express();

app.use(express.json());
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(cors());
app.use(express.static("dist"));

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    })
    .catch((error) => {
      response.status(500).json({ error: error.message });
    });
});

app.get("/api/info", (request, response) => {
  Person.countDocuments({})
    .then((count) => {
      const time = new Date().toString();
      response.send(`Phonebook has info for ${count} people<br>${time}`);
    })
    .catch((error) => {
      response.status(500).json({ error: error.message });
    });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      response.status(400).json({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      response.status(400).json({ error: "malformatted id" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  Person.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      return response.status(400).json({
        error: "name must be unique",
      });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => {
        response.status(400).json({ error: error.message });
      });
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
