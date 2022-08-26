import React, { useState, useEffect } from "react";
import "./Todo.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SystemUpdateIcon from "@mui/icons-material/SystemUpdate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Todo = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isEdit, setIsEdit] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setShow(true);
        } else setShow(false);
      });
    };
  }, []);

  // to add todo item
  const addItem = () => {
    if (!input) {
    } else if (input && !toggle) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEdit) return { ...elem, name: input };
          else return elem;
        })
      );
      setIsEdit(null);
      setToggle(true);
      setInput("");
    } else {
      const newInput = {
        id: new Date().getTime().toString(),
        name: input,
      };
      setItem([...item, newInput]);
      setInput("");
    }
  };

  // to delete todo item
  const deleteItem = (id) => {
    const delItem = item.filter((elem) => {
      return elem.id !== id;
    });
    setItem(delItem);
  };

  // to edit todo list
  const editItem = (index) => {
    let edititem = item.find((elem) => {
      return elem.id === index;
    });
    setIsEdit(index);
    setToggle(false);
    setInput(edititem.name);
  };

  return (
    <div className="todo">
      <div className={`todo_input ${show && "todo_inputBlack"}`}>
        <input
          type="text"
          placeholder="Add an item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {toggle ? (
          <AddCircleIcon
            className="todo_addIcon"
            onClick={addItem}
            sx={{ fontSize: 40 }}
          />
        ) : (
          <SystemUpdateIcon
            className="todo_updateIcon"
            onClick={addItem}
            sx={{ fontSize: 40 }}
          />
        )}
      </div>
      <div className="todo_displayItem">
        {item.map((elem) => {
          return (
            <div className="todo_list">
              <li key={elem.id}>{elem.name}</li>
              <div>
                <DeleteIcon
                  className="todo_deleteIcon"
                  onClick={() => deleteItem(elem.id)}
                  sx={{ fontSize: 40 }}
                />
                <EditIcon
                  className="todo_editIcon"
                  onClick={() => editItem(elem.id)}
                  sx={{ fontSize: 40 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
