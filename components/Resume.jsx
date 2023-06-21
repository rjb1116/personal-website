import React from "react";

const Resume = () => {
  return (
    <div className="w-full text-center">
      <div className="max-w-[850px] pt-20 w-full h-[100vh] mx-auto">
        <embed
          src="/assets/Reuben_Britto_Resume.pdf"
          width="100%"
          height="100%"
        />
      </div>
      <div className=" flex justify-center py-6">
        <a
          className="rounded p-2 border-2 border-[#3a8844]"
          href="/assets/Reuben_Britto_Resume.pdf"
          download
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default Resume;
