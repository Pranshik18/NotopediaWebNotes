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
  const [viewModal, setViewModal] = useState("");

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
    setViewModal(false)
    setTitle("");
    setBody("");
  }

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(allNotesArray[index].title);
    setBody(allNotesArray[index].body);
    setEditModalOpen(true);
  };
  const handleView = (index) => {
    setTitle(allNotesArray[index].title);
    setBody(allNotesArray[index].body);
    setViewModal(true)
  }

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
  }).reverse();

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
                <i class="fa-sharp fa-solid fa-pen-to-square noto_icon"></i>
                <h1 className="heading">NotoPedia</h1>
              </div>
            </li>
            <div></div>
            {
              <li className="search">
                <div>
                  <input
                    type="text"
                    className="search_input"
                    placeholder="Search ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  {searchText.length > 0 && (
                    <i
                      className="fa-solid fa-xmark close_search"
                      onClick={(e) => setSearchText("")}
                    ></i>
                  )}
                </div>
              </li>
            }
            <li>
              {searchText.length < 1 && (
                <i
                  className="fa-sharp fa-solid fa-magnifying-glass search_icon"
                  onClick={(e) => setSearchOpen(true)}
                ></i>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="sort_contain">
        <label className="sort_by">Sort by </label>
        <i class="fa-solid fa-sort sort_icon"></i>
        <select
          className="dropdown"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
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
          <>
            <div className="modal">
              <div
                className="overlay"
                onClick={() => setOpenModal(!openModal)}
              ></div>
              <div className="modal-back">
                <div className="modal-content">
                  <span className="close" onClick={handleModalClose}></span>
                  <form onSubmit={handleSubmit}>
                    <h2 className="modal-heading">Add a new Note</h2>
                    <input
                      type="text"
                      placeholder="Add Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      cols="30"
                      rows="10"
                      placeholder="Add Body"
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
            </div>
          </>
        )}
        {editModalOpen && (
          <div className="modal">
            <div
                className="overlay"
                onClick={() => setEditModalOpen(!editModalOpen)}
              ></div>
            <div className="modal-content">
              <span className="close" onClick={handleEditModalClose}></span>
              <form onSubmit={handleSubmit}>
                <h2 className="modal-heading">Update Note</h2>
                <input
                  type="text"
                  placeholder="Add Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Add Description"
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
        {
          viewModal && (
            <>
            <div className="modal">
              <div
                className="overlay"
                onClick={() => setViewModal(!viewModal)}
              ></div>
              <div className="modal-back">
                <div className="modal-content">
                  <span className="close" onClick={handleViewModalClose}></span>
                  <form onSubmit={handleSubmit}>
                    <h4 className="modal-heading">Your Added Note</h4>
                      <h2>Title : {title}</h2>
                      <h3>Body : {body}</h3>
                    <button className="cancel" onClick={handleViewModalClose}>
                      <span>Cancel</span>
                      <i className="fa-solid fa-xmark cancel_icon"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            </>
          )
        }
      </div>
      <div className="card-Container">
        {sortedNotes.length > 0 ? (
          sortedNotes.reverse().map((item, index) => {
            return (
              <div className="card" key={index}>
                <div className="container">
                  <h4>
                    <b>{truncateText(item.title, 15)}</b>
                  </h4>
                  <p className="p_card">{truncateText(item.body, 30)}</p>
                  <div className="icons">
                    <i
                      className="fa-solid fa-pen-to-square edit_icon"
                      onClick={(e) => handleEdit(index)}
                    ></i>
                    <i class="fa-solid fa-eye view_icon" onClick={(e)=> handleView(index)}></i>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
