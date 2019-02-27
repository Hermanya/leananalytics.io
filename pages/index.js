import React from "react";
import { Experiment, Variant } from "react-lean-analytics";
import Head from "next/head";
import { Hero } from "../components/Hero";
import { Experiment as ExperimentVisualisation } from "../components/Experiment";
import { Footer } from "../components/Footer";
import classNamed from "classnamed-components";
import "../src/index.scss";
import Router from "next/router";

const ExampleSection = classNamed(
  "section"
)`mr-md-3 pt-3 px-1 pt-md-5 px-lg-5 text-center overflow-hidden d-flex flex-column animated fadeInUp`;

const Section = ({ title, description, children, ...props }) => (
  <div className="my-3 p-3" {...props}>
    <h2 className="display-5">{title}</h2>
    <p className="lead">{description}</p>
    {children}
  </div>
);

const ExampleDeviceFrame = classNamed(
  "div"
)`shadow-sm mx-auto text-dark px-3 pt-5 mt-auto`;

const ExampleDeviceScreen = classNamed("div")`bg-white h-100 w-100`;

const ExampleDevice = ({ children, ...props }) => {
  return (
    <ExampleDeviceFrame {...props}>
      <ExampleDeviceScreen>{children}</ExampleDeviceScreen>
    </ExampleDeviceFrame>
  );
};

const kekStyle = {
  width: "80%",
  height: "300px",
  borderRadius: "28px 28px 0 0"
};

const Landing = ({ history }) => {
  return (
    <div>
      <Head>
        <title>Lean Analytics | A/B Testing for React apps</title>
      </Head>
      {/* <nav className="site-header sticky-top py-1">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <a className="py-2 d-none d-md-inline-block" href="#">
            Tour
          </a>
          <a className="py-2 d-none d-md-inline-block" href="#">
            Product
          </a>
          <a className="py-2 d-none d-md-inline-block" href="#">
            Features
          </a>
        </div>
      </nav> */}

      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-light">
        <Experiment
          trackedAction="Enter the Lab"
          id="15069830-34d6-4856-bf50-f788d3396d82"
        >
          <Variant description={`Begin testing now`}>
            {callback => <Hero callback={callback} cta="Begin testing now" />}
          </Variant>
          <Variant description={`Start for free`}>
            {callback => <Hero callback={callback} cta="Start for free" />}
          </Variant>
        </Experiment>

        {/* <div className="product-device shadow-sm d-none d-md-block">
          <h1>hellow</h1>
        </div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block" /> */}
      </div>

      {/* <Section title="How it works" description={<>It is really simple</>} /> */}

      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <ExampleSection className="bg-dark text-white delay-0">
          <div className="my-3 p-3">
            <h2 className="display-5">How it works</h2>
            <p className="lead">
              First you list things you want to try out.
              <br />
              Then you integrate some jsx into your app.
              <br />
              {`That's all, see statistics in real time!`}
            </p>
          </div>
          <ExampleDevice className="bg-light" style={kekStyle}>
            <div className="embed-responsive embed-responsive-16by9">
              <div>
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/4dKX3m-WpS0?rel=0"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="text-muted small">Watch this demo video</p>
          </ExampleDevice>
        </ExampleSection>
        <ExampleSection className="bg-white delay-1">
          <Section
            title="Iterate on copy"
            description={
              <>
                Struggling to get your point across?
                <br /> Not sure what language is more persuasive?
              </>
            }
          />
          <ExampleDevice className="bg-dark" style={kekStyle}>
            <ExperimentVisualisation
              experiment={{
                name: "Landing CTA",

                variants: [
                  {
                    name: '"Begin testing now" cta',
                    invocations: 30,
                    validations: 10
                  },
                  {
                    name: '"Start for free" cta',
                    invocations: 23,
                    validations: 5
                  }
                ]
              }}
            />
          </ExampleDevice>
        </ExampleSection>
      </div>

      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <ExampleSection className="bg-white delay-2">
          <div className="my-3 p-3">
            <h2 className="display-5">Optimize pricing</h2>
            <p className="lead">
              Use variable pricing to find the right price point.
            </p>
          </div>
          <ExampleDevice className="bg-rosegold" style={kekStyle}>
            <ExperimentVisualisation
              experiment={{
                name: "Product Price",

                variants: [
                  {
                    name: "$10",
                    invocations: 15,
                    validations: 4
                  },
                  {
                    name: "$15",
                    invocations: 12,
                    validations: 2
                  },
                  {
                    name: "$50",
                    invocations: 14,
                    validations: 1
                  }
                ]
              }}
            />
          </ExampleDevice>
        </ExampleSection>
        <ExampleSection className="bg-white delay-3">
          <div className="my-3 py-3">
            <h2 className="display-5">Monitor ads</h2>
            <p className="lead">
              Measure ads that outperform on your platform.
            </p>
          </div>
          <ExampleDevice className="bg-dark" style={kekStyle}>
            <ExperimentVisualisation
              experiment={{
                name: "Ads for this month",

                variants: [
                  {
                    name: "https://sponsor-a.com",
                    invocations: 1220,
                    validations: 5
                  },
                  {
                    name: "https://sponsor-b.com",
                    invocations: 1301,
                    validations: 9
                  },
                  {
                    name: "https://sponsor-c.com",
                    invocations: 1232,
                    validations: 1
                  }
                ]
              }}
            />
          </ExampleDevice>
        </ExampleSection>
      </div>
      <ExampleSection className="text-center col-md-8 offset-md-2 delay-4">
        <h2 className="display-5">And more; interested?</h2>
        <p className="lead">
          In the future, I am thinking to implement weighted experiments, add a
          way to automatically abort faulty experiments, and maybe I could also
          make an API that would return certain stats relevant to the user that
          could work as <em>Use Proof</em>.
        </p>
        <p className="lead">
          My goal is to make <strong>Lean Startup</strong>-style{" "}
          <strong>Continious Delivery</strong> easy.
        </p>
        <div>
          <button
            className="btn btn-primary text-uppercase btn-lg m-1"
            onClick={() => {
              Router.push("/lab");
            }}
          >
            Get Started <i className="fas fa-arrow-right" />
          </button>
          <a
            className="btn btn-outline-primary text-uppercase btn-lg m-1"
            href="https://twitter.com/hermanhasawish"
          >
            Subscribe <i className="fab fa-twitter" />
          </a>
        </div>
      </ExampleSection>
      <Footer />
    </div>
  );
};

export default Landing;
