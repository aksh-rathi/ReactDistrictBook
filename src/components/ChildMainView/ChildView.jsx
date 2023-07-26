import { useState, useEffect } from "react";
import "../MainView.css";

import { ChildTable } from "./ChildTable";
import { ChildModal } from "./ChildModel";
import { useParams } from "react-router-dom";
import {HeaderView} from "../common/Header"
import {Card} from "../common/Card"

var apiUrl = process.env.REACT_APP_API_URL;
function ChildView() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [familyHead, setFamilyHead] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch(`${apiUrl}/records/family/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRows(data);
        let fHead = data.find(r=>r.id==id)
        console.log(fHead)
        setFamilyHead((fHead?fHead:null))
      })
      .catch((error) => console.error("Error fetching data:", error.message));
  }, []);
  
  const handleDeleteRow = (targetIndex) => {
    const idToDelete = rows[targetIndex].id;
    fetch(`${apiUrl}/records/${idToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete record");
        }
        return fetch(`${apiUrl}/records/family/${id}`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setRows(data)) // Update the rows state with the latest data
      .catch((error) => console.error("Error deleting record:", error));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };
  const handleSubmit = (newRow) => {
    
    if (rowToEdit === null) {
      newRow.isHead=0;
      newRow.headID=id;
      // Create a new record
      fetch(`${apiUrl}/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save record");
          }
          // Refresh the rows after successfully saving the record
          return fetch(`${apiUrl}/records/family/${id}`);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => setRows(data))
        .catch((error) => console.error("Error saving record:", error));
    } else {
      // Update an existing record
      const idToUpdate = rows[rowToEdit].id;
      fetch(`${apiUrl}/records/${idToUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update record");
          }
          // Refresh the rows after successfully updating the record
          return fetch(`${apiUrl}/records/family/${id}`);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => setRows(data))
        .catch((error) => console.error("Error updating record:", error));
    }
  
    // Close the modal and reset rowToEdit after the API call
    setModalOpen(false);
    setRowToEdit(null);
  };
  

  return (
    <div className="App">
      <HeaderView title={`${familyHead?familyHead.name:""} Family's Information`} />
      {familyHead?<Card data={familyHead}/>:""}
      <ChildTable rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      {isLoggedIn ? (
        <button onClick={() => setModalOpen(true)} className="btn">
          Add
        </button>
      ) : (
        <p></p>
      )}
      {/* <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button> */}
      {modalOpen && (
        <ChildModal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default ChildView;
