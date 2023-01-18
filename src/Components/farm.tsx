import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  AiFillLock,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowUp,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsSun, BsThermometerHalf } from "react-icons/bs";
import { GiFarmTractor } from "react-icons/gi";
import { TbWind } from "react-icons/tb";
import CustomModal from "./CustomModal";
import { FiCloudRain } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import Button from "./Button";
import { Farm } from "../pages/farms/page";
import { StoreContext } from "../context";

const weather = {
  coord: {
    lon: 30.084,
    lat: -1.9512,
  },
  weather: [
    {
      id: 801,
      main: "Clouds",
      description: "few clouds",
      icon: "02d",
    },
  ],
  base: "stations",
  main: {
    temp: 296.86,
    feels_like: 296.77,
    temp_min: 296.86,
    temp_max: 297.39,
    pressure: 1020,
    humidity: 57,
  },
  visibility: 10000,
  wind: {
    speed: 2.06,
    deg: 0,
  },
  clouds: {
    all: 20,
  },
  dt: 1673861146,
  sys: {
    type: 2,
    id: 47683,
    country: "RW",
    sunrise: 1673841749,
    sunset: 1673885736,
  },
  timezone: 7200,
  id: 202061,
  name: "Kigali",
  cod: 200,
};

type Weather = typeof weather;

const WeatherComponent = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string | number | ReactNode;
  Icon: ReactNode;
}) => (
  <div className="flex justify-between p-2 border">
    <div className="flex">
      <div className="mr-1">{Icon}</div>
      <label className="text-bash truncate text-sm">{label}</label>
    </div>
    <p className="truncate">{value}</p>
  </div>
);
interface Props extends Farm {
  index: number;
  farmCount: number;
  handleDeletion: () => void;
  handleActive: () => void;
}

export default function FarmOne({
  name,
  isActive,
  isDeleted,
  index,
  farmCount,
  handleActive,
  handleDeletion,
}: Props) {
  const [showModal, setModal] = useState(false);
  const { user } = useContext(StoreContext);
  const [farmWeather, setWeather] = useState<Weather>();

  useEffect(() => {
    const getWeither = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        const API_key = process.env.REACT_APP_API_KEY;
        //
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&metric=celsius&imperial=celsius&appid=${API_key}`
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.cod === 200) setWeather(res);
          });
      });
    };
    if (showModal && !farmWeather) {
      getWeither();
    }
  }, [showModal, farmWeather]);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  if (isDeleted && user && !user.isAdmin) return null;

  const ModalView = farmWeather ? (
    <div className="w-[460px] text-left">
      <AiOutlineArrowLeft
        className="text-borange text-lg cursor-pointer hover:opacity-80"
        onClick={toggleModal}
      />
      <h1 className="text-6xl text-gray-200 absolute top-5 right-3">{index}</h1>
      <h3 className="text-2xl font-semibold text-gray-300 w-7/12 mt-5">
        <span>How's the weather like</span>
        <span className="text-black mx-2">Today</span>
        <span>?</span>
      </h3>
      <p className="text-orange-400 text-2xl mt-5 font-semibold capitalize">
        {farmWeather.weather ? farmWeather.weather[0].description : null}
      </p>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="text-base">{farmWeather.main.temp_max} &#8451;</p>
            <AiOutlineArrowUp className="text-red-500 ml-1" />
          </div>
          <div className="flex items-center ml-2">
            <p className="text-base">{farmWeather.main.temp_min} &#8451;</p>
            <AiOutlineArrowDown className="text-blue-500 ml-1" />
          </div>
        </div>
        <p className="text-base text-bash font-normal">
          {" "}
          {farmWeather.sys.country} / {farmWeather.name}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <WeatherComponent
          label="Feels like"
          value={<>{farmWeather.main.feels_like} &#8451;</>}
          Icon={<BsThermometerHalf className="text-base" />}
        />
        <WeatherComponent
          label="wind"
          value={farmWeather.wind.speed + " mph SSW"}
          Icon={<TbWind className="text-base" />}
        />
        <WeatherComponent
          label="UV index"
          value={farmWeather.wind.speed + " mph SSW"}
          Icon={<BsSun className="text-base" />}
        />
        <WeatherComponent
          label="Precipitation"
          value={farmWeather.main.humidity + " %"}
          Icon={<FiCloudRain className="text-base" />}
        />
      </div>
      <div className="flex justify-between items-center mt-5">
        <Button
          onClick={handleActive}
          text={isActive ? "De-activate" : "Activate"}
          className="bg-whitesmoke text-black border"
        />
        <Button
          disabled={isDeleted}
          onClick={handleDeletion}
          text="Delete"
          className={`${
            isDeleted ? "bg-gray-400" : "bg-bred"
          } text-white ml-5 border border-whitesmoke`}
        />
      </div>
    </div>
  ) : (
    <>
      <AiOutlineArrowLeft
        className="text-borange text-lg cursor-pointer hover:opacity-80"
        onClick={toggleModal}
      />
      <div className="w-96 h-96 flex items-center justify-center">
        <AiOutlineLoading3Quarters className="text-5xl text-borange animate-spin" />
      </div>
    </>
  );

  return (
    <>
      <div
        onClick={toggleModal}
        className="group border-2 relative h-48 p-5 hover:bg-slate-100 cursor-pointer flex flex-col text-left"
      >
        <h1 className="text-5xl text-gray-300">
          {farmCount + 1 - (index + 1)}
        </h1>
        {isDeleted ? (
          <IoMdTrash className="absolute top-5 right-5 text-2xl text-bred" />
        ) : isActive ? (
          <GiFarmTractor className="absolute top-5 right-5 text-2xl text-gray-500" />
        ) : (
          <AiFillLock className="absolute top-5 right-5 text-2xl text-borange" />
        )}
        <h3 className="text-3xl font-bold mt-auto capitalize">{name}</h3>
        <p className="text-base w-full font-light text-gray-500 flex flex-end">
          <span>View</span>
          <span className="hidden group-hover:block transform translate-x-5 text-gray-200">
            &#8594;
          </span>
        </p>
      </div>
      <CustomModal
        visible={showModal}
        toggle={toggleModal}
        children={ModalView}
      />
    </>
  );
}
