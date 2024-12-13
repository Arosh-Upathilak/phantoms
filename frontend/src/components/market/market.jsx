import React, { useState } from "react";
import { FaShoppingCart, FaPlus } from "react-icons/fa"; // Importing the cart and plus icons
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import "./market.css";
import image01 from '../asserts/image01.png'; // Importing the image for the first project
import image02 from '../asserts/image02.png'; // Importing the image for the first project

// Mock data for available projects and user's projects (These would typically come from an API or database)
const initialAvailableProjects = [
  {
    id: 1,
    title: "Project A",
    price: 100,
    description: "A great digital project.",
    image: image01,
  },
  {
    id: 2,
    title: "Project B",
    price: 200,
    description: "Another excellent project.",
    image: image02,
  },
];

const initialUserProjects = []; // Define user projects as an empty array for now

const Marketplace = () => {
  const [availableProjects, setAvailableProjects] = useState(initialAvailableProjects);
  const [cart, setCart] = useState([]);
  const [userProjects, setUserProjects] = useState(initialUserProjects); // Added state for user projects
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    image: "",
    title: "",
    price: "",
    description: "",
    file: null,
  });

  const navigate = useNavigate(); // Initialize useNavigate for page navigation

  // Handle add to cart
  const handleAddToCart = (project) => {
    setCart([...cart, project]);
    // Remove project from availableProjects when it's added to the cart
    setAvailableProjects(availableProjects.filter((p) => p.id !== project.id));
  };

  // Handle remove from cart
  const handleRemoveFromCart = (projectId) => {
    const projectToRemove = cart.find((project) => project.id === projectId);
    setCart(cart.filter((project) => project.id !== projectId));

    // When project is removed from cart, add it back to availableProjects
    setAvailableProjects([...availableProjects, projectToRemove]);
  };

  // Handle form input changes for adding a new project
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProject({ ...newProject, file: e.target.files[0] });
  };

  // Handle submit for adding a new project
  const handleAddNewProject = (e) => {
    e.preventDefault();
    if (!newProject.image || !newProject.title || !newProject.price || !newProject.description || !newProject.file) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

    const newProjectData = {
      ...newProject,
      id: userProjects.length + 1, // Assign a new unique ID
    };

    setUserProjects([...userProjects, newProjectData]); // Updated state
    setIsAddingProject(false); // Close the add new project form
  };

  // Navigate to the Add Project page when the floating button is clicked
  const handleAddProjectButtonClick = () => {
    navigate("/add-project"); // Navigate to the add project page
  };

  return (
    <div className="marketplace-container">
      <div className="cart-icon-container">
        <FaShoppingCart className="cart-icon" />
        <span className="cart-count">{cart.length}</span>
      </div>

      <h1>Marketplace</h1>

      <h2>Available Projects for Purchase</h2>

      {/* Available Projects for Purchase */}
      <div className="projects-list">
        {availableProjects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Price: ${project.price}</p>
            <button onClick={() => handleAddToCart(project)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Your Cart</h2>
      {/* Cart */}
      <div className="projects-list">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Price: ${project.price}</p>
              <button onClick={() => handleRemoveFromCart(project.id)}>Remove from Cart</button>
            </div>
          ))
        )}
      </div>

      {/* Add New Project Form */}
      {isAddingProject && (
        <div className="add-project-form">
          <h2>Add New Project</h2>
          <form onSubmit={handleAddNewProject}>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={newProject.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newProject.price}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newProject.description}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
            />
            <button type="submit">Add Project</button>
            <button type="button" onClick={() => setIsAddingProject(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Floating Plus Button */}
      <button className="add-project-btn" onClick={handleAddProjectButtonClick}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Marketplace;
