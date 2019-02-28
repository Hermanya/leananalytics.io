import React, { useState } from "react";

const Modal = ({ open, onClose, onAccept, ...props }) => {
  if(!open) return null;
  const { name } = props.experiment;
  const [experiment, setExperiment] = useState(props.experiment);
  const [fadeOut, setFadeOut] = useState('');
  const beforeClose = (e, callback) => {
    e.stopPropagation();
    setFadeOut('fadeOut');
    setTimeout(() => callback(experiment), 1000);
  }
  const { variants } = experiment;
  return (
    <div 
      className={`fixed-top h-100vh d-flex justify-content-center align-items-center animated fadeIn ${fadeOut}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      {...props}
    >
      <div 
        className="bg-white rounded d-flex flex-column p-4 animated bounceInDown"
        style={{ minWidth: 350 }}
      >
        <h4 className="h5 p-0 m-0 mb-2">
          Edit {name}
        </h4>
        <div className="form-group">
          <label htmlFor="experiment-name">Name of the experiment</label>
          <input
            type="text"
            className="form-control"
            id="experiment-name"
            placeholder=""
            required
            value={experiment.name}
            onChange={e => setExperiment({ ...experiment, name: e.target.value })}
          />
          <div className="invalid-feedback">This is required</div>
        </div>

        <div className="form-group">
          <label htmlFor="action-name">What action is it testing</label>
          <input
            type="text"
            className="form-control"
            id="action-name"
            placeholder=""
            required
            value={experiment.trackedAction}
            onChange={e => setExperiment({ ...experiment, trackedAction: e.target.value })}
          />
          <div className="invalid-feedback">This is required</div>
        </div>

        {variants.map((variant, index) => {
          return (
            <div className="form-group" key={index}>
              <label htmlFor="input" className="d-block">
                {`Variant ${String.fromCharCode(65 + index)}`}
                <button
                  type="button"
                  className={`btn btn-link btn-sm float-right text-uppercase ${
                    index ? "d-inline" : "d-none"
                  }`}
                  onClick={() => setExperiment({ ...experiment, variants: variants.filter(_ => _ !== variant) })}
                >
                  Remove
                </button>
              </label>
              <textarea
                type="text"
                className={"form-control"}
                id="input"
                aria-describedby="help"
                placeholder="What would you like to change?"
                value={variant.name}
                required
                onChange={e =>
                  setExperiment({
                    ...experiment,
                    variants: variants.map(_ =>
                      _ === variant
                        ? {
                            ..._,
                            name: e.target.value
                          }
                        : _
                    )
                  })
                }
              />
            </div>
          );
        })}
        <div className="form-group">
          <button
            type="button"
            className="btn btn-link pl-0 btn-sm text-uppercase"
            onClick={() =>
              setExperiment({ 
                ...experiment,
                variants: variants.concat({
                  name: "",
                  invocations: 0,
                  validations: 0
                }) 
              })
            }
          >
            Add another Variant
          </button>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary text-uppercase" onClick={(e) => beforeClose(e, onClose)}>
            <span className="">Cancel</span>
          </button>
          <button className="btn btn-primary text-uppercase ml-4" onClick={(e) => beforeClose(e, onAccept)}>
            <span className="">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
