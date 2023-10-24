import React, { useEffect, useState } from "react";
import { variables } from "./Variable";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Ross from './Images/Ross.jpg';
import Monica from './Images/monica.avif';
import Chandler from './Images/chandler.webp';
import Rachel from './Images/1.jpg';

const Student = () => {
  const [Students, setStudents] = useState([]);
  const [filterCity, setFilterCity] = useState("");
  const [filterAge, setFilterAge] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(variables.API_URL + "Students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleFilterCityChange = (event) => {
    setFilterCity(event.target.value);
  };

  const handleFilterAgeToggle = () => {
    setFilterAge(!filterAge);
  };

  const filteredStudents = Students.filter((student) => {
    const cityMatch =
      student.city.toLowerCase().includes(filterCity.toLowerCase()) ||
      filterCity === "";
    const ageMatch = filterAge ? student.age >= 23 : true;
    return cityMatch && ageMatch;
  });

  return (
    <div className="container">
      <input
        type="text"
        value={filterCity}
        onChange={handleFilterCityChange}
        placeholder="Enter city to filter"
        className="form-control mb-3"
      />
      <br />
      <button
        onClick={handleFilterAgeToggle}
        className={`btn ${filterAge ? "btn-danger" : "btn-success"}`}
      >
        {filterAge ? "Disable Age Filter" : "Enable Age Filter"}
      </button>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Section</th>
            <th>Age</th>
            <th>Email</th>
            <th>City</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.section}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>{item.city}</td>
              <td>
                {item.id === 1 && <img src={Ross} style={{ width: 100, height: 100 }} alt="Student Image" />}
                {item.id === 2 && <img src={Rachel} style={{ width: 100, height: 100 }} alt="Student Image" />}
                {item.id === 3 && <img src={Chandler} style={{ width: 100, height: 100 }} alt="Student Image" />}
                {item.id === 4 && <img src={Monica} style={{ width: 100, height: 100 }} alt="Student Image" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
