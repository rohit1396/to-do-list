import React from "react";
import "./List.css";

const List = ({ items, deleteItem, editItem }) => {
  return (
    <section>
      {items.map((item) => (
        <article key={item.id}>
          <li className="listItem">{item.name}</li>
          <div className="btn-group">
            <button className="delButton" onClick={() => deleteItem(item.id)}>
              Delete
            </button>
            <button className="editButton" onClick={() => editItem(item.id)}>
              Edit Item
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default List;
