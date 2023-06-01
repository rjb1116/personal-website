import React from "react";

const About = () => {
  return (
    <div id="about" className=" w-full md:h-[50vh] p-2 flex items-center py-16">
      <div className=" max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className=" uppercase text-xl tracking-widest text-purple-500">
            About
          </p>
          <h2 className=" py-4">Who I am</h2>
          <p className=" py-2 text-gray-500">// I am not your normal MLE</p>
          <p className=" py-2 text-gray-500">
            as;dlkjfsa;ldkjf;aslkdjf;slakjd a;lsdkjfs;al a;lsjd f;laskjdf;alksjd
            a;lskdjf ;alskjdf;lksjadf ;lkjasd;lkfjskl;jd ;lkasjd;lkfjas;ldfkj
            ;aslkdjf;lksjadf
          </p>
          <p>Checkout out some of my projects</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default About;
