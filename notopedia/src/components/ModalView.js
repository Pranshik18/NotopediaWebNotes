import React from "react";
import { truncateText } from "../constants/Truncate";
const ModalView = ({
  setViewModal,
  viewModal,
  handleViewModalClose,
  handleSubmit,
  title,
  body,
}) => {
  return (
    <div>
      <div className="modal">
        <div className="overlay" onClick={() => setViewModal(!viewModal)}></div>
        <div className="modal-back">
          <div className="modal-view-content">
            <span className="close" onClick={handleViewModalClose}></span>
            <form onSubmit={handleSubmit}>
              <h4 className="modal-heading">Your Added Note</h4>
              <div className="body-p">
                <h2>Title : {title}</h2>
                <p>Body : {body}</p>
              </div>
              <button className="cancel" onClick={handleViewModalClose}>
                <span>Cancel</span>
                <i className="fa-solid fa-xmark cancel_icon"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalView;
