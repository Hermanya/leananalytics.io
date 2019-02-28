import React, { useState } from "react";

const Modal = ({ open, onClose, onAccept, experiment, ...props }) => {
  if (!open) return null;
  const [fadeOut, setFadeOut] = useState("");
  const beforeClose = (e, callback) => {
    e.stopPropagation();
    setFadeOut("fadeOut");
    setTimeout(callback, 1000);
  };
  return (
    <div
      className={`fixed-top h-100vh d-flex justify-content-center align-items-center animated fadeIn ${fadeOut}`}
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      {...props}
      onClick={e => beforeClose(e, onClose)}
    >
      <div
        className="bg-white rounded d-flex flex-column p-4 m-4 animated bounceInDown"
        style={{ maxWidth: 400 }}
      >
        <h4 className="h5 p-0 m-0 mb-1">
          {`Are you sure to delete "${experiment.name}" experiment ?`}
        </h4>
        <small className="mb-5">
          <i className="fas fa-exclamation-triangle text-danger mr-2" />{" "}
          {`this
          action can't be undone !`}
        </small>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-secondary text-uppercase"
            onClick={e => beforeClose(e, onClose)}
          >
            <span className="">Cancel</span>
          </button>
          <button
            className="btn btn-primary text-uppercase ml-4"
            onClick={e => beforeClose(e, onAccept)}
          >
            <span className="">Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
