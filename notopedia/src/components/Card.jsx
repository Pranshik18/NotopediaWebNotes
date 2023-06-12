import { truncateText } from "../constants/Truncate";

export default function Card({ item, index, handleEdit, handleView, handleDelete }) {
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
            <i
              className="fa-solid fa-eye view_icon"
              onClick={(e) => handleView(index)}
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
  }