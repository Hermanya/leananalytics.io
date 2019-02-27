import React, { useState } from "react";
import { Auth, API } from "aws-amplify";
import Head from "next/head";

import Router from "next/router";
import { NewExperimentForm } from "../components/NewExperimentForm";
import { ExperimentCode } from "../components/ExperimentCode";
import HelperImage from "../src/images/undraw_science_fqhl.svg";
import { withAuthenticator } from "aws-amplify-react/dist/Auth";
import awsconfig from "../src/aws-exports";
import "../src/index.scss";

API.configure(awsconfig);
Auth.configure(awsconfig);
export const NewExperiment = ({ match, history }) => {
  const [experiment, setExperiment] = useState(undefined);
  if (experiment) {
    return (
      <>
        <Head>
          <title>New A/B Test</title>
        </Head>
        <h1>New A/B Test</h1>

        <ExperimentCode
          experiment={experiment}
          onDone={() => {
            Router.push("/lab");
          }}
        />
      </>
    );
  }
  return (
    <div className="row">
      <Head>
        <title>New A/B Test</title>
      </Head>
      <div className="col-12 col-sm-8 col-md-6">
        <h1>New A/B Test</h1>

        <>
          <p className="form-text text-muted">
            {`
          Here you will describe specific changes to your web page that you wish to test, called variants. You can create as many variants as you wish to test against your current implementation. Variants cannot be empty and must be unique.
          `}
          </p>
          <NewExperimentForm
            onCreate={async experiment => {
              const response = await API.post(
                "leanAnalyticsApi",
                "/experiments",
                {
                  body: experiment
                }
              );
              setExperiment(response.data);
            }}
          />
        </>
      </div>
      <div className="col-12 col-sm-4 col-md-6">
        <HelperImage className="mw-100 h-auto animated fadeIn" alt="" />
      </div>
    </div>
  );
};

export default withAuthenticator(NewExperiment);
