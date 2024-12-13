import React, { useState } from "react";
import ErrorModal from "../../errormodal/ErrorModal"; // Importing the ErrorModal

const AddProjectPage = () => {
  const [newProject, setNewProject] = useState({
    title: "",
    price: "",
    description: "",
    image: null, // We'll store the file here
  });
  const [error, setError] = useState(null); // For handling errors
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [imagePreview, setImagePreview] = useState(null); // For showing image preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProject({ ...newProject, image: file });
      setImagePreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, price, description, image } = newProject;

    // Validate the form inputs
    if (!title || !price || !description || !image) {
      setError("All fields are required.");
      setShowModal(true);
      return;
    }

    // Send the data to the backend API
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("/newproduct", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setError(data.message); // Set error message if product creation fails
        setShowModal(true);
      } else {
        // Product created successfully
        alert("Product created successfully!");
        setNewProject({
          title: "",
          price: "",
          description: "",
          image: null,
        });
        setImagePreview(null); // Reset image preview
      }
    } catch (error) {
      console.error("Error details:", error);  // Log the full error details for debugging
      setError("An error occurred. Please try again.");
      setShowModal(true);
   }
   
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
  };

  return (
    <div className="add-project-container">
      <h1>Add New Project</h1>
      <form onSubmit={handleSubmit} className="add-project-form">
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={newProject.title}
            onChange={handleInputChange}
            placeholder="Enter project title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={newProject.price}
            onChange={handleInputChange}
            placeholder="Enter project price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Enter project description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Image Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Add Project
        </button>
      </form>

      {showModal && <ErrorModal message={error} onClose={handleCloseModal} />}
    </div>
  );
};

export default AddProjectPage;
