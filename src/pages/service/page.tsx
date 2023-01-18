"use client";
import React, { useState } from "react";
import Button from "../../Components/Button";
import UploadField from "../../Components/UploadField";

export default function Services() {
  const [file, setFile] = useState();
  const [type, setType] = useState<"image" | "video">("image");

  const handleChange = (val: any) => {
    setFile(val);
  };

  const toggleModal = () => {
    setType((prev) => (prev === "image" ? "video" : "image"));
  };

  const viewCase = () => {
    switch (type) {
      case "video":
        return (
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-center text-lg mx-auto my-5 text-gray-400 font-medium">
              Welcome to our service! Here, you can enable real-time video stream and our AI model will predict whether the chicken is sick or not. To do this, simply click on the "Enable Video Stream" button and the video stream will start. The AI model will then process the video frames and return the predictions in real-time. You will be able to see the prediction, with an indication of whether the chicken is sick or not. Thank you for using our service!
            </h2>
            <video src="" className="w-full bg-bash h-96" />
          </div>
        );
      case "image":
        return (
          <>
            <h2 className="text-center text-lg w-4/12 mx-auto my-5 text-gray-400 font-medium">
              Welcome to our service! Here, you can upload an image of a chicken
              and our AI model will predict whether the chicken is sick or not.
              Simply click the "Upload Image" button, select your image file,
              and hit "Submit." Our model will then process your image and
              return the prediction. You will be able to see the predicted
              image, with an indication of whether the chicken is sick or not.
              Thank you for using our service!
            </h2>
            <div className="flex flex-col items-center justify-center w-5/12 mx-auto">
              <UploadField
                label=""
                value={file}
                {...{ handleChange }}
                className="rounded-none"
                accept="image/*, video/*"
              />
              <Button text="Submit" className="mt-5 w-3/12" />
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="h-full w-full">
      <h1 className="text-center text-5xl text-gray-700 mt-32 font-black">
        Welcome Back
      </h1>
      <div className="mx-auto w-fit flex items-center border p-2 mt-5">
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
      {viewCase()}
    </div>
  );
}
