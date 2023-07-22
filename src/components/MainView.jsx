import { useState,useEffect } from "react";

import "./MainView.css";
import { Table } from "./Table";
import { Modal } from "./Modal";

function MainView() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:3009/api/headrecords")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRows(data))
      .catch((error) => console.error("Error fetching data:", error.message));
  }, []);
  
  const handleDeleteRow = (targetIndex) => {
    const idToDelete = rows[targetIndex].id;
    fetch(`http://localhost:3009/api/records/${idToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete record");
        }
        return fetch("http://localhost:3009/api/records");
      })
      .then((data) => {
        // After successfully deleting the record, fetch the latest data
        fetch("http://localhost:3009/api/records")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            return response.json(); // Parse the response JSON
          })
          .then((data) => setRows(data)) // Update the rows state with the latest data
          .catch((error) => console.error("Error fetching data:", error.message));
      })
      .catch((error) => console.error("Error deleting record:", error));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  // const handleSubmit = (newRow) => {
  //   rowToEdit === null
  //     ? setRows([...rows, newRow])
  //     : setRows(
  //         rows.map((currRow, idx) => {
  //           if (idx !== rowToEdit) return currRow;

  //           return newRow;
  //         })
  //       );
  // };
  const handleSubmit = (newRow) => {
    
    if (rowToEdit === null) {
      newRow.isHead=1;
      // Create a new record
      fetch("http://localhost:3009/api/records", {
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
          return fetch("http://localhost:3009/api/headrecords");
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
      fetch(`http://localhost:3009/api/records/${idToUpdate}`, {
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
          return fetch("http://localhost:3009/api/headrecords");
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
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
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

export default MainView;
