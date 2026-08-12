const { test, describe, beforeEach, before, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const listHelper = require("../utils/list_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");

const api = supertest(app);

describe("list helper tests", () => {
  before(async () => {
    await mongoose.connection.asPromise();
  });

  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });

  describe("total likes", () => {
    test("of emmpty list is zero", () => {
      const blogs = [];

      const result = listHelper.totalLikes(blogs);
      assert.strictEqual(result, 0);
    });

    test("when list has only one blog equals the likes of that", () => {
      const blogs = [
        {
          title: "the one we went to belgium",
          author: "kowloon and friends",
          url: "https://simon_youtube",
          likes: 8,
          user: "Archie",
        },
      ];

      const result = listHelper.totalLikes(blogs);
      assert.strictEqual(result, 8);
    });

    test("of a bigger list is calculated right", () => {
      const blogs = [
        {
          title: "the one we went to belgium",
          author: "kowloon and friends",
          url: "https://simon_youtube",
          likes: 8,
          user: "Archie",
        },
        {
          title: "the one we meditated",
          author: "friends",
          url: "https://hindu_chants",
          likes: 4,
          user: "Antra",
        },
        {
          title: "the one we coworked",
          author: "kowloon and friends",
          url: "https://rise_and_grind",
          likes: 6,
          user: "Edda",
        },
      ];

      const result = listHelper.totalLikes(blogs);
      assert.strictEqual(result, 18);
    });
  });

  describe("when there is initially one user in db", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("sekret", 10);
      const user = new User({ username: "root", passwordHash });

      await user.save();
    });

    test("creation succeeds with a fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "boris123",
        name: "Boris ",
        password: "cheesefriendsanddrinks",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
