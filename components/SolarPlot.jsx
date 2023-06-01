import React from "react";
import Plot from "react-plotly.js";

const SolarPlot = ({ latLon, dateTime }) => {
  const computeZ = (x, y) => {
    return Math.sqrt(1 - x * x - y * y) - 0.16;
  };

  const generateSide = (step) => {
    var arr = [];
    for (var x = -1; x <= 1; x = x + step) {
      arr.push(x);
    }
    return arr;
  };

  const side = generateSide(0.01);

  const generateZ = (sideArray) => {
    var z = [];
    const sideLength = sideArray.length;
    for (var i = 0; i < sideLength; i++) {
      var xRow = [];
      for (var j = 0; j < sideLength; j++) {
        xRow.push(computeZ(sideArray[i], sideArray[j]));
      }
      z.push(xRow);
    }

    return z;
  };

  return (
    <div className="w-full h-auto text-center">
      <div className="pt-20 xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm w-full h-full mx-auto flex-col">
        <Plot
          onClick={(data) => {
            console.log(data.points[0]);
            console.log(latLon);
            console.log(dateTime);
          }}
          data={[
            {
              type: "surface",
              x: side,
              y: side,
              z: generateZ(side),
              opacity: 0.3,
              showscale: false,
              colorscale: "Blues",
            },
            {
              type: "scatter3d",
              x: [0, -1],
              y: [0, 0],
              z: [0, 0],
              mode: "lines",
              line: {
                color: "red",
                width: 4,
              },
            },
            {
              type: "scatter3d",
              x: [0, 1],
              y: [0, 0],
              z: [0, 0],
              mode: "lines",
              line: {
                color: "black",
                width: 2,
              },
            },
            {
              type: "scatter3d",
              x: [0, 0],
              y: [-1, 1],
              z: [0, 0],
              mode: "lines",
              line: {
                color: "black",
                width: 2,
              },
            },
            {
              type: "scatter3d",
              x: [0, 1],
              y: [0, 1],
              z: [0, computeZ(0.2, 0.5)],
              mode: "lines",
              line: {
                color: "black",
                width: 4,
              },
            },
          ]}
          layout={{
            width: 300,
            height: 300,
            paper_bgcolor: "#ecf0f3",
            showlegend: false,
            margin: {
              b: 10,
              l: 10,
              r: 10,
              t: 10,
            },
            xaxis: {
              range: [-1, 1],
            },
            yaxis: {
              range: [-1, 1],
            },
            scene: {
              camera: {
                eye: {
                  x: 1.05,
                  y: 1.05,
                  z: 0.25,
                },
              },
              xaxis: {
                visible: false,
              },
              yaxis: {
                visible: false,
              },
              zaxis: {
                range: [0, 1],
                visible: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SolarPlot;
