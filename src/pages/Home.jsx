import React from "react";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import NoteModal from "../../components/NoteModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NoteCard from "../../components/NoteCard";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredNote, setFilteredNote] = useState([]);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  useEffect(() => {
    setFilteredNote(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [notes, query]);

  const onEdite = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:8787/api/note/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("note added successful:", response);
      if (response.data.success) {
        fetchNote();
        closeModal();
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed:");
    }
  };

  const editeNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:8787/api/note/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("note added successful:", response);
      if (response.data.success) {
        fetchNote();
        closeModal();
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed:");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8787/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("note deleted successful:", response);
      if (response.data.success) {
        fetchNote();
        closeModal();
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed:");
    }
  };

  const fetchNote = async (req, res) => {
    try {
      const { data } = await axios.get("http://localhost:8787/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setQuery={setQuery} />

      <div className="flex flex-wrap gap-5 p-5">
        {filteredNote.length > 0 ? (
          filteredNote.map((note) => (
            <NoteCard note={note} onEdite={onEdite} deleteNote={deleteNote} />
          ))
        ) : (
          <p> no notes are created</p>
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full text-3xl shadow-lg flex items-center justify-center"
      >
        +
      </button>
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editeNote={editeNote}
        />
      )}
    </div>
  );
};

export default Home;
