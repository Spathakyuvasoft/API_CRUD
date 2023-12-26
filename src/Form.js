import "./index.css";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css'

const Form = () => {
  const acesstable = JSON.parse(localStorage.getItem("tabularList"));
  const editClickedAcess = JSON.parse(localStorage.getItem("editClicked"));
  const Hidden = JSON.parse(localStorage.getItem("hide"));
  const [formData, setForm] = useState({ name: "", phone: "", email: "" });
  const [list, setList] = useState([]);
  const [errorObject, seterrorObject] = useState({});
  const params = useParams();
  const [kalsu, setKalsu] = useState(editClickedAcess);
  const idAcess = params.id;






  useEffect(() => {
    if (kalsu) {
      const Finding = acesstable.find(
        (each) => parseInt(each.id) === parseInt(idAcess)
      );
      const { name, phone, email } = Finding;
      setForm({ name, phone, email });
    }

    return () => {
      setForm({ name: "", phone: "", email: "" });
    };
  }, [kalsu]);






  const handle = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    const empty1 = {};
    if (formData.name === "") {
      empty1.name1 = "*Name Required";
    } else if (formData.name.length <= 2) {
      empty1.name1 = "*Name characters should be greater than 2";
    }

    if (formData.phone === "") {
      empty1.phone1 = "*Phone Required";
    } else if (formData.phone.length !== 10) {
      empty1.phone1 = "*Phone number length to be 10";
    }

    if (formData.email === "") {
      empty1.email1 = "*Email Required";
    } else if (!formData.email.includes("@")) {
      empty1.email1 = "*Email must include @ format";
    }

    const objectLength = Object.keys(empty1).length;

    if (objectLength === 0) {
      const response = await axios.post('http://localhost:3000/posts', formData);
      setForm({ name: "", phone: "", email: "" }); 
     
    } else {
      seterrorObject(empty1);
    }
  };


  const updateRow = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/posts/${idAcess}`, formData);

      setForm({ name: "", phone: "", email: "" });
      // localStorage.setItem("tabularList", JSON.stringify(formData));
      localStorage.setItem("editClicked", JSON.stringify(false))

      // console.log('Updated data:', response.data);
    } catch (error) {

      console.error('Error updating data:', error);
    }
  };

  return (

    <div className="form">
      <div className="submission">
        <form onSubmit={formSubmit}>
          <label>Name:</label>
          <br />
          <input
            onChange={handle}
            type="text"
            name="name"
            value={formData.name}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.name1}</p>
          )}
          <br />
          <label>phone:</label>
          <br />
          <input
            onChange={handle}
            type="text"
            name="phone"
            value={formData.phone}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.phone1}</p>
          )}
          <br />
          <label>Email:</label>
          <br />
          <input
            onChange={handle}
            type="text"
            name="email"
            value={formData.email}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.email1}</p>
          )}
          <br />

          {editClickedAcess ? "" : <button type="submit">Submit</button>}

          <Link to="/"><button>Check Table</button></Link>
        </form>
        {Hidden ? ("") : (<button onClick={updateRow}>Update</button>)}
      </div>
    </div>


  );
};

export default Form;
