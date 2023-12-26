import "./Table.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const Table = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const navigate=useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");

      setFetchedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteRow = async (index) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/posts/${index}`
      );

      fetchData();
      console.log("Deleted data:", response);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const editChangeStatus = (index) => {
  
    navigate(`/form/${index}`);
  };

  const addingRows = () => {
 
    navigate("/Form");
  };
  console.log(fetchedData.length);
  return (
    <div className="background">
      
        <button className="addButton" onClick={addingRows}>
          Add to Table
        </button>
      
      {fetchedData.length === 0 ? (
        <p className="warning">No Table to show,Add rows in table</p>
      ) : (
        <table className="table">
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {fetchedData.map((each, index) => {
            return (
              <tr key={each.id}>
                <th className="view">{each.id}</th>
                <th className="view">{each.name}</th>
                <th className="view">{each.phone}</th>
                <th className="view">{each.email}</th>
                <th>
                  <button
                    onClick={() => {
                      deleteRow(each.id);
                    }}
                  >
                    Delete
                  </button>
                  /
                
                    <button onClick={() => editChangeStatus(each.id)}>Edit</button>
                 
                </th>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default Table;
