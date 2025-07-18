import { Link } from "react-router";

const NotesTrash = ({ notes, setNotes }) => {
  const handleRestore = (id) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, trashed: false } : n));

  const handlePermanentDelete = (id) =>
    setNotes(prev => prev.filter(n => n.id !== id));

  return (
    <div className="p-6 min-h-screen bg-red-50 text-gray-800">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trash</h1>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">Home</Link>
      </header>

      {notes.filter(n => n.trashed).map(note => (
        <div key={note.id} className="bg-white p-4 mb-3 rounded shadow flex justify-between">
          <div>
            <h2 className="font-semibold text-lg">{note.title}</h2>
            <p>{note.desc}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => handleRestore(note.id)} className="bg-green-600 text-white px-3 py-1 rounded">Restore</button>
            <button onClick={() => handlePermanentDelete(note.id)} className="bg-red-700 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesTrash;
