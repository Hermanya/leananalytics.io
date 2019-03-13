import React from "react";
import Link from "next/link";

const Contributor = ({ photo, name, role }) => (
  <div className="clearfix mb-2">
    <img
      src={photo}
      className="float-left mr-2 rounded"
      style={{ width: "2.5em", height: "2.5em" }}
      alt={name}
    />
    <a href="https://hermanya.github.io">{name}</a>{" "}
    <div className="text-muted small">{role}</div>
  </div>
);

export const Footer = () => (
  <footer className="container py-5">
    <div className="row">
      <div className="col-12 col-md">
        <Contributor
          photo={
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1589206/profile/profile-512.jpg"
          }
          name="Herman Starikov"
          role="Author"
        />
        <Contributor
          photo={"https://avatars1.githubusercontent.com/u/25598400?s=460&v=4"}
          name="Mateo Silguero"
          role="Contributor"
        />
        <small className="d-block mb-3 text-muted">© 2018</small>
      </div>

      <div className="col-6 col-md">
        <h5>About</h5>
        <ul className="list-unstyled text-small">
          <li>
            <Link href="/privacy">
              <a className="text-muted">Privacy</a>
            </Link>
          </li>
          <li>
            <Link href="/terms">
              <a className="text-muted">Terms</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-6 col-md">
        <h5>Open-source</h5>
        <ul className="list-unstyled text-small">
          <li>
            <a
              className="text-muted"
              href="https://github.com/hermanya/react-lean-analytics"
            >
              React lean analytics
            </a>
          </li>
          <li>
            <a
              className="text-muted"
              href="https://github.com/Hermanya/leananalytics.io"
            >
              This website
            </a>
          </li>
        </ul>
      </div>
      <div className="col-6 col-md">
        <h5>Get in touch</h5>
        <ul className="list-unstyled text-small">
          <li>
            <a className="text-muted" href="mailto:hermanstarikov@gmail.com">
              Email
            </a>
          </li>
          <li>
            <a className="text-muted" href="https://twitter.com/hermanhasawish">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
