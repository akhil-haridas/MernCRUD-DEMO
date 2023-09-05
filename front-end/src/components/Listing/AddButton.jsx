import React from 'react'
import {Link} from "react-router-dom"
const AddButton = ({ onAddClick }) => {
  return (
      <div className="" style={{ float: "right", marginBottom: "2rem" }}
      onClick={onAddClick}>
      <Link className="boxed-btn">Add New User</Link>
    </div>
  );
};

export default AddButton