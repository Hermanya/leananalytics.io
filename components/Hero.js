import React from "react";
import Router from "next/router";
import HeroImage from "../src/images/undraw_mobile_testing_reah.svg";

export const Hero = ({ cta, callback }) => (
  <div className="row">
    <div className="col-12 col-md-8 mb-4">
      <h1 className="display-4 font-weight-normal">
        A/B testing{" "}
        <a href="https://reactjs.org/" className="text-nowrap">
          <i className="fab fa-react" /> React
        </a>{" "}
        apps made easy
      </h1>
      <p className="lead font-weight-normal">
        You are leaving money on the table when you do not test. Use Lean
        Startup principles and make your app data-driven, by conducting A/B
        tests on your website — for free — so it works better for your customers
        and your business.
      </p>
      <button
        className="btn btn-primary text-uppercase btn-lg"
        onClick={() => {
          callback();
          Router.push("/lab");
        }}
      >
        {cta} <i className="fas fa-arrow-right" />
      </button>
      <small className="text-muted d-block mt-2">
        See what’s in it for you.
      </small>
    </div>
    <div className="col-12 col-sm-8 col-md-4">
      <HeroImage
        className="mw-100 h-100 mb-4 animated fadeIn"
        alt="people analysing a mobile app"
      />
    </div>
  </div>
);
