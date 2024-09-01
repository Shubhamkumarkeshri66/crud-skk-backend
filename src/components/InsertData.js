import axios from "axios";
import React, { useState } from "react";
import "./InsertData.css";
const InsertData = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  console.log(formData);
  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/insertData",
        formData
      );
      alert("data Inserted");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      console.log("Data was not sent");
    }
  };

  return (
    <form className="form1" onSubmit={submitHandler}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter first name"
          name="name"
          onChange={changeHandler}
          value={formData.name}
        />
      </div>

      <br></br>

      <div>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={changeHandler}
          value={formData.email}
        />
      </div>

      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InsertData;
