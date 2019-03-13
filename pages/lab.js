import React, { useState, useEffect } from "react";
import Head from "next/head";

import Router from "next/router";
import { API, Auth } from "aws-amplify";
import Link from "next/link";
import { Experiment, Variant } from "react-lean-analytics";
import { Experiment as ExperimentVisualisation } from "../components/Experiment";
import { Footer } from "../components/Footer";
import LabImage from "../src/images/undraw_robotics_kep0.svg";
import EmptyStateImage from "../src/images/undraw_Golden_gate_bridge_laqs.svg";
import LoadingImage from "../src/images/undraw_loading_frh4.svg";
import { withAuthenticator } from "aws-amplify-react/dist/Auth";
import awsconfig from "../src/aws-exports";
import "../src/index.scss";

API.configure(awsconfig);
Auth.configure(awsconfig);

let timeoutId;

const useApi = (method, api, path) => {
  const [data, updateData] = useState([false, undefined]);

  const makeTheCall = () => {
    window.API = API;
    return API.get("leanAnalyticsApi", "/experiments")
      .then(json => {
        if (json.error) return Promise.reject(json);
        updateData([false, undefined, json, updateData]);
      })
      .catch(e => {
        updateData([false, e, undefined]);
      })
      .then(() => {
        timeoutId = window.setTimeout(makeTheCall, 6000);
      });
  };
  useEffect(
    () => {
      updateData([true, undefined, data[2], updateData]);

      makeTheCall();
      return () => {
        window.clearTimeout(timeoutId);
      };
    },
    [method, api, path]
  );

  return data;
};
export const Lab = ({ history }) => {
  const [loading, error, experiments, updateData] = useApi();

  const title = (
    <h1 className="h4 font-weight-normal text-muted mx-1">A/B Test Results</h1>
  );

  const signout = (
    <button
      className="btn btn-link text-uppercase"
      onClick={() => {
        Auth.signOut()
          .then(data => {})
          .catch(err => console.log(err));
        Router.push("/");
      }}
      style={{ minWidth: 170 }}
    >
      Sign out
      <i className="fas fa-sign-out-alt ml-2" />
    </button>
  );

  const NewExperiment = props => (
    <Link href="/new-experiment">
      <button className={`btn btn-primary text-uppercase ${props.className}`}>
        <span className="">{props.text}</span>
        {props.showIcon && <i className="fas fa-plus-square ml-2" />}
      </button>
    </Link>
  );

  return (
    <div>
      <Head>
        <title>Lean Analytics</title>
      </Head>
      <div className="mb-4 flex-column flex-sm-row justify-content-between align-items-center d-none d-md-flex">
        <NewExperiment text="New A/B Test" showIcon />
        {title}
        {signout}
      </div>
      <div className="d-block d-md-none text-center">{title}</div>
      {loading ? (
        <LoadingImage
          alt="loading"
          className="mw-100 mt-4 animated fadeIn slower"
        />
      ) : error ? (
        <h1>{JSON.stringify(error)}</h1>
      ) : experiments ? (
        experiments.length === 0 ? (
          <div className="text-center">
            <h2 className="h4 font-weight-normal text-muted mx-1 animated fadeIn mt-4">
              There is no experiments here.
            </h2>
            <EmptyStateImage
              alt="empty state"
              className="d-block w-50 h-auto mx-auto mt-4 animated fadeIn slow"
            />
            <Experiment trackedAction="Create new experiment" id="update this">
              <Variant description={`Go to create one !`}>
                {callback => (
                  <NewExperiment
                    text="Go to create one !"
                    className="mt-4 animated tada slow"
                  />
                )}
              </Variant>
              <Variant description={`Create new one`}>
                {callback => (
                  <NewExperiment
                    text="Create new one"
                    className="mt-4 animated tada slow"
                  />
                )}
              </Variant>
            </Experiment>
          </div>
        ) : (
          <div>
            <div className="d-flex flex-wrap justify-content-center">
              {experiments.map((experiment, index) => (
                <ExperimentVisualisation
                  key={experiment.id}
                  experiment={experiment}
                  className={`shadow m-3 animated bounceInUp delay-${index}`}
                  style={{ width: 300 }}
                  onDelete={() => {
                    updateData([true, undefined, experiments, updateData]);
                    API.del(
                      "leanAnalyticsApi",
                      "/experiments/" + experiment.id
                    );
                  }}
                  onUpdate={exp => {
                    updateData([true, undefined, experiments, updateData]);
                    API.put("leanAnalyticsApi", "/experiments", { body: exp });
                  }}
                />
              ))}
            </div>
            <LabImage
              alt="team"
              className="d-block w-50 h-auto mx-auto mt-4  animated fadeIn"
            />
          </div>
        )
      ) : (
        <div />
      )}
      <div className="d-block d-md-none text-center mt-4">
        {signout}
        <NewExperiment text="New A/B Test" showIcon />
      </div>
      <Footer />
    </div>
  );
};

export default withAuthenticator(Lab);
