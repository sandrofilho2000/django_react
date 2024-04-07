import React, { FormEvent, useEffect, useState } from 'react'
import api from '../api';
import Note from '../components/Note';
import "../styles/Home.css"

interface NoteProps {
  id: string;
  title: string;
  content: string;
}

const Home = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res: any) => res.data)
      .then((data: NoteProps[]) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteNote = (id:string) => {
    api
      .delete(`/api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => console.log(error));
  };

  const createNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
);
}

export default Home