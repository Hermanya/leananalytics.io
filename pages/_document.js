import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { MetaTags } from "../components/MetaTags";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          /> */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
          />
          <link
            rel="shortcut icon"
            href="https://hermanya.github.io/favicon.ico"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="#6f5cff" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
          />
          <MetaTags />
        </Head>
        <body>
          <div className="h-100vh mw-100 bg-light">
            <div className="container py-5">
              <Main />
            </div>
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
