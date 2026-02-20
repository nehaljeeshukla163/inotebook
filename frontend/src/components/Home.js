import { useContext, useEffect, useState,useRef } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Home = ({showAlert}) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });
  const modalRef = useRef(null);
  useEffect(() => {
    if(localStorage.getItem("token")) {
      getNotes();
    } else {
      console.log("No token found, redirecting to login");
      window.location.href = "/login";  
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
    const modal = new window.bootstrap.Modal(modalRef.current);
  modal.show();
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
     <AddNote showAlert={showAlert} />
      {/* Edit Modal */}
     <div className="modal fade" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Note</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                name="title"
                value={note.title}
                onChange={onChange}
              />
              <textarea
                className="form-control mb-2"
                name="description"
                value={note.description}
                onChange={onChange}
              />
              <input
                className="form-control"
                name="tag"
                value={note.tag}
                onChange={onChange}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleClick}
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="my-3">Your Notes</h2>

      <div className="row">
        {notes.length === 0 && "No notes to display"}

        {notes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            updateNote={updateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
