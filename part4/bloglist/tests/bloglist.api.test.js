const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

describe("Blog API Tests", () => {
  
  it("should return blogs in JSON format - exercise 4.8", async () => {
    await api.get("/api/blogs")
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it("should have unique identifier named id - exercise 4.9*", async () => {
    const blogs = await Blog.find({});
    expect(blogs[0]._id).toBeDefined();
  });

  it("should create a new blog post - exercise 4.10", async () => {
    const newPost = {
      title: "test",
      author: "test",
      url: "test",
      likes: 50
    };
    
    await api.post("/api/blogs")
      .send(newPost)
      .expect(201);
  });

  it("should respond with 400 if required fields are missing - exercises 4.11*, 4.12*", async () => {
    const newBlog = {
      author: "Adriano",
      likes: 15
    };

    await api.post("/api/blogs")
      .send(newBlog)
      .expect(400);
  }, 90000);

});
