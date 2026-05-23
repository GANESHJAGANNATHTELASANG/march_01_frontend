import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdite, deleteNote }) => {
  return (
    <div className="bg-white w-[300px] p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{note.title}</h1>

      {/* Description */}
      <p className="text-gray-600 mb-5">{note.description}</p>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onEdite(note)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          <FaEdit />
        </button>

        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <FaTrash onClick={() => deleteNote(note._id)} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
