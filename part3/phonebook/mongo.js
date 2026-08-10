require("dotenv").config();
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const phonebook_name = process.argv[3];
  const phonebook_number = process.argv[4];

  const person = new Person({
    name: phonebook_name,
    number: phonebook_number,
  });

  person.save().then((result) => {
    console.log(
      `Added ${phonebook_name} number ${phonebook_number} to phonebook`,
    );
    mongoose.connection.close();
  });
} else {
  console.log("Please provide password <name> <number>");
  mongoose.connection.close();
}
