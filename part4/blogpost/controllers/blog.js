const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    console.log("The error is:", error);
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.title || !body.url) {
      return response.status(400).json({ error: "title and url are required" });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    console.log("The error is:", error);
    next(error);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.log("The error is:", error);
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.log("The error is:", error);
    next(error);
  }
});

module.exports = blogRouter;
