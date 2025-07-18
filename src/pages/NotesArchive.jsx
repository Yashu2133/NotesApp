import { Link } from "react-router";

const NotesArchive = ({ notes, setNotes }) => {
  const handleUnarchive = (id) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, archived: false } : n));

  const handleDelete = (id) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, trashed: true, archived: false } : n));

  return (
    <div className="p-6 min-h-screen bg-yellow-50 text-gray-800">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Archived Notes</h1>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">Home</Link>
      </header>

      {notes.filter(n => n.archived).map(note => (
        <div key={note.id} className="bg-white p-4 mb-3 rounded shadow flex justify-between">
          <div>
            <h2 className="font-semibold text-lg">{note.title}</h2>
            <p>{note.desc}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => handleUnarchive(note.id)} className="bg-green-500 text-white px-3 py-1 rounded">Unarchive</button>
            <button onClick={() => handleDelete(note.id)} className="bg-red-600 text-white px-3 py-1 rounded">Trash</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesArchive;
