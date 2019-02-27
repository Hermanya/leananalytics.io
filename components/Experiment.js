import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { makeCode } from "./ExperimentCode";

const color = (i, xs, offset) =>
  `hsl(${((360 / xs.length) * i + offset) % 360}, 100%, 69%)`;

export const Experiment = ({ experiment, className, ...props }) => {
  const [colorOffset] = useState(360 * Math.random());
  const [codeCopied, setCodeCopied] = useState(false);
  const { variants, name, trackedAction } = experiment;
  let rates = variants.map(({ validations, invocations }) =>
    invocations ? validations / invocations : 0
  );
  let sum = rates.reduce((a, x) => a + x);
  return (
    <div className={`py-4 px-4 bg-white rounded ${className}`} {...props}>
      <h4 className="mb-3 w-100 h5 text-center">{name}</h4>
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
                  title={`This variant was given ${variant.invocations} times`}
                >
                  {variant.invocations}
                </span>
              </small>
            </div>
          );
        })}

        {experiment.id && (
          <div className="text-center">
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
  );
};
