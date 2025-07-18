import { useState } from "react";
import { Link } from "react-router";

const NotesHome = ({ notes, setNotes }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) return;

    if (editId) {
      setNotes(prev =>
        prev.map(note =>
          note.id === editId ? { ...note, title, desc } : note
        )
      );
      setEditId(null);
    } else {
      setNotes(prev => [
        ...prev,
        { id: crypto.randomUUID(), title, desc, archived: false, trashed: false },
      ]);
    }

    setTitle("");
    setDesc("");
  };

  const handleArchive = (id) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, archived: true } : n));

  const handleTrash = (id) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, trashed: true } : n));

  const handleEdit = (note) => {
    setTitle(note.title);
    setDesc(note.desc);
    setEditId(note.id);
  };

  return (
    <div className="p-6 min-h-screen bg-slate-100 text-gray-800">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <div className="space-x-4">
          <Link to="/archived" className="bg-yellow-500 text-white px-4 py-2 rounded">Archive</Link>
          <Link to="/trash" className="bg-red-500 text-white px-4 py-2 rounded">Trash</Link>
        </div>
      </header>

      <div className="bg-white p-4 rounded shadow mb-4">
        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2 rounded"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="space-y-4">
        {notes.filter(n => !n.archived && !n.trashed).map(note => (
          <div key={note.id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p>{note.desc}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(note)} className="bg-yellow-400 px-3 py-1 rounded text-white">Edit</button>
              <button onClick={() => handleArchive(note.id)} className="bg-green-500 px-3 py-1 rounded text-white">Archive</button>
              <button onClick={() => handleTrash(note.id)} className="bg-red-600 px-3 py-1 rounded text-white">Trash</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesHome;
