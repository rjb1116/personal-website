import React from "react";
import Plot from "react-plotly.js";
import { DateTime } from "luxon";

const SolarPlot = ({ latLon, dateTime }) => {
  const generateSphere = () => {
    var x = [];
    var y = [];
    var z = [];

    for (
      var theta = 0;
      theta <= 2 * Math.PI;
      theta = theta + (2 * Math.PI) / 30
    ) {
      for (var phi = 0; phi <= Math.PI / 2; phi = phi + Math.PI / 2 / 20) {
        x.push(Math.cos(theta) * Math.sin(phi));
        y.push(Math.sin(theta) * Math.sin(phi));
        z.push(Math.cos(phi));
      }
    }

    return {
      x: x,
      y: y,
      z: z,
    };
  };
  const sphereSurface = generateSphere();

  const sunCoords = (dateTime, latLon) => {
    const PI = Math.PI;
    const sin = Math.sin;
    const cos = Math.cos;
    const rEO = 149600000; // radius earth orbit, km
    const rE = (6378 + 6357) / 2; // radius earth, km
    const phiE = (23.4 * PI) / 180; // earth tilt, degrees
    const tday = 86164.0905; // seconds in a sidereal day (time needed for earth to rotate 360 degrees, but everyday it actually rotates a little bit more because of the earth's orbit around the sun
    const tyear = 366.25 * tday; // seconds in a year, note: there are 366.25 sidereal days in a year

    const t0 = DateTime.utc(2020, 3, 20, 12, 0, 0); // #initial condition - when sun was directly overhead of latitude 0, longitude 0 on the spring equinox of 2020
    const t = dateTime.diff(t0, "seconds").seconds;

    const lat = latLon.latitude;
    const lon = latLon.longitude;

    const thetaLL = (PI / 180) * lon + ((2 * PI) / tday) * t + PI; // Theta of the latitude longitude coordinates in the earth's reference frame
    const phiLL = PI / 2 - ((2 * PI) / 360) * lat; // Phi of the Latitude Longitude in the earth's reference frame
    const thetaEO = ((2 * PI) / tyear) * t; // Theta of earth orbit in the sun's reference frame, 0 radians is springs equinox

    // Three componenets of a vector pointing to the sun in the reference frame of a person standing on the earth's surface
    const perp =
      rEO *
        (sin(phiE) * sin(thetaEO) * cos(phiLL) -
          cos(phiE) * sin(thetaEO) * sin(thetaLL) * sin(phiLL) -
          cos(thetaEO) * cos(thetaLL) * sin(phiLL)) -
      rE;

    const north =
      rEO *
      (sin(phiE) * sin(thetaEO) * sin(phiLL) +
        cos(phiE) * sin(thetaEO) * sin(thetaLL) * cos(phiLL) +
        cos(thetaEO) * cos(thetaLL) * cos(phiLL));

    const east =
      rEO *
      (cos(thetaEO) * sin(thetaLL) - cos(phiE) * sin(thetaEO) * cos(thetaLL));

    const thetaRaw = Math.atan(north / east); // Angle measured clockwise from due east to the point on the horizon underneath the sun, 0 radians is due east
    var thetaDeg = (thetaRaw * 180) / PI;
    var thetaFromNorth = 90 - thetaDeg;

    // Correcting Theta depending on the unit circle "quadrant" the sun is in, and calculating circular angle from due north
    if (north > 0 && east < 0) {
      thetaDeg = thetaDeg + 180;
      thetaFromNorth = 450 - thetaDeg;
    } else if (north < 0 && east < 0) {
      thetaDeg = thetaDeg + 180;
      thetaFromNorth = 450 - thetaDeg;
    } else if (north < 0 && east > 0) {
      thetaDeg = thetaDeg + 360;
      thetaFromNorth = 450 - thetaDeg;
    }

    const theta = (thetaDeg * PI) / 180;
    const phi = Math.acos(
      perp / Math.sqrt(perp * perp + north * north + east * east)
    ); // Angle from the vertical that points to the sun in the reference frame of a person standing on the earth's surface

    const day = phi < PI / 2 ? true : false;

    const phiFromHorizon = 90 - (phi * 180) / PI;

    return {
      x: cos(theta) * sin(phi),
      y: sin(theta) * sin(phi),
      z: cos(phi),
      thetaFromNorth: thetaFromNorth,
      phiFromHorizon: phiFromHorizon,
      day: day,
    };
  };
  const vector = sunCoords(dateTime, latLon);

  const generateThetaGuide = (vector) => {
    var x = [];
    var y = [];
    var z = [];
    const R = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    for (
      var theta = 0;
      theta <= (vector.thetaFromNorth * Math.PI) / 180;
      theta = theta + 0.01
    ) {
      x.push(0.25 * Math.sin(theta));
      y.push(0.25 * Math.cos(theta));
      z.push(0);
    }

    return {
      x: x,
      y: y,
      z: z,
    };
  };
  const thetaGuide = generateThetaGuide(vector);

  const generatePhiGuide = (vector) => {
    var x = [];
    var y = [];
    var z = [];
    const R = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    for (
      var phi = 0;
      phi < (vector.phiFromHorizon * Math.PI) / 180;
      phi = phi + 0.01
    ) {
      x.push(vector.x * 0.5 * Math.cos(phi));
      y.push(vector.y * 0.5 * Math.cos(phi));
      z.push(R * 0.25 * Math.sin(phi));
    }

    return {
      x: x,
      y: y,
      z: z,
    };
  };
  const phiGuide = generatePhiGuide(vector);

  const generateSunPath = (dateTime, latLon) => {
    var x = [];
    var y = [];
    var z = [];

    var dt = dateTime.startOf("day");
    for (var hour = 0; hour <= 24; hour = hour + 0.5) {
      const vector = sunCoords(dt.plus({ hours: hour }), latLon);
      x.push(vector.x);
      y.push(vector.y);
      z.push(vector.z);
    }

    return {
      x: x,
      y: y,
      z: z,
    };
  };
  const sunPath = generateSunPath(dateTime, latLon);

  const generateBorderCircle = () => {
    var x = [];
    var y = [];
    var z = [];

    for (var theta = 0; theta <= 2 * Math.PI; theta = theta + 0.01) {
      x.push(0.99 * Math.sin(theta));
      y.push(0.99 * Math.cos(theta));
      z.push(0);
    }

    return {
      x: x,
      y: y,
      z: z,
    };
  };
  const borderCircle = generateBorderCircle();

  return (
    <div className="w-full h-auto text-center">
      <div className="  pt-16 xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm w-full h-full mx-auto flex-col">
        <Plot
          onClick={(data) => {
            console.log(data.points[0]);
            generateSunPath(dateTime, latLon);
          }}
          data={[
            {
              // sphere surface
              type: "mesh3d",
              x: sphereSurface.x,
              y: sphereSurface.y,
              z: sphereSurface.z,
              opacity: 0.2,
              showscale: false,
              color: "skyblue",
              //colorscale: "Blues",
            },
            {
              // north line
              type: "scatter3d",
              x: [0, 0],
              y: [0, 0.99],
              z: [0, 0],
              mode: "lines",
              line: {
                color: "red",
                width: 4,
              },
            },
            {
              // south line
              type: "scatter3d",
              x: [0, 0],
              y: [-0.99, 0],
              z: [0, 0],
              mode: "lines",
              line: {
                color: "black",
                width: 2,
              },
            },
            {
              // west to east line
              type: "scatter3d",
              x: [-0.99, 0.99],
              y: [0, 0],
              z: [0, 0],
              mode: "lines",
              line: {
                color: "black",
                width: 2,
              },
            },
            {
              // line to sun
              type: "scatter3d",
              x: [0, vector.x],
              y: [0, vector.y],
              z: [0, vector.z],
              mode: "lines",
              visible: vector.day,
              line: {
                color: "black",
                width: 4,
              },
            },
            {
              // dashed line in XY plane to sun
              type: "scatter3d",
              x: [0, vector.x],
              y: [0, vector.y],
              z: [0, 0],
              mode: "lines",
              visible: vector.day,
              line: {
                //dash: "longdash",
                color: "skyblue",
                width: 2,
              },
            },
            {
              // dashed vertical line to sun
              type: "scatter3d",
              x: [vector.x, vector.x],
              y: [vector.y, vector.y],
              z: [0, vector.z],
              mode: "lines",
              visible: vector.day,
              line: {
                //dash: "longdash",
                color: "skyblue",
                width: 2,
              },
            },
            {
              // sun object
              type: "scatter3d",
              x: [vector.x],
              y: [vector.y],
              z: [vector.z],
              mode: "markers",
              visible: vector.day,
              marker: {
                size: 10,
                color: "gold",
              },
            },
            {
              // theta guide
              type: "scatter3d",
              x: thetaGuide.x,
              y: thetaGuide.y,
              z: thetaGuide.z,
              mode: "lines",
              visible: vector.day,
              line: {
                color: "orange",
                width: 2,
              },
            },
            {
              // border circle
              type: "scatter3d",
              x: borderCircle.x,
              y: borderCircle.y,
              z: borderCircle.z,
              mode: "lines",
              visible: true,
              line: {
                color: "skyblue",
                width: 10,
              },
            },
            {
              // phi guide
              type: "scatter3d",
              x: phiGuide.x,
              y: phiGuide.y,
              z: phiGuide.z,
              mode: "lines",
              visible: false,
              line: {
                color: "blue",
                width: 2,
              },
            },
            {
              // sun path
              type: "scatter3d",
              x: sunPath.x,
              y: sunPath.y,
              z: sunPath.z,
              mode: "lines",
              visible: true,
              line: {
                color: "gold",
                width: 4,
              },
            },
          ]}
          layout={{
            width: 350,
            height: 300,
            autosize: false,
            paper_bgcolor: "#ecf0f3",
            showlegend: false,
            margin: {
              b: 10,
              l: 10,
              r: 10,
              t: 10,
            },
            scene: {
              aspectratio: {
                x: 1.7,
                y: 1.7,
                z: 1,
              },
              xaxis: {
                visible: false,
                range: [-1, 1],
                fixedrange: true,
              },
              yaxis: {
                visible: false,
                range: [-1, 1],
                fixedrange: true,
              },
              zaxis: {
                range: [0, 1.2],
                visible: false,
                fixedrange: true,
              },
              camera: {
                eye: {
                  x: 1.32,
                  y: -1.32,
                  z: 0.3,
                },
                center: {
                  x: 0,
                  y: 0,
                  z: -0.3,
                },
              },
              annotations: [
                {
                  // theta symbol
                  showarrow: false,
                  x: 0.1,
                  y: 0.1,
                  z: 0,
                  text: "&#952;",
                  font: {
                    color: "rgb(183, 136, 73)",
                    size: 14,
                  },
                },
                {
                  // phi symbol
                  showarrow: false,
                  x: vector.x * 0.3,
                  y: vector.y * 0.3,
                  z: vector.z * 0.1,
                  text: "&#934;",
                  font: {
                    color: "rgb(129, 168, 222)",
                    size: 14,
                  },
                },
                {
                  // N label
                  showarrow: false,
                  x: 0.15,
                  y: 0.8,
                  z: 0,
                  text: "N",
                  font: {
                    color: "red",
                    size: 14,
                  },
                },
              ],
            },
          }}
          config={{
            displayModeBar: false,
          }}
        />
        <p className=" font-mono">
          &theta;: {Math.round(vector.thetaFromNorth)} | &Phi;:{" "}
          {Math.round(vector.phiFromHorizon)}
        </p>
      </div>
    </div>
  );
};

export default SolarPlot;
