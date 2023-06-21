import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Resume from "../components/Resume";

const resume = () => {
  return (
    <div>
      <Head>
        <title>Reuben's Resumé</title>
      </Head>

      <Navbar />

      <Resume />
    </div>
  );
};

export default resume;
