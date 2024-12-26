import { Dialog } from "@mui/material";
import React from "react";
import { SiGoogletasks } from "react-icons/si";
import { TiCancel } from "react-icons/ti";

const ViewDetails = ({
  viewTaskDetails,
  handleViewDetailsClose,
  taskDetails,
}) => {
  console.log(taskDetails, "taskDetails");
  return (
    <>
      <Dialog
        open={viewTaskDetails}
        onClose={handleViewDetailsClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="w-[25vw] h-[35vh] flex flex-col items-center justify-center gap-2 p-10">
          {!taskDetails?.data?.completed ? (
            <p className="text-red-500 w-[100%] flex flex-col items-center">
              <TiCancel size={20} />
              <span className="text-[1.5vh] font-bold">INCOMPLETE TASK</span>
            </p>
          ) : (
            <p className="text-green-800 w-[100%] flex flex-col items-center">
              <SiGoogletasks size={20} />
              <span className="text-[1.5vh] font-bold">COMPLETED TASK</span>
            </p>
          )}
          <p className="font-bold">
            <span className="text-cyan-800">Title:</span>{" "}
            {taskDetails?.data?.title}
          </p>
          <p className="font-semibold text-sm">
            <span className="text-cyan-800 font-bold">Description: </span>{" "}
            {taskDetails?.data?.description}
          </p>
          <p className="font-bold text-xs">
            <span className="text-cyan-800">ID: </span>
            {taskDetails?.id}
          </p>
          <button
            onClick={handleViewDetailsClose}
            className="mt-3 bg-red-900 text-white font-semibold p-2 rounded-3xl
            shadow-lg shadow-gray-500"
          >
            Close
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default ViewDetails;
