import { useEffect } from "react";
import { useState } from "react";
import Alert from "./Alert";
import "./App.css";

import List from "./List";

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [edditing, setEdditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Load the stored list from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedList = JSON.parse(localStorage.getItem("groceryList"));
      if (storedList) {
        setList(storedList);
      }
    } catch (error) {
      console.error("error loading data form localStroage:", error);
    }
  }, []);

  // Function to update localStorage with the current list
  const updateLocalStorage = (list) => {
    try {
      localStorage.setItem("groceryList", JSON.stringify(list));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "Please enter a value", "danger");
      return;
    } else if (edditing) {
      // Update an item
      const updatedList = list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name };
        }
        return item;
      });
      setList(updatedList);
      setName("");
      setEditID(null);
      setEdditing(false);
      showAlert(true, "Item updated", "success");
    } else {
      // Add a new item
      showAlert(true, "Item added", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  useEffect(() => {
    if (alert.show) {
      const timeout = setTimeout(() => {
        showAlert(false); // Clear the alert message after 3 seconds
      }, 3000); // 3000 milliseconds (3 seconds)

      return () => {
        clearTimeout(timeout); // Clear the timeout when the component unmounts or when the alert is hidden
      };
    }
  }, [alert.show]);

  const handleEdit = (id) => {
    const editItem = list.find((item) => item.id === id);
    if (editItem) {
      setName(editItem.title);
      setEditID(id);
      setEdditing(true);
    }
  };

  const handleDelete = (id) => {
    const newItem = list.filter((i) => i.id !== id);
    setList(newItem);
    showAlert(true, "Item deleted", "success");
  };

  // Update localStorage whenever the list changes
  useEffect(() => {
    updateLocalStorage(list);
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g milk"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {edditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            item={list}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <button className="btn" onClick={() => setList([])}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
