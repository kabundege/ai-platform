import React from "react";
import "../styles/globals.css";
import { FiUser, FiUsers } from "react-icons/fi";
import { AiOutlineBank } from "react-icons/ai";
import background from "../public/assets/bg.jpg";
import Image from "next/image";

export default function Home() {
  const SectionOne = (
    <div
      className={
        "flex items-center justify-center flex-col w-full mt-10 md:mt-32 mx-auto md:max-w-10xl"
      }
    >
      <div className="flex items-center">
        <p className="text-3xl md:text-7xl font-extrabold mr-3">Our poultry</p>
        <p className="text-3xl md:text-7xl font-thin text-gray-700">farm,</p>
      </div>
      <div className="mt-5 md:mt-20 mb-5 md:mb-10 flex flex-col md:flex-row justify-between w-full overflow-hidden">
        <div className="hidden md:flex relative w-1/4">
          <Image
            className="absolute h-56 mt-14 top-0 z-0 w-full"
            src={background}
            alt=""
          />
        </div>
        <div className="w-full md:w-1/3 p-5">
          <p className="text-xl md:text-3xl md:w-10/12 font-light">
            We are here to <strong className="font-semibold">Look</strong> after a poultry in your absence
            <br /> for :
          </p>
          <hr className="my-5" />
          <div className="grid gap-3 grid-cols-2 md:flex md:items-center flex-col md:flex-row">
            <div className="flex items-center mr-10">
              <div className="bg-orange-500 p-3 rounded-full">
                <FiUser className="text-white text-lg" />
              </div>
              <p className="text-base ml-2 font-light">Individuals</p>
            </div>
            <div className="flex items-center mr-10">
              <div className="bg-orange-500 p-3 rounded-full">
                <FiUsers className="text-white text-lg" />
              </div>
              <p className="text-base ml-2 font-light">Cooperates</p>
            </div>
            <div className="flex items-center mr-10">
              <div className="bg-orange-500 p-3 rounded-full">
                <AiOutlineBank className="text-white text-lg" />
              </div>
              <p className="text-base ml-2 font-light">Institutes</p>
            </div>
          </div>
        </div>
        <div className="relative w-11/12 md:w-1/4 mx-auto h-56">
          <button className="w-28 h-28 absolute md:relative top-1/4 md:top-0 left-1/3 md:-left-14 bg-orange-500 text-xl border-0 md:border-4 border-white text-white font-semibold md:font-medium rounded-full z-10">
            Get In
            <br />
            Touch
          </button>
          <Image
            className="absolute h-full mt-5 md:mt-14 top-0 z-0 w-full"
            src={background}
            alt=""
          />
        </div>
      </div>
    </div>
  );
  const sectionTwo = (
    <div className="flex justify-between flex-col md:flex-row max-w-5xl mx-auto">
      <section className="mt-10 ml-5 md:ml-0">
        <p>
          <span className="text-orange-500">02 / </span>
          <span className="text-gray-200 font-medium">About</span>
        </p>
        <p className="text-gray-400 text-4xl font-nomal mt-3">We are</p>
        <p className="text-gray-100 text-5xl font-medium">Creatives.</p>
      </section>
      <section className="w-full md:w-1/2 mt-10 md:mt-0">
        <Image src={background} className="w-full h-56" alt="" />
        <p className="text-gray-500 text-base font-light mt-10 mb-5 px-5 md:px-0">
          <strong className="text-gray-100 font-normal">Sit tempor anim ea mollit magna ullamco.</strong> Esse ad
          qui voluptate qui laboris pariatur laboris veniam minim culpa ea
          pariatur. Enim labore mollit proident laboris ad non magna dolore
          fugiat. <strong className="text-gray-100 font-normal">Eiusmod proident velit esse enim. </strong>
        </p>
        <p className="text-gray-500 text-base font-light px-5 md:px-0"> 
          <strong className="text-gray-100 font-normal">Labore cupidatat veniam velit et eu. </strong>
          Dolor veniam voluptate ipsum enim reprehenderit qui
          sint occaecat laboris proident laborum anim laborum. Deserunt qui
          labore et non.
        </p>
        <div className="flex my-5 ml-5 md:ml-0">
          <div className="h-1 w-1/5 bg-orange-500"/>
          <div className="h-1 w-10 bg-orange-200 mx-5"/>
          <div className="h-1 w-5 bg-orange-100"/>
        </div>
      </section>
    </div>
  );

  const sectionThree = (
    <div className="w-full relative mt-24 md:mt-16 h-60">
      <div className="md:max-w-5xl mx-auto relative z-20">
        <button className="absolute w-32 h-32 -top-16 left-1/3 md:left-0 bg-orange-500 text-lg border-4 border-black text-white rounded-full z-20">
          How are 
          <br />
          Agile
        </button>
      </div>
      <div className="w-full h-full text-lg md:text-5xl relative z-10">
        <div className="grid gap-5 p-5 md:p-0 grid-cols-3 md:flex md:max-w-5xl text-black md:text-gray-300 w-full pb-5 mx-auto h-full items-end  justify-between">
          {
            React.Children.toArray(
              ['Plan','Design','Develop','Test','Deploy','Feedback'].map(
                (one,index) => <> { index ? <> &bull; </> : null } <p className="text-gray-400 md:text-white text-2xl relative z-50 md:text-4xl font-semibold">{one}</p> </>
              )
            )
          }
          <div className="gradient" />
        </div>
        <div className="absolute bottom-0 w-screen h-full grandient" />
      </div>
      <Image src={background} className="w-full h-full absolute top-0 left-0 object-cover" alt="" />
    </div>
  );

  return (
    <div>
      {SectionOne}
      <div className="bg-black">
        {sectionTwo}
        {sectionThree}
      </div>
    </div>
  );
}
