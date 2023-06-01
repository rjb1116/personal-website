import React from "react";

function Footer() {
  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <p className="font-mono text-gray-400">
          Built with
          <a href="https://nextjs.org/"> NextJS </a>| Hosted on AWS:
          <a href="https://aws.amazon.com/route53/"> Route53 </a>
          &rarr;
          <a href="https://aws.amazon.com/cloudfront/"> CloudFront </a>
          &rarr;
          <a href="https://aws.amazon.com/s3/"> S3 </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
