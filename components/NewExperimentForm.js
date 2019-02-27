import React, { useState } from "react";
const newVariant = x => ({
  name: x,
  runs: 0,
  validations: 0
});

const makeInitialVariants = () => [newVariant("Original"), newVariant("")];

export const NewExperimentForm = ({ onCreate }) => {
  const [experimentName, setExperimentName] = useState("");
  const [trackedAction, setActionName] = useState("");
  const [variants, setVariants] = useState(makeInitialVariants());
  // const isSubmitEnabled = variants.every(
  // _ => _.name && variants.every(__ => __ === _ || __.name !== _.name)
  // );
  //   const code = `import { Experiment, Variant } from 'react-lean-startup'

  // <Experiment id="{experimentId}">${variants
  //     .map(
  //       (variant, index) => `
  //   <Variant description="${variant.name.replace(/"/g, '\\"')}">
  //     {(callback) => <Component${index +
  //       1} whenUserPerformsTheAction={callback}/>}
  //   </Variant>`
  //     )
  //     .join("")}
  // </Experiment>
  // `;

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        onCreate({
          variants,
          trackedAction: trackedAction,
          name: experimentName
        });
        setVariants(makeInitialVariants());
        setExperimentName("");
        setActionName("");
      }}
    >
      <div className="form-group">
        <label htmlFor="experiment-name">Name of the experiment</label>
        <input
          type="text"
          className="form-control"
          id="experiment-name"
          placeholder=""
          required
          value={experimentName}
          onChange={e => setExperimentName(e.target.value)}
        />
        <small className="text-muted">
          {`This could be "Landing Copy", "Checkout Design" or something like
          that.`}
        </small>
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
          value={trackedAction}
          onChange={e => setActionName(e.target.value)}
        />
        <small className="text-muted">
          {`This could be "Sign up" or "Purchase" or something else that users do in your app. Later you can see statistics for this action across multiple experiments. It is important to have only 1 experiment per action at a time.`}
        </small>
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
                onClick={() => setVariants(variants.filter(_ => _ !== variant))}
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
                setVariants(
                  variants.map(_ =>
                    _ === variant
                      ? {
                          ..._,
                          name: e.target.value
                        }
                      : _
                  )
                )
              }
            />
          </div>
        );
      })}
      <div className="form-group">
        <button
          type="button"
          className="btn btn-link pl-0 btn-sm text-uppercase"
          onClick={() => setVariants(variants.concat(newVariant("")))}
        >
          Add another Variant
        </button>
      </div>
      {/*
        <div className="form-group mt-4">
          <label htmlFor="inputCode">Javascript code</label>
          <textarea
            type="text"
            className="form-control"
            id="inputCode"
            aria-describedby="help"
            value={code}
            rows={code.split("\n").length}
            readOnly
          />
          <small id="help" className="form-text text-muted">
            {`Copy-paste this snippet into your app or the ticket you are creating`}
          </small>
        </div> */}

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block text-uppercase form-group"
        title="Variants cannot be empty and must be unique"
      >
        Begin this Experiment
      </button>
    </form>
  );
};
