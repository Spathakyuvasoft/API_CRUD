import "./index.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'

const Table = () => {

    const [fetchedData, setFetchedData] = useState([]);


    const fetchData = async () => {
        try {

            const response = await axios.get('http://localhost:3000/posts');


            setFetchedData(response.data);
        } catch (error) {

            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [])



    const deleteRow = async (index) => {
        try {

            const response = await axios.delete(`http://localhost:3000/posts/${index}`);

            fetchData();
            console.log('Deleted data:', response);


        } catch (error) {

            console.error('Error deleting data:', error);
        }
    }


    const editChangeStatus = () => {
        localStorage.setItem("editClicked", JSON.stringify(true)); 
        localStorage.setItem("tabularList", JSON.stringify(fetchedData));
        localStorage.setItem("hide",JSON.stringify(false))
    }; 

    const addingRows=()=>{
        localStorage.setItem("editClicked", JSON.stringify(false)); 
        localStorage.setItem("hide",JSON.stringify(true))
    }

    return (
        <div className="background">
        <Link to="/Form"><button onClick={addingRows}>Add to Table</button></Link>
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
                                <Link to={`/form/${each.id}`}>
                                    <button onClick={() => editChangeStatus()}>Edit</button>
                                </Link>
                            </th>
                        </tr>
                    );
                })}
            </table>
            </div>
    )
}



export default Table