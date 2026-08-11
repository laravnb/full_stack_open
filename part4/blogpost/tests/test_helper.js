const Blog = require("../models/blog");

const initialBlogs = [
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

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
