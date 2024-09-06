import React, { useState, useEffect } from 'react';
import Note from './Note';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch notes from the server
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const addNote = () => {
    const newNote = { title, content };
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(res => res.json())
    .then(note => setNotes([...notes, note]));
  };

  const deleteNote = (id) => {
    fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    })
    .then(() => setNotes(notes.filter(note => note.id !== id)));
  };

  return (
    <div className="App">
      <div className="note-form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="note-list">
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}

export default App;

// Note.js
import React from 'react';

function Note({ note, onDelete }) {
  return (
    <div className="note">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
}

export default Note;
