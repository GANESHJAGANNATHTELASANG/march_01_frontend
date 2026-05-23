import React, { useEffect } from "react";
import { useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editeNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      editeNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* Modal */}
      <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-5 text-center">
            {" "}
            {currentNote ? "Edite Note" : "Add Note"}{" "}
          </h1>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-blue-500"
          />

          {/* Description Input */}
          <textarea
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg mb-5 outline-none focus:border-blue-500"
          ></textarea>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg">
              {currentNote ? "Edite " : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
