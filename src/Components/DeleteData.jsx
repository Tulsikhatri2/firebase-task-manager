import { Dialog } from "@mui/material";
import React from "react";

const DeleteData = ({
  deleteConfirmation,
  handleDelteConfirmationClose,
  handleDelete,
}) => {
  return (
    <>
      <Dialog
        open={deleteConfirmation}
        onClose={handleDelteConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="w-[30vw] h-[25vh] flex flex-col items-center justify-center font-sans">
          <p className="text-xl">Are you sure you want to delete this task?</p>
          <div className="w-[100%] flex items-end justify-end p-5">
            <button
              className="font-semibold p-2 rounded-3xl shadow-lg shadow-gray-500"
              onClick={handleDelteConfirmationClose}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="ml-7 bg-red-900 text-white font-semibold p-2 rounded-3xl
            shadow-lg shadow-gray-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteData;
