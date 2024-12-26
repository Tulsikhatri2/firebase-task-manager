import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";

const UpdateData = ({ updateForm, handleUpdateClose, editData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.data.title);
      setDescription(editData.data.description);
    }
  }, [editData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "tasks", editData.id);
    try {
      await updateDoc(taskDocRef, {
        title: title,
        description: description,
      });
      handleUpdateClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Dialog
        open={updateForm}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="w-[30vw] h-[50vh] flex flex-col items-center justify-center font-sans">
          <h1 className="font-bold underline">UPDATE TASK</h1>
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
          <div className="w-[60%] flex justify-between">
            <button
              className="px-4 py-2 mt-2 font-semibold bg-zinc-900 text-white rounded-3xl shadow-md shadow-gray-600"
              onClick={handleUpdate}
            >
              UPDATE DATA
            </button>
            <button
              className="px-4 py-2 mt-2 font-semibold bg-zinc-900 text-white rounded-3xl shadow-md shadow-gray-600"
              onClick={handleUpdateClose}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateData;
