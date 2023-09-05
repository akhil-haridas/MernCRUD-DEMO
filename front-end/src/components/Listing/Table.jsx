import React from 'react'


const Table = ({ onEditClick, onRemoveClick, users }) => {

  function formatTimestamp(timestamp) {
    const options = { year: "2-digit", month: "long", day: "numeric" };
    const formattedDate = new Date(timestamp).toLocaleDateString(
      undefined,
      options
    );

    return formattedDate;
  }

  return (
    <>
      {users.length === 0 ? (
        <div className="table align-middle mb-0 bg-white">
          <h4>CURRENTLY NO USERS</h4>
        </div>
      ) : (
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
                <td>
                  {user.Languages.map((language, index) => (
                    <p key={index}>{language}</p>
                  ))}
                </td>

                <td>{formatTimestamp(user.createdAt)}</td>

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
                    style={{ color: "red" }}
                    onClick={() => onRemoveClick(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table
