import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons/faSquareFacebook";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { faCopyright } from "@fortawesome/free-solid-svg-icons/faCopyright";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import React from "react";


const Footer = () => {
  return (
      <footer className="relative flex flex-col mt-auto right-0 left-0 bottom-20 sm:bottom-0">
        <div className="relative w-full h-auto">
          {/* Back SVG */}
          <div className="absolute inset-0 mt-4">
            <svg
              viewBox="0 0 1440 377"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 144.19L260 0L483.079 200.765L576 164.718L638.885 200.765L853.318 61.5807L1152 283.876L1440 237.314V376.999H1152H864H576H288H0V144.19Z"
                fill="#B5C0F8"
              />
            </svg>
          </div>

          {/* Middle SVG */}
          <div className="absolute inset-0 mt-8 sm:mt-10 md:mt-14 lg:mt-20 xl:mt-24  2xl:mt-28">
            <svg
              viewBox="0 0 1440 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 42.998L30 56.998C60 71.998 120 99.998 180 107.998C240 114.998 300 99.998 360 78.998C420 56.998 480 27.998 540 49.998C600 71.998 660 143.998 720 135.998C780 128.998 840 42.998 900 35.998C960 27.998 1020 99.998 1080 92.998C1140 85.998 1200 -0.00195312 1260 -0.00195312C1320 -0.00195312 1380 85.998 1410 128.998L1440 171.998V301.998H1410C1380 301.998 1320 301.998 1260 301.998C1200 301.998 1140 301.998 1080 301.998C1020 301.998 960 301.998 900 301.998C840 301.998 780 301.998 720 301.998C660 301.998 600 301.998 540 301.998C480 301.998 420 301.998 360 301.998C300 301.998 240 301.998 180 301.998C120 301.998 60 301.998 30 301.998H0V42.998Z"
                fill="#828FD9"
              />
            </svg>
          </div>

          {/* Front SVG */}
          <div className="relative inset-0 top-[2px] ">
            <svg
              viewBox="0 0 1440 432"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 43L34 58C69 72 137 101 206 144C274 187 343 245 411 295C480 346 549 389 617 374C686 360 754 288 823 252C891 216 960 216 1029 230C1097 245 1166 274 1234 238C1303 202 1371 101 1406 50L1440 0V432H1406C1371 432 1303 432 1234 432C1166 432 1097 432 1029 432C960 432 891 432 823 432C754 432 686 432 617 432C549 432 480 432 411 432C343 432 274 432 206 432C137 432 69 432 34 432H0V43Z"
                fill="url(#paint0_linear_518_6743)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_518_6743"
                  x1="720"
                  y1="129.5"
                  x2="720"
                  y2="458"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#5463AF" />
                  <stop offset="1" stopColor="#21274C" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="relative inset-0 bg-gradient-to-b from-halfDarkpurple to-darkPurple flex-grow">
          <ul className="text-left pl-8 sm:pl-18 md:pl-32 pt-2 w-1/4  text-textColor text-xs md:text-base xl:text-2xl font-display sm:font-medium">
            <li className="pb-2 hover:text-hoverOnLink">

              <a href="#">
                Hjälp{" "}
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  style={{ color: "#dbe1eb" }}
                />
              </a>
            </li>
            <li className="pb-2 hover:text-hoverOnLink">
              <a href="#">Användningsvillkor</a>
            </li>
            <li className="pb-2 hover:text-hoverOnLink">
              <a href="#">
                Kontakt
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  style={{ color: "#dbe1eb" }}
                />
              </a>
            </li>
            <li className="hover:text-hoverOnLink">
              <a href="#">
                FAQ{" "}
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  style={{ color: "#dbe1eb" }}
                />
              </a>
            </li>
          </ul>
          <div className="flex justify-center pb-2">
            <ul className="flex">
              <li className="px-4 hover:scale-125" id="facebook">
                <a
                  href="https://www.facebook.com/groups/918437540292005"
                >
                  <FontAwesomeIcon
                    icon={faSquareFacebook}
                    size="2xl"
                    style={{ color: "#FFFFFF" }}
                  />
                </a>
              </li>
              <li className="px-4 hover:scale-125" id="instagram">
                <a href="https://www.instagram.com/activity.buddies/">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2xl"
                    style={{ color: "#FFFFFF" }}
                  />
                </a>
              </li>
              <li className="px-4 hover:scale-125" id="linkedin">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="2xl"
                    style={{ color: "#FFFFFF" }}
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t  border-textColor mx-12 md:mx-[300px]">
            <p className="text-center py-2 text-textColor text-xs md:text-base font-poppins">
              <FontAwesomeIcon
                icon={faCopyright}
                style={{ color: "#d5dae2" }}
              />{" "}
              2024 Av Adventure Buddies AB
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;