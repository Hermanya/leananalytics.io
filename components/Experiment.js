import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { makeCode } from "./ExperimentCode";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const color = (i, xs, offset) =>
  `hsl(${((360 / xs.length) * i + offset) % 360}, 100%, 69%)`;

export const Experiment = ({
  experiment,
  className,
  onDelete,
  onUpdate,
  ...props
}) => {
  const [colorOffset] = useState(360 * Math.random());
  const [codeCopied, setCodeCopied] = useState(false);
  const [[edit, remove], setModals] = useState([false, false]);
  const [tooltip, setTooltip] = useState("");
  const { variants, name, trackedAction } = experiment;
  let rates = variants.map(({ validations, invocations }) =>
    invocations ? validations / invocations : 0
  );
  let sum = rates.reduce((a, x) => a + x);
  const handleDelete = () => {
    setModals([false, false]);
    onDelete();
  };
  const handleUpdate = exp => {
    setModals([false, false]);
    onUpdate(exp);
  };
  return (
    <div>
      <div className={`py-4 px-4 bg-white rounded ${className}`} {...props}>
        <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap">
          <h4 className="w-80 h5 p-0 m-0 col-md-8 col-sm-12 text-truncate">
            {name}
          </h4>
          <span>
            {/* <button
              className="btn btn-link pl-0"
              onClick={() => setModals([true])}
              onMouseEnter={() => setTooltip('clone')}
              onMouseLeave={() => setTooltip('')}
            >
              <i className="fas fa-clone" />
              {tooltip === 'clone' &&
                <div className="bg-dark text-white p-2 position-fixed rounded animated fadeInDown faster" style={{ marginLeft: -20 }}>
                  clone
                </div>}
            </button>*/}
            <button
              className="btn btn-link p-2"
              onClick={() => setModals([false, true])}
              onMouseEnter={() => setTooltip("delete")}
              onMouseLeave={() => setTooltip("")}
            >
              <i className="fas fa-trash" />
              {tooltip === "delete" && (
                <div
                  className="bg-dark text-white p-2 position-fixed rounded animated fadeInDown faster"
                  style={{ marginLeft: -24 }}
                >
                  delete
                </div>
              )}
            </button>
          </span>
        </div>
        <div className="d-flex rounded overflow-hidden w-100">
          {variants.map((variant, i) => {
            return (
              <div
                key={i}
                title={variant.name}
                style={{
                  width:
                    sum === 0
                      ? `${100 / variants.length}%`
                      : `${(rates[i] / sum) * 100}%`,
                  height: "2em",
                  background: color(i, variants, colorOffset)
                }}
              />
            );
          })}
        </div>

        <div>
          {variants.map((variant, i) => {
            return (
              <div key={i} className="d-flex align-items-center mt-3">
                <div
                  className="rounded flex-grow-0 flex-shrink-0"
                  style={{
                    width: "1em",
                    height: "1em",
                    background: color(i, variants, colorOffset)
                  }}
                />
                <div className="text-truncate mx-2" title={variant.name}>
                  {variant.name}
                </div>
                <small className="text-muted ml-auto">
                  <span
                    title={`The ${`"${trackedAction}"` ||
                      "action this test is tracking"} was performed ${
                      variant.validations
                    } times for this variant`}
                  >
                    {variant.validations}
                  </span>
                  {"/"}
                  <span
                    title={`This variant was given ${
                      variant.invocations
                    } times`}
                  >
                    {variant.invocations}
                  </span>
                </small>
              </div>
            );
          })}
          {experiment.id && (
            <div className="text-center">
              <button
                className="btn btn-link"
                onClick={() => setModals([true, false])}
              >
                Settings
              </button>
              <CopyToClipboard
                text={makeCode(experiment)}
                onCopy={() => setCodeCopied(true)}
              >
                <button className="btn btn-link">
                  {!codeCopied ? (
                    <span>Copy Code</span>
                  ) : (
                    <span>
                      Code Copied <i className="fas fa-check ml-2" />
                    </span>
                  )}
                </button>
              </CopyToClipboard>
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        experiment={experiment}
        open={remove}
        onClose={() => setModals([false, false])}
        onAccept={handleDelete}
      />
      <EditModal
        experiment={experiment}
        open={edit}
        onClose={() => setModals([false, false])}
        onAccept={handleUpdate}
      />
    </div>
  );
};
