import React from "react";
import "../styles/globals.css";
import { FiUser, FiUsers } from "react-icons/fi";
import { AiOutlineBank } from "react-icons/ai";
import background from "../public/assets/bg.jpg";
import Image from "next/image";

export default function Home() {
  const SectionOne = (
    <div
      style={{ maxWidth: "1500px" }}
      className={
        "flex items-center justify-center flex-col w-full mt-32 mx-auto"
      }
    >
      <div className="flex items-center">
        <p className="text-7xl font-extrabold mr-3">Ai Pourtly</p>
        <p className="text-7xl font-thin text-gray-700">Platform,</p>
      </div>
      <div className="mt-20 mb-10 flex justify-between w-full overflow-hidden">
        <div className="relative w-1/4">
          <Image
            className="absolute h-56 mt-14 top-0 z-0 w-full"
            src={background}
            alt=""
          />
        </div>
        <div className="w-1/3">
          <p className="text-3xl w-10/12 font-light">
            Turning & Bringing <strong>Idea</strong> into{" "}
            <strong>Amazing</strong> products through next level visual display,{" "}
            <br /> For :
          </p>
          <hr className="my-5" />
          <div className="flex items-center">
            <div className="flex items-center mr-10">
              <div className="bg-blue-500 p-3 rounded-full">
                <FiUser className="text-white text-lg" />
              </div>
              <p className="text-base ml-2 font-light">Individuals</p>
            </div>
            <div className="flex items-center mr-10">
              <div className="bg-blue-500 p-3 rounded-full">
                <FiUsers className="text-white text-lg" />
              </div>
              <p className="text-base ml-2 font-light">Cooperates</p>
            </div>
            <div className="flex items-center mr-10">
              <div className="bg-blue-500 p-3 rounded-full">
                <AiOutlineBank className="text-white text-lg" />
              </div>
              <p className="text-base ml-2 font-light">Institutes</p>
            </div>
          </div>
        </div>
        <div className="relative w-1/4">
          <button className="w-28 h-28 top-0 -left-14 bg-blue-500 text-xl border-4 border-white text-white rounded-full relative z-10">
            Get In
            <br />
            Touch
          </button>
          <Image
            className="absolute h-56 mt-14 top-0 z-0 w-full"
            src={background}
            alt=""
          />
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {SectionOne}
      <div className="bg-black">
        <div className="flex justify-between max-w-5xl mx-auto">
          <section className="mt-10">
            <p>
              <span className="text-blue-500">02 / </span>
              <span className="text-gray-200 font-medium">About</span>
            </p>
            <p className="text-gray-400 text-4xl font-nomal mt-3">We are</p>
            <p className="text-gray-100 text-5xl font-medium">Creatives.</p>
          </section>
          <section className="w-1/2">
            <Image src={background} className="w-full h-56" alt="" />
            <p className="text-gray-500 text-base font-light mt-10 mb-5">
              <strong className="text-gray-100 font-normal">Sit tempor anim ea mollit magna ullamco.</strong> Esse ad
              qui voluptate qui laboris pariatur laboris veniam minim culpa ea
              pariatur. Enim labore mollit proident laboris ad non magna dolore
              fugiat. <strong className="text-gray-100 font-normal">Eiusmod proident velit esse enim. </strong>
            </p>
            <p className="text-gray-500 text-base font-light"> 
              <strong className="text-gray-100 font-normal">Labore cupidatat veniam velit et eu. </strong>
              Dolor veniam voluptate ipsum enim reprehenderit qui
              sint occaecat laboris proident laborum anim laborum. Deserunt qui
              labore et non.
            </p>
            <div className="flex my-5">
              <div className="h-1 w-1/5 bg-blue-500"/>
              <div className="h-1 w-10 bg-blue-200 mx-5"/>
              <div className="h-1 w-5 bg-blue-100"/>
            </div>
          </section>
        </div>
        <div className="w-full relative bg-green-500 mt-16 h-60">
          <div className="max-w-5xl mx-auto relative z-20">
            <button className="absolute w-32 h-32 -top-16 left-0 bg-blue-500 text-lg border-4 border-black text-white rounded-full z-20">
              How we 
              <br />
              Operate
            </button>
          </div>
          <div className="w-full h-full text-gray-300 text-5xl relative z-10">
            <div className="flex max-w-5xl w-full pb-5 mx-auto h-full items-end  justify-between">
              {
                React.Children.toArray(
                  ['Plan','Design','Develop','Test','Feedback'].map(
                    (one,index) => <> { index ? <> &bull; </> : null } <p className="text-white text-5xl font-semibold">{one}</p> </>
                  )
                )
              }
            </div>
            <div className="absolute bottom-0  bg-red-500 w-screen h-full grandient" />
          </div>
          <Image src={background} className="w-full h-full absolute top-0 left-0 object-cover" alt="" />
        </div>
      </div>
    </div>
  );
}
