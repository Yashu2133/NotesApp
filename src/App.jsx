import { createBrowserRouter, RouterProvider } from "react-router";
import { useState, useEffect } from "react";
import NotesHome from "./pages/NotesHome";
import NotesArchive from "./pages/NotesArchive";
import NotesTrash from "./pages/NotesTrash";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes"));
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const router = createBrowserRouter([
    { path: "/", element: <NotesHome notes={notes} setNotes={setNotes} /> },
    { path: "/archived", element: <NotesArchive notes={notes} setNotes={setNotes} /> },
    { path: "/trash", element: <NotesTrash notes={notes} setNotes={setNotes} /> },
  ]);

  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};

export default App;
