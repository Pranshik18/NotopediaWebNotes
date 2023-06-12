import React from 'react'

const ModalView = ({setViewModal , viewModal , handleViewModalClose , handleSubmit ,title , body}) => {
  return (
    <div>
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
    </div>
  )
}

export default ModalView