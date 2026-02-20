import NoteContext from "./noteContext";
import { useState} from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const json = await response.json();
  setNotes(json);
};


  // Add a Note
  const addNote = async (title, description, tag) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      props.showAlert("No token found. Please login.", "danger");
      console.error("No token found. Please login.");
      return;
    }

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        title,
        description,
        tag: tag || "General",
      }),
    });

    const json = await response.json();
    console.log("Add note response:", json);

    if (!response.ok) {
      props.showAlert("Failed to add note. Please try again.", "danger"); 
      console.error("Backend error:", json);
      return;
    }

   setNotes(prevNotes => prevNotes.concat(json));
props.showAlert("Note added successfully", "success" );

  } catch (error) {
    console.error("Failed to add note:", error);
  }
};


  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // Update client-side state
      const newNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
