import React, { useState, useEffect } from "react";
import Head from "../components/Home/Head";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Table from "../components/Listing/Table";
import Footer from "../components/Listing/Footer";
import Pagination from "../components/Listing/Pagination";
import Create from "../components/Create/Create";
import AddButton from "../components/Listing/AddButton";
import Edit from "../components/Edit/Edit";
import { getUser, getAllusers, removeUser } from "../utils/api";

const ITEMS_PER_PAGE = 2; // Adjust this as needed

const ListingPage = () => {
  const [isCreateVisible, setCreateVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [userData, setUserData] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [isCreateVisible, currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await getAllusers(page, ITEMS_PER_PAGE);
      setUsers(response.users);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const onRemoveClick = async (userId) => {
    await removeUser(userId);
    fetchUsers(currentPage); // Fetch users for the current page after removal
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleCreateComponent = () => {
    setCreateVisible(!isCreateVisible);
    setEditVisible(false);
  };

  const toggleEditComponent = (userID) => {
    if (isEditVisible) {
      setUserData("");
      setEditVisible(false);
      setCreateVisible(false);
    } else {
      fetchUser(userID);
    }
  };

  const fetchUser = async (userID) => {
    const response = await getUser(userID);
    if (response) {
      setUserData(response);
      setEditVisible(true);
    }
  };

  return (
    <>
      {isCreateVisible && <Create onAddClick={toggleCreateComponent} />}
      {isEditVisible && (
        <Edit onEditClick={toggleEditComponent} userData={userData} />
      )}
      <Head />
      <Breadcrumb current={"CUSTOMER LIST"} />
      <div className="latest-news mb-150">
        <div className="container">
          <div className="row">
            <AddButton onAddClick={toggleCreateComponent} />
            <Table
              onEditClick={toggleEditComponent}
              onRemoveClick={onRemoveClick}
              users={users}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingPage;
