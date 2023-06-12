import React from 'react'

const ModalEdit = ({editModalOpen , title , setTitle , handleSubmit , body , setBody , setEditModalOpen , handleEditModalClose}) => {
  return (
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
  )
}

export default ModalEdit