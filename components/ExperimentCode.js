import React from "react";

export const makeCode = experiment => `{/* import { Experiment, Variant } from 'react-lean-analytics' */}

<Experiment trackedAction="${experiment.trackedAction}"
  id="${experiment.id}">${experiment.variants
  .map(
    (variant, index) => `
  <Variant description={\`${variant.name.replace(/"/g, '\\"')}\`}>
    {(callback) => <MyComponent onAction={callback}/>}
  </Variant>`
  )
  .join("")}
</Experiment>
`;

export const ExperimentCode = ({ onDone, experiment }) => {
  const code = makeCode(experiment);
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        onDone();
      }}
    >
      <div className="form-group mt-4">
        <label htmlFor="inputCode">Javascript code</label>
        <textarea
          type="text"
          className="form-control text-monospace"
          id="inputCode"
          aria-describedby="help"
          value={code}
          rows={code.split("\n").length}
          readOnly
        />
        <small id="help" className="form-text text-muted">
          {`Copy-paste this snippet into your app or the ticket you are creating`}
        </small>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block text-uppercase form-group"
      >
        Done
      </button>
    </form>
  );
};
