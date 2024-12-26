import React from "react";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";
import { TbHttpDelete } from "react-icons/tb";
import CreateData from "../Components/CreateData";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import UpdateData from "../Components/UpdateData";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import DeleteData from "../Components/DeleteData";
import ViewDetails from "../Components/ViewDetails";

const TaskList = () => {
  const [open, setOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [deletingItem, setDeletingItem] = useState("");
  const [viewTaskDetails, setViewTaskDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateOpen = (item) => {
    setEditData(item);
    setUpdateForm(true);
  };
  const handleUpdateClose = () => {
    setUpdateForm(false);
  };
  const handleDeleteConfirmationOpen = (itemID) => {
    setDeleteConfirmation(true);
    setDeletingItem(itemID);
  };
  const handleDelteConfirmationClose = () => {
    setDeleteConfirmation(false);
  };

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handleCheckedChange = async (item) => {
    const newCompletedState = !item.data.completed;
    const taskDocRef = doc(db, "tasks", item.id);
    try {
      await updateDoc(taskDocRef, {
        completed: newCompletedState,
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async () => {
    const taskDocRef = doc(db, "tasks", deletingItem);
    try {
      await deleteDoc(taskDocRef);
      setDeleteConfirmation(false);
      setDeletingItem(null);
    } catch (err) {
      alert(err);
    }
  };

  const handleViewDetailsOpen = (item) => {
    setViewTaskDetails(true);
    setTaskDetails(item);
  };

  const handleViewDetailsClose = () => {
    setViewTaskDetails(false);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-zinc-900 font-sans">
      <div className="w-[100%] h-[12%] bg-zinc-800 text-white flex items-center justify-between px-10">
        <div className="w-[55%] flex items-end justify-end">
          <p className="text-2xl underline">Task Manager</p>
        </div>
        <button
          className="text-cyan-500 shadow-md shadow-black rounded-3xl"
          onClick={handleClickOpen}
        >
          <IoMdAddCircle size={40} />
        </button>
      </div>
      <div className="w-[100%] h-[auto] flex flex-col items-center justify-center mt-10">
        {tasks.map((item, index) => {
          return (
            <div
              className="w-[40%] h-[15vh] flex items-center justify-center text-white "
              key={index}
            >
              <div className="w-[50%] flex gap-3">
                <div className="flex items-center justify-center">
                  <input
                    id={`checkbox-${item.id}`}
                    className="checkbox-custom"
                    name="checkbox"
                    checked={item.data.completed}
                    onChange={() => handleCheckedChange(item)}
                    type="checkbox"
                  />
                </div>
                <div>
                  <p className="font-bold">{item.data.title.toUpperCase()}</p>
                  <p className="text-xs">{item.data.description}</p>
                </div>
              </div>
              <div className="w-[50%] flex items-end justify-end gap-2">
                <div
                  className="text-cyan-600 cursor-pointer"
                  onClick={() => handleUpdateOpen(item)}
                >
                  <RiEditFill size={20} />
                </div>
                <div
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDeleteConfirmationOpen(item.id)}
                >
                  <TbHttpDelete size={22} />
                </div>
                <div
                  className="text-slate-400 cursor-pointer"
                  onClick={() => handleViewDetailsOpen(item)}
                >
                  <HiMiniViewfinderCircle size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CreateData open={open} handleClose={handleClose} />
      <UpdateData
        updateForm={updateForm}
        handleUpdateClose={handleUpdateClose}
        editData={editData}
      />
      <DeleteData
        deleteConfirmation={deleteConfirmation}
        handleDelteConfirmationClose={handleDelteConfirmationClose}
        handleDelete={handleDelete}
      />
      <ViewDetails
        viewTaskDetails={viewTaskDetails}
        handleViewDetailsClose={handleViewDetailsClose}
        taskDetails={taskDetails}
      />
    </div>
  );
};

export default TaskList;
