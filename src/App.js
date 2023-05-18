import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./List";

const getLocalStorage = () => {
  let itemList = localStorage.getItem("items");
  return itemList ? JSON.parse(itemList) : [];
};

function App() {
  const [inputList, setInputList] = useState("");
  const [itemList, setItemList] = useState(getLocalStorage());
  const [toggle, setToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  // add an item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputList) {
      alert("Please Provide Some Value");
    }
    // update an item
    else if (inputList && toggle) {
      setItemList(
        itemList.map((item) => {
          if (item.id === isEdit) {
            return { ...item, name: inputList };
          }
          return item;
        })
      );
      setInputList("");
      setIsEdit(null);
      setToggle(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), name: inputList };
      setItemList([...itemList, newItem]);
      setInputList("");
    }
  };

  // remove an item
  const deleteItem = (id) => {
    const delItem = itemList.filter((item) => item.id !== id);
    setItemList(delItem);
  };

  // edit an item
  const editItem = (id) => {
    const findItem = itemList.find((item) => item.id === id);
    setInputList(findItem.name);
    setToggle(true);
    setIsEdit(id);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(itemList));
  }, [itemList]);

  return (
    <div className="app">
      <h1>To-do List App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add an item"
          value={inputList}
          onChange={(e) => setInputList(e.target.value)}
        />
        {toggle ? (
          <button className="update-btn" type="submit">
            Update
          </button>
        ) : (
          <button className="add-btn" type="submit">
            Add
          </button>
        )}
      </form>
      <List items={itemList} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}

export default App;
