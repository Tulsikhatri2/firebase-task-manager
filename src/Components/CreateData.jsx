import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function CreateData({ open, handleClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now(),
      });
      setTitle("");
      setDescription("");
      handleClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="w-[30vw] h-[50vh] flex flex-col items-center justify-center font-sans">
          <h1 className="font-bold underline">ADD TASK</h1>
          <input
            type="text"
            className="px-3 py-2 border border-black rounded-3xl mt-5"
            placeholder=" Title..."
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            cols={35}
            rows={5}
            className="px-3 py-3 border border-black rounded-3xl mt-2"
            placeholder="Description..."
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="w-[50%] flex justify-between">
            <button
              className="px-4 py-2 mt-2 font-semibold bg-zinc-900 text-white rounded-3xl shadow-md shadow-gray-600"
              onClick={handleSubmit}
            >
              ADD DATA
            </button>
            <button
              className="px-4 py-2 mt-2 font-semibold bg-zinc-900 text-white rounded-3xl shadow-md shadow-gray-600"
              onClick={handleClose}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
