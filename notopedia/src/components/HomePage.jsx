import moment from "moment";
import React, { useState } from "react";
import "../components/Homepage.css";
import Card from "./Card";
import ModelCreate from "./ModelCreate";
import ModalEdit from "./ModalEdit";
import ModalView from "./ModalView";
import Navbar from "./Navbar";
import SortBy from "./SortBy";

function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [body, setBody] = useState("");
  const [allNotesArray, setAllNotesArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [viewModal, setViewModal] = useState("");
  // Handling the modal opening and closing
  const handleButtonClick = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setTitle("");
    setBody("");
  };

  const handleEditModalClose = () => {
    setEditIndex(null);
    setTitle("");
    setBody("");
    setEditModalOpen(false);
  };

  const handleViewModalClose = () => {
    setViewModal(false);
    setTitle("");
    setBody("");
  };
  //Handle edit function when the user clicks on edit button
  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(allNotesArray[index].title);
    setBody(allNotesArray[index].body);
    setEditModalOpen(true);
  };
  //Handle view whenever the user is going to see their note and description
  const handleView = (index) => {
    setTitle(allNotesArray[index].title);
    setBody(allNotesArray[index].body);
    setViewModal(true);
  };
  //Handle delete whenever user is going to delete the note
  const handleDelete = (index) => {
    setAllNotesArray(allNotesArray.filter((_, ind) => ind !== index));
  };
  //Handling the filtering logic
  const filteredNotes = allNotesArray.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );
  //Handling the sorting by date modified or date created or by title
  const sortedNotes = filteredNotes.sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "dateCreated") {
      return moment(a.dateCreated, "DD-MM-YYYY HH:mm:ss").diff(
        moment(b.dateCreated, "DD-MM-YYYY HH:mm:ss")
      );
    } else if (sortBy === "dateModified") {
      return moment(b.timeCreated, "HH:mm:ss").diff(
        moment(a.timeCreated, "HH:mm:ss")
      );
    }
  });
  //Handle the submit logic to submit the note
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedNote = {
        title: title,
        body: body,
        dateCreated: moment().format("DD-MM-YYYY"),
        timeCreated: moment().format("HH:mm:ss"),
      };
      const updatedNotesArray = [...allNotesArray];
      updatedNotesArray[editIndex] = updatedNote;
      setAllNotesArray(updatedNotesArray);
      handleEditModalClose();
    } else {
      const newUserNote = {
        title: title,
        body: body,
        dateCreated: moment().format("DD-MM-YYYY"),
        timeCreated: moment().format("HH:mm:ss"),
      };
      setAllNotesArray([...allNotesArray, newUserNote]);
      handleModalClose();
    }
  };
  return (
    <div>
      <div className="main-container">
        <div className="content"></div>
        {/* Navbar  */}
        <Navbar
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </div>
      {/* Sorting filters  */}
      <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      <div>
        <button className="fab" onClick={handleButtonClick}>
          <i className="fa-sharp fa-solid fa-plus fa-beat"></i>
        </button>
        {/* Modals Opening and closing according to states  */}
        {openModal ? (
          <>
            <ModelCreate
              setOpenModal={setOpenModal}
              title={title}
              setTitle={setTitle}
              body={body}
              setBody={setBody}
              handleSubmit={handleSubmit}
              openModal={openModal}
              handleModalClose={handleModalClose}
            />
          </>) : null}
        {editModalOpen ? (
          <ModalEdit
            editModalOpen={editModalOpen}
            title={title}
            setTitle={setTitle}
            setBody={setBody}
            handleSubmit={handleSubmit}
            body={body}
            setEditModalOpen={setEditModalOpen}
            handleEditModalClose={handleEditModalClose}
          />) : null}
        {viewModal ? (
          <>
            <ModalView
              setViewModal={setViewModal}
              viewModal={viewModal}
              handleViewModalClose={handleViewModalClose}
              handleSubmit={handleSubmit}
              title={title}
              body={body}
            />
          </>) : null}
      </div>
      {/* Rendering the cards  */}
      <div className="card-Container">
        {sortedNotes.length > 0 ? (
          sortedNotes.map((item, index) => {
            return (
              <Card
                key={index}
                item={item}
                index={index}
                handleEdit={handleEdit}
                handleView={handleView}
                handleDelete={handleDelete}
              />)})) : (
          <div className="add_notes_heading ">
            <div class="container">
              <h2 class="title">
                <span class="title-word title-word-1">No Notes</span>
                <span class="title-word title-word-2"> Available </span>
                <span class="title-word title-word-3"> Please Add </span>
                <span class="title-word title-word-4"> By Clicking </span>
              </h2>
              <p className="button_p">
                <button className="ui_plus_button">
                  <i className="fa-sharp fa-solid fa-plus fa-beat"></i>
                </button>
              </p>
            </div>
          </div>)}
      </div>
    </div>
  );
}
export default HomePage;