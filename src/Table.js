// import React, { useState } from 'react';
// import { useTable } from 'react-table';

// const Table = () => {
//   // Sample data
//   const data = [
//     { id: 1, name: 'John Doe', age: 25 },
//     { id: 2, name: 'Jane Smith', age: 30 },
//     // Add more data rows as needed
//   ];

//   const columns = [
//     { Header: 'ID', accessor: 'id' },
//     { Header: 'Name', accessor: 'name' },
//     { Header: 'Age', accessor: 'age' },
//     {
//       Header: 'Actions',
//       Cell: ({ row }) => (
//         <button onClick={() => handleEdit(row)}>Edit</button>
//       ),
//     },
//   ];

//   const handleEdit = (row) => {
//     // Implement your edit logic here
//     console.log('Editing row:', row);
//   };

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => (
//                 <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//               ))}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
import React, { useState } from 'react';
import { useTable } from 'react-table';

const Table = () => {
  const [editData, setEditData] = useState(null);

  const data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    // Add more data rows as needed
  ];

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <button onClick={() => handleEdit(row.index)}>Edit</button>
      ),
    },
  ];

  const handleEdit = (rowIndex) => {
    const rowData = rows[rowIndex].original;
    setEditData(rowData);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Perform your save/update logic here
    console.log('Updated data:', editData);
    setEditData(null);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <form onSubmit={handleSave}>
        <label>
          Name:
          <input
            type="text"
            value={editData ? editData.name : ''}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={editData ? editData.age : ''}
            onChange={(e) =>
              setEditData({ ...editData, age: e.target.value })
            }
          />
        </label>
        <button type="submit">Save</button>
      </form>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
