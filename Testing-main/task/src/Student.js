import React, { Component } from "react";
import { variables } from "./Variable";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Students: [],
      filterCity: "", // State for storing the entered city value
      filterAge: false, // State for enabling age filter
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    fetch(variables.API_URL + "Students")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Students: data });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  handleFilterCityChange = (event) => {
    this.setState({ filterCity: event.target.value });
  };

  handleFilterAgeToggle = () => {
    this.setState((prevState) => ({
      filterAge: !prevState.filterAge,
    }));
  };

  handleCreateStudent = (student) => {
    fetch(variables.API_URL + "Students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Student created:", data);
        // Perform any necessary actions after successful creation
        this.fetchItems(); // Update the student list
      })
      .catch((error) => {
        console.error("Error", error);
        // Handle the error appropriately
      });
  };

  render() {
    const { Students, filterCity, filterAge } = this.state;

    // Filter the Students array based on the entered city value and age condition
    const filteredStudents = Students.filter((student) => {
      const cityMatch =
        student.city.toLowerCase().includes(filterCity.toLowerCase()) ||
        filterCity === "";
      const ageMatch = filterAge ? student.age >= 23 : true;
      return cityMatch && ageMatch;
    });

    return (
      <div className="container">
        <br></br>
        <input
          type="text"
          value={filterCity}
          onChange={this.handleFilterCityChange}
          placeholder="Enter city to filter"
          className="form-control mb-3"
        />
        <br />
        <button
          onClick={this.handleFilterAgeToggle}
          className={`btn ${filterAge ? "btn-danger" : "btn-success"}`}
        >
          {filterAge ? "Disable Age Filter" : "Enable Age Filter"}
        </button>

        <div className="row mt-3">
       {filteredStudents.map((item) => (
  <div key={item.id} className="col-md-4 mb-4" data-testid="student-card">
              <div className="card">
                <img
                  src={`https://localhost:7116/uploads/${item.imagePath}`}
                  className="card-img-top"
                  alt="Student Image"
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    Age: {item.age} | City: {item.city}
                  </p>
                  <p className="card-text">Email: {item.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Student;
