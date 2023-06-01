import Head from "next/head";
import Navbar from "../components/Navbar";
import SolarInputs from "../components/SolarInputs";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import { useState } from "react";

const SolarPlot = dynamic(() => import("../components/SolarPlot"), {
  ssr: false,
});

const SolarTracker = () => {
  const [latLon, setLatLon] = useState({
    latitude: 12,
    longitude: 34,
  });

  const [dateTime, setDateTime] = useState("");

  return (
    <div>
      <Head>
        <title>Solar Tracker</title>
      </Head>

      <Navbar />

      <SolarInputs setLatLon={setLatLon} setDateTime={setDateTime} />

      <SolarPlot latLon={latLon} dateTime={dateTime} />

      <Footer />
    </div>
  );
};

export default SolarTracker;
