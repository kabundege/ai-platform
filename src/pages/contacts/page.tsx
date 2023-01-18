"use client";
import React from "react";
import background from "../../assets/phone.jpg";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { contactSchema } from "../../validation/contact.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "../../Components/Image";
import InputField from "../../Components/InputField";
import Button from "../../Components/Button";

interface MSG {
  name: string;
  email: string;
  message: string;
}

export default function Contacts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MSG>({
    reValidateMode: "onChange",
    resolver: yupResolver(contactSchema),
  });

  const sendEmail = handleSubmit(({ name, email, message }) => {
    const templateParams = { name, email, message };

    emailjs
      .send(
        "service_obimj0r",
        "template_56e2slm",
        templateParams,
        "user_XFX124IMCIBDKjJ1A8F9l"
      )
      .then(
        (response) => {
          toast.success(response.text);
        },
        (err) => {
          toast.error(err);
        }
      );
  });

  return (
    <div className="flex md:h-[90vh] items-center justify-center">
      <section className=" w-2/6 bg-gray-100 h-[75%] transform translate-x-10 relative z-0">
        <Image
          src={background}
          alt=""
          className="transform rotate-180 relative -top-10 w-8/12 mx-auto"
        />
      </section>
      <section className="p-5 bg-white max-w-3xl relative z-10 shadow-lg">
        <form
          onSubmit={sendEmail}
          className="w-full flex flex-col items-center border p-10"
        >
          <label className="text-sm font-semibold">Contact us today</label>
          <h1 className="text-xl uppercase font-light my-5">
            Your Dream Farm starts with your dream home
          </h1>
          <p className="text-sm text-center text-bash">
            Welcome to our contact page! We provide a fast and accurate way to
            detect if chickens are sick or healthy. Reach out to us for
            questions or concerns. Contact us via form, email or phone call. Let
            us help you keep your chickens healthy and productive.
          </p>
          <div className="flex items-center w-full">
            <InputField
              error={errors.name?.message}
              register={register("name")}
              label=""
              placeholder="YOUR NAME"
              name="name"
              wrapperClassName="rounded-none mr-5"
            />
            <InputField
              error={errors.email?.message}
              register={register("email")}
              label=""
              placeholder="EMAIL ADDRESS "
              type="email"
              wrapperClassName="rounded-none"
            />
          </div>
          <textarea
            {...register("message")}
            className={` ${
              errors.message?.message ? "border border-bred" : ""
            } outline-none p-3 text-base border border-bash w-full`}
            placeholder="YOUR MESSAGE"
          />
          {errors.message?.message ? (
            <p className="text-base text-left text-bred mt-1 w-full">
              {errors.message?.message}
            </p>
          ) : null}
          <Button
            text={<p>SEND MESSAGE &#8594;</p>}
            className="mt-5 rounded-none bg-black text-white"
          />
        </form>
      </section>
    </div>
  );
}
