import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Button";
import FarmOne from "../../Components/farm";
import Input from "../../Components/Input";
import { StoreContext } from "../../context";
import { farmSchema } from "../../validation/auth.schema";

export interface Farm {
  name: string;
  owner: string;
  isActive: boolean;
  isDeleted: boolean;
}

const Farms = () => {
  const { user } = useContext(StoreContext);
  const [farms, setFarm] = useState<Farm[]>([]);

  useEffect(() => {
    if (user) {
      const storedFarms = localStorage.getItem("farms");
      const farms = storedFarms ? (JSON.parse(storedFarms) as Farm[]) : [];
      if (user.isAdmin) {
        setFarm(farms);
      } else if (user) {
        setFarm(farms.filter((one) => one.owner === user.phone));
      }
    }
  }, [user]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    reValidateMode: "onChange",
    resolver: yupResolver(farmSchema),
  });

  const submitHandler = handleSubmit(({ name }) => {
    if (user) {
      setFarm((prev) => {
        const payload = {
          name,
          owner: user.phone,
          isActive: true,
          isDeleted: false,
        };
        localStorage.setItem("farms", JSON.stringify([payload, ...prev]));
        return [payload, ...prev];
      });

      reset();
    }
  });

  const handleActivation = (index: number) => {
    const newFarm = farms.map((one, ind) => {
      if (ind === index) {
        return { ...one, isActive: !one.isActive };
      } else {
        return one;
      }
    });
    localStorage.setItem("farms", JSON.stringify(newFarm));
    setFarm(newFarm);
  };

  const handleDeletion = (index: number) => {
    const newFarm = farms.map((one, ind) => {
      if (ind === index) {
        return { ...one, isDeleted: !one.isDeleted };
      } else {
        return one;
      }
    });
    localStorage.setItem("farms", JSON.stringify(newFarm));
    setFarm(newFarm);
  };

  return (
    <div className="w-full">
      <section className="flex justify-between items-end max-w-5xl mx-auto  mb-10">
        <div>
          <h1 className="text-left text-5xl text-gray-700 my-2 font-black">
            Check on your farms
          </h1>
          <p className="text-left text-xl text-gray-400">
            Find here details on your farms
          </p>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-fit flex justify-between items-start"
        >
          <Input
            placeholder="Farm name"
            register={register("name")}
            error={errors.name?.message}
          />
          <Button
            text={<span className="text-sm"> &#43; Add Farm</span>}
            className="bg-borange ml-5"
          />
        </form>
      </section>
      <div
        className={`h-full w-full max-w-5xl mx-auto grid ${
          farms[0] && "grid-cols-4"
        } gap-3`}
      >
        {React.Children.toArray(
          farms[0] ? (
            farms.map((one, index) => (
              <FarmOne
                handleActive={() => handleActivation(index)}
                handleDeletion={() => handleDeletion(index)}
                {...{ ...one, index, farmCount: farms.length }}
              />
            ))
          ) : (
            <h1 className="text-center w-full text-4xl mt-20 text-gray-200">
              No farm added yet
            </h1>
          )
        )}
      </div>
    </div>
  );
};

export default Farms;
