const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

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
      },
      {
        title: "the one we meditated",
        author: "friends",
        url: "https://hindu_chants",
        likes: 4,
      },
      {
        title: "the one we coworked",
        author: "kowloon and friends",
        url: "https://rise_and_grind",
        likes: 6,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 18);
  });
});
