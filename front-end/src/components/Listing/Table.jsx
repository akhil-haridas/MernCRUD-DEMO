import React from 'react'


const Table = ({ onEditClick, onRemoveClick, users }) => {
  return (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>No.</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>State</th>
          <th>City</th>
          <th>Languages</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">{user.FullName}</p>
                </div>
              </div>
            </td>
            <td>{user.Email}</td>
            <td>{user.Country}</td>
            <td>{user.State}</td>
            <td>{user.City}</td>
            <td>{user.Languages[0]}</td>
            <td>{user.createdAt}</td>

            <td>
              <button
                type="button"
                className="btn btn-link btn-sm btn-rounded"
                onClick={() => onEditClick(user._id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-link btn-sm btn-rounded"
                onClick={() => onRemoveClick(user._id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table
