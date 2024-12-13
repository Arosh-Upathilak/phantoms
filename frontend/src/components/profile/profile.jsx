import React, { useState } from 'react';
import './profile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@university.edu',
    registrationNumber: 'REG12345',
    university: 'State University'
  });

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const handleProfileUpdate = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addPost = () => {
    if (!newPost.title || !newPost.content) return;

    const post = {
      ...newPost,
      id: Date.now(),
      tags: newPost.tags.split(',').map(tag => tag.trim())
    };

    setPosts([...posts, post]);
    setNewPost({ title: '', content: '', tags: '' });
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="profile-container">
      <div className="profile-section">
        <h2>Profile Information</h2>
        <form className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileUpdate}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileUpdate}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>University Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={profile.registrationNumber}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>University</label>
            <input
              type="text"
              name="university"
              value={profile.university}
              readOnly
            />
          </div>
          <button type="button" className="btn-save">
            Save Changes
          </button>
        </form>
      </div>

      <div className="posts-section">
        <h2>My Posts</h2>
        <div className="add-post-form">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={newPost.title}
            onChange={handlePostChange}
          />
          <textarea
            name="content"
            placeholder="Post Content"
            value={newPost.content}
            onChange={handlePostChange}
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={newPost.tags}
            onChange={handlePostChange}
          />
          <button onClick={addPost}>Add New Post</button>
        </div>

        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="post-actions">
                <button>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;