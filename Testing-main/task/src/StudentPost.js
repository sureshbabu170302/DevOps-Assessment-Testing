import React, { Component } from "react";
import { variables } from "./Variable";

class StudentPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      section: "",
      age: 0,
      city: "",
      email: "",
      imageFile: null,
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageChange = (event) => {
    this.setState({ imageFile: event.target.files[0] });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("section", this.state.section);
    formData.append("age", this.state.age);
    formData.append("city", this.state.city);
    formData.append("email", this.state.email);
    formData.append("imageFile", this.state.imageFile);

    fetch(variables.API_URL + "Students", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Student created:", data);
        // Perform any necessary actions after successful creation
      })
      .catch((error) => {
        console.error("Error", error);
        // Handle the error appropriately
      });
  };

  render() {
    return (
      <div className="container">
        <br></br>
        <h2>Create Student</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="section">Section</label>
            <input
              type="text"
              id="section"
              name="section"
              className="form-control"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageFile">Image</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              className="form-control-file"
              onChange={this.handleImageChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default StudentPost;
