const blogRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getUserFromToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET);
  return await User.findById(decodedToken.id);
};

blogRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = request.token;
  const user = await getUserFromToken(token);

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    return response.status(201).json(result);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const token = request.token;
  const user = await getUserFromToken(token);

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  try {
    await Blog.findByIdAndRemove(id);
    return response.status(204).end();
  } catch (error) {
    return response.status(400).json({ error: "invalid id" });
  }
});

blogRouter.patch("/update/:id", async (request, response) => {
  const { id } = request.params;
  const body = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );
    return response.status(200).json(updatedBlog);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const body = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );
    return response.status(200).json(updatedBlog);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

module.exports = blogRouter;
