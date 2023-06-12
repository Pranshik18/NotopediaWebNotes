import React from 'react'

const ModelCreate = ({setOpenModal , title , setTitle , handleSubmit , body , openModal , setBody , handleModalClose}) => {
  return (
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
  )
}

export default ModelCreate