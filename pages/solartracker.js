import Head from "next/head";
import Navbar from "../components/Navbar";
import SolarInputs from "../components/SolarInputs";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import { useState } from "react";
import { DateTime } from "luxon";

const SolarPlot = dynamic(() => import("../components/SolarPlot"), {
  ssr: false,
});

const SolarTracker = () => {
  const [latLon, setLatLon] = useState({
    latitude: 47.65120009191971,
    longitude: -122.3470160056653,
  });

  const [dateTime, setDateTime] = useState(
    DateTime.now().setZone("America/Los_Angeles")
  );

  return (
    <div>
      <Head>
        <title>Solar Tracker</title>
      </Head>

      <Navbar />

      <SolarPlot latLon={latLon} dateTime={dateTime} />

      <SolarInputs
        latLon={latLon}
        setLatLon={setLatLon}
        dateTime={dateTime}
        setDateTime={setDateTime}
      />

      <Footer />
    </div>
  );
};

export default SolarTracker;
