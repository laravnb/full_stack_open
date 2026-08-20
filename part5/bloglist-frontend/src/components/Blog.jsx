import { useState } from "react";

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    };
    addLike(blog.id, updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>

      {visible && (
        <div>
          <div> {blog.url} </div>
          <div>
            {" "}
            likes {blog.likes} <button onClick={handleLike}>like</button>{" "}
          </div>
          <div> {blog.author} </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
