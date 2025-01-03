"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ProgressBar } from "@/component/progressBar";

dayjs.extend(duration);

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (time === 0) {
      setIsBreakTime((prev) => !prev); // Toggle isBreakTime state
      setTime(isBreakTime ? 25 * 60 : 5 * 60); // Switch between work and break time
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      setProgress((prevProgress) => {
        let mainTime = isBreakTime ? 5 * 60 : 25 * 60;
        const newProgress = prevProgress + 1 / mainTime;
        return newProgress > 1 ? 0 : newProgress;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time, isBreakTime]);

  useEffect(() => {
    setCycle((prev) => prev + 1);
  }, [isBreakTime]);

  // Format time to mm:ss
  const formattedTime = dayjs.duration(time, "seconds").format("mm:ss");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-3xl font-bold mb-4">
        {isBreakTime ? "Break Time" : "Work Time"}
      </h1>
      <div className="text-lg mb-4">Cycle: {cycle}</div>
      <div className="relative flex items-center justify-center">
        <ProgressBar progress={progress} />
        <div className="absolute text-4xl font-semibold">{formattedTime}</div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
