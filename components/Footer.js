import React from "react";
import Link from "next/link";
export const Footer = () => (
  <footer className="container py-5">
    <div className="row">
      <div className="col-12 col-md">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1589206/profile/profile-512.jpg"
          className="float-left mr-2 rounded"
          style={{ width: "2.5em", height: "2.5em" }}
          alt="herman starikov"
        />
        Made by <a href="https://hermanya.github.io">Herman Starikov</a>
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
