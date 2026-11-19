
import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys when the application loads.
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch toys");
        }
        return response.json();
      })
      .then((data) => setToys(data))
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  // Show or hide the toy form.
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Add a new toy to the backend.
  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add toy");
        }
        return response.json();
      })
      .then((toy) => setToys((currentToys) => [...currentToys, toy]))
      .catch((error) => console.error("Error adding toy:", error));
  }

  // Increase a toy's likes.
  function handleLikeToy(id) {
    const toy = toys.find((toy) => toy.id === id);

    if (!toy) return;

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to like toy");
        }
        return response.json();
      })
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) =>
            toy.id === id ? updatedToy : toy
          )
        );
      })
      .catch((error) => console.error("Error liking toy:", error));
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer toys={toys} onLikeToy={handleLikeToy} />
    </>
  );
}

export default App;
