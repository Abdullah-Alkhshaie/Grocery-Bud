import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
function List({ item, handleEdit, handleDelete }) {
  return (
    <div className="grocery-list">
      {item.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                onClick={() => handleEdit(id)}
                type="buttom"
                className="edit-item"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(id)}
                className="delete-btn"
                type="buttom"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
