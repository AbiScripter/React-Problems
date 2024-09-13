import React, { useState } from "react";
import "./MultiStepForm.css";

function MultiForm() {
  // State for form 1 (name, email, password)
  const [form1Data, setForm1Data] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [form1Errors, setForm1Errors] = useState({});

  // State for form 2 (age, gender)
  const [form2Data, setForm2Data] = useState({
    age: "",
    gender: "",
  });
  const [form2Errors, setForm2Errors] = useState({});

  // State to control form step (1 or 2)
  const [step, setStep] = useState(1);

  // Validate form 1
  const validateForm1 = () => {
    let errors = {};
    let valid = true;

    if (form1Data.name.length < 3) {
      errors.name = "Name must be at least 3 characters.";
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(form1Data.email)) {
      errors.email = "Email is invalid.";
      valid = false;
    }

    if (form1Data.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setForm1Errors(errors);
    return valid;
  };

  // Validate form 2
  const validateForm2 = () => {
    let errors = {};
    let valid = true;

    if (!form2Data.age || form2Data.age <= 0) {
      errors.age = "Age must be a positive number.";
      valid = false;
    }

    if (!form2Data.gender) {
      errors.gender = "Please select a gender.";
      valid = false;
    }

    setForm2Errors(errors);
    return valid;
  };

  // Handle next button click
  const handleNext = () => {
    if (validateForm1()) {
      setStep(2);
    }
  };

  // Handle previous button click
  const handlePrevious = () => {
    setStep(1);
  };

  // Handle final submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm2()) {
      alert("Both forms are valid! Submitting data...");
      // Handle form submission here (e.g., send to server)
    }
  };

  return (
    <div className="App">
      <h2>Multi-Step Form</h2>

      {step === 1 && (
        <Form1
          formData={form1Data}
          handleChange={setForm1Data}
          errors={form1Errors}
          handleNext={handleNext}
        />
      )}

      {step === 2 && (
        <Form2
          formData={form2Data}
          handleChange={setForm2Data}
          errors={form2Errors}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

function Form1({ formData, handleChange, errors, handleNext }) {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form>
      <h3>Form 1: Personal Information</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
}

function Form2({
  formData,
  handleChange,
  errors,
  handlePrevious,
  handleSubmit,
}) {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form 2: Age & Gender</h3>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={onInputChange}
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>

      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={onInputChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>

      <button type="button" onClick={handlePrevious}>
        Previous
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MultiForm;
