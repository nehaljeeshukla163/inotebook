import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = ({ note, updateNote }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between align-items-center">
            {note.title}
            <div>
              <i
                className="far fa-trash-alt mx-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => deleteNote(note._id)}
              ></i>

              <i
                className="far fa-edit mx-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </h5>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
