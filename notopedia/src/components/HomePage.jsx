import moment from "moment";
import React, { useState } from "react";
import "../components/Homepage.css";

function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [body, setBody] = useState("");
  const [allNotesArray, setAllNotesArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [open, setSearchOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [view, setView] = useState(false);

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

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(allNotesArray[index].title);
    setBody(allNotesArray[index].body);
    setEditModalOpen(true);
  };

  const handleDelete = (index) => {
    setAllNotesArray(allNotesArray.filter((_, ind) => ind !== index));
  };

  const filteredNotes = allNotesArray.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedNotes = filteredNotes.sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "dateCreated") {
      return moment(a.dateCreated, "DD-MM-YYYY HH:mm:ss").diff(
        moment(b.dateCreated, "DD-MM-YYYY HH:mm:ss")
      );
    } else if (sortBy === "dateModified") {
      return moment(a.timeCreated, "HH:mm:ss").diff(
        moment(b.timeCreated, "HH:mm:ss")
      );
    }
  });

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
        <nav className="navbar">
          <ul>
            <li>
              <div className="content">
                <h1 className="heading">NotoPedia</h1>
              </div>
            </li>
            <div></div>
            {open && (
              <li className="search">
                <div>
                  <input
                    type="text"
                    className="search_input"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <i
                    className="fa-solid fa-xmark close_search"
                    onClick={(e) => setSearchOpen(false)}
                  ></i>
                </div>
              </li>
            )}
            <li>
              <i
                className="fa-sharp fa-solid fa-magnifying-glass search_icon"
                onClick={(e) => setSearchOpen(true)}
              ></i>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sort_contain">
        <label className="sort_by">Sort by </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">None</option>
          <option value="title">Title</option>
          <option value="dateCreated">Date Created</option>
          <option value="dateModified">Date Modified</option>
        </select>
      </div>
      <div>
        <button className="fab" onClick={handleButtonClick}>
          <i className="fa-sharp fa-solid fa-plus fa-beat"></i>
        </button>
        {openModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleModalClose}></span>
              <form onSubmit={handleSubmit}>
                <h2 className="modal-heading">Add a new Note</h2>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Add a body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <button type="submit">
                  <span>Add Note</span>
                  <i className="fa-sharp fa-solid fa-note-sticky cancel_icon"></i>
                </button>
                <button className="cancel" onClick={handleModalClose}>
                  <span>Cancel</span>
                  <i className="fa-solid fa-xmark cancel_icon"></i>
                </button>
              </form>
            </div>
          </div>
        )}
        {editModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleEditModalClose}></span>
              <form onSubmit={handleSubmit}>
                <h2 className="modal-heading">Update Note</h2>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Add a body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <button type="submit">
                  <span>Update Note</span>
                  <i className="fa-sharp fa-solid fa-note-sticky cancel_icon"></i>
                </button>
                <button className="cancel" onClick={handleEditModalClose}>
                  <span>Cancel</span>
                  <i className="fa-solid fa-xmark cancel_icon"></i>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="card-Container">
        {sortedNotes.length > 0 ? (
          sortedNotes.map((item, index) => {
            return (
              <div className="card" key={index}>
                <div className="container">
                  <h4>
                    <b>{item.title}</b>
                  </h4>
                  <p>{item.body}</p>
                  <div className="icons">
                    <i
                      className="fa-solid fa-pen-to-square edit_icon"
                      onClick={(e) => handleEdit(index)}
                    ></i>
                    <i
                      className="fa-solid fa-trash delete"
                      onClick={(e) => handleDelete(index)}
                    ></i>
                    <div>
                      <p className="time_date">Time: {item.timeCreated}</p>
                      <p className="time_date">Date: {item.dateCreated}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="add_notes_heading">
                          <p className="notes_content">No Notes Available Please Add By Clicking
                              <span>
                                  <button className="ui_plus_button"><i className="fa-sharp fa-solid fa-plus fa-beat"></i></button>
                          </span>
                          </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
