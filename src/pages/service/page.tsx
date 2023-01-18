"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Button from "../../Components/Button";
import SelectField from "../../Components/SelectField";
import UploadField from "../../Components/UploadField";
import { hoverFade } from "../../constants/comon.styles";
import { StoreContext } from "../../context";
import { Farm } from "../farms/page";

export default function Services() {
  const {user} = useContext(StoreContext)
  const [file, setFile] = useState();
  const [farms, setFarm] = useState<Farm[]>([]);
  const [result, setResult] = useState<string>();
  const [isSick, setSick] = useState(false);
  const [type, setType] = useState<"image" | "video">("image");

  useEffect(()=>{
    if(user){
      const storedFarms = localStorage.getItem('farms')
      const farms = storedFarms ? JSON.parse(storedFarms) as Farm[] : []       
      if(user.isAdmin){
        setFarm(farms)
      }else if(user){
        setFarm(farms.filter(one => one.owner === user.phone))
      }
    }
  },[user])

  const handleChange = (val: any) => {
    setFile(val);
  };

  const toggleModal = () => {
    setType((prev) => (prev === "image" ? "video" : "image"));
  };

  const toggleSick = () => {
    setSick(prev => !prev)
  }

  const Select = (
    <div className="w-1/2 relative translate-y-3">
      <SelectField
        onChange={(ev) => {}}
        placeholder="Chooose a farm"
        data={farms.map(({name}) => ({ value:name }))}
      />
    </div>
  )

  const toggleResult = (link?:string) => {
    setResult(link)
  }

  const viewCase = () => {
    switch (type) {
      case "video":
        return (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-center text-lg mx-auto my-5 text-gray-400 font-medium">
              Welcome to our service! Here, you can enable real-time video stream and our AI model will predict whether the chicken is sick or not. To do this, simply click on the "Enable Video Stream" button and the video stream will start. The AI model will then process the video frames and return the predictions in real-time. You will be able to see the prediction, with an indication of whether the chicken is sick or not. Thank you for using our service!
            </h2>
            <video src="" className="w-full bg-bash h-96" />
          </div>
        );
      case "image":
        return (
          <>
            <h2 className="text-center text-lg mx-auto my-5 text-gray-400 font-medium">
              Welcome to our service! Here, you can upload an image of a chicken
              and our AI model will predict whether the chicken is sick or not.
              Simply click the "Upload Image" button, select your image file,
              and hit "Submit." Our model will then process your image and
              return the prediction. You will be able to see the predicted
              image, with an indication of whether the chicken is sick or not.
              Thank you for using our service!
            </h2>
            <div className="flex flex-col items-center justify-center mx-auto">
              <UploadField
                label=""
                value={file}
                {...{ handleChange }}
                className="rounded-none"
                accept="image/*, video/*"
              />
              <Button onClick={()=>toggleResult('https://picsum.photos/200/300.webp')} text="Submit" className="mt-5 w-3/12" />
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="h-full w-full max-w-4xl mx-auto">
      <div className="flex justify-between w-full items-end border-b">
        <div>
          <h1 className="text-center whitespace-nowrap text-5xl text-gray-700 mt-32 font-black">
            Welcome Back
          </h1>
          <div className=" w-fit flex items-center border border-b-none p-2 mt-3">
            <p
              onClick={toggleModal}
              className={`p-2 ${
                type === "image" && "bg-orange-300"
              } hover:opacity-80 cursor-pointer`}
            >
              Use Image
            </p>
            <p
              onClick={toggleModal}
              className={`p-2 ${
                type === "video" && "bg-orange-300"
              } hover:opacity-80 cursor-pointer ml-2`}
            >
              Use Video
            </p>
          </div>
        </div>
        {Select}
      </div>
      { 
        result? 
          (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-center text-lg mx-auto my-5 text-gray-400 font-medium">
                Welcome to our service! Here, you can enable real-time video stream and our AI model will predict whether the chicken is sick or not. To do this, simply click on the "Enable Video Stream" button and the video stream will start. The AI model will then process the video frames and return the predictions in real-time. You will be able to see the prediction, with an indication of whether the chicken is sick or not. Thank you for using our service!
              </h2>
              <img alt="" src={result} className="w-full bg-bash h-96 object-contain" />
              <div className="flex justify-between items-center mt-5 w-full">
                <div className="flex border p-2">
                  <p onClick={toggleSick} className={"flex items-center whitespace-nowrap mr-2 m-1"+hoverFade}>
                    { isSick ? <AiOutlineCheckCircle className="text-borange" /> : <AiFillCheckCircle className="text-borange" />}
                    <span className="ml-2">Found Sick</span>
                  </p>
                  <p onClick={toggleSick} className={"flex items-center whitespace-nowrap m-1"+hoverFade}>
                    { !isSick ? <AiOutlineCheckCircle className="text-borange" /> : <AiFillCheckCircle className="text-borange" />}
                    <span className="ml-2">Found Healthy</span>
                  </p>
                </div>
                <Button text="Save"  onClick={()=>toggleResult()}  className="w-1/3 ml-5" />
              </div>
            </div> 
          ) : 
          viewCase()
      }
    </div>
  );
}
