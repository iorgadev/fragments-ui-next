import React from "react";
import Head from "next/head";

function Loading() {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full col-span-6">
      <Head>
        <title>Fragments Microservice - Loading</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="loader">
        <div className="loader__inner"></div>
      </div>
    </div>
  );
}

export default Loading;
