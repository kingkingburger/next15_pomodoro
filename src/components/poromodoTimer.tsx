"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ProgressBar } from "@/components/progressBar";

dayjs.extend(duration);

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // 타이머가 일시정지 상태라면 setInterval을 실행하지 않아요
    if (isPaused) return;

    if (time === 0) {
      setIsBreakTime((prev) => !prev);
      // 다음 모드로 넘어갈 때, 해당 모드의 시간과 진행률을 초기화해요
      setTime(isBreakTime ? 25 * 60 : 5 * 60);
      setProgress(0);
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      setProgress((prevProgress) => {
        const mainTime = isBreakTime ? 5 * 60 : 25 * 60;
        const newProgress = prevProgress + 1 / mainTime;
        return newProgress > 1 ? 0 : newProgress;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time, isBreakTime, isPaused]);

  // mm:ss 포맷으로 시간 표시
  const formattedTime = dayjs.duration(time, "seconds").format("mm:ss");

  // Pause 버튼 핸들러
  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Reset 버튼 핸들러
  const handleReset = () => {
    setIsBreakTime(false);
    setTime(25 * 60);
    setProgress(0);
    setIsPaused(false);
  };

  // Skip 버튼 핸들러
  const handleSkip = () => {
    setIsBreakTime((prev) => !prev);
    if (isBreakTime) {
      // 휴식 중이었다면, 다음은 작업 시간
      setTime(25 * 60);
    } else {
      // 작업 중이었다면, 다음은 휴식 시간
      setTime(5 * 60);
    }
    setProgress(0);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      {/* 중앙 정렬을 위한 컨테이너 */}
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* formattedTime 텍스트 */}
        <div className="text-6xl md:text-8xl font-bold">{formattedTime}</div>

        {/* ProgressBar */}
        <div className="w-80 h-80 md:w-96 md:h-96">
          <ProgressBar progress={progress} />
        </div>

        {/* 버튼들 */}
        <div className="flex space-x-4 text-2xl">
          {/* Pause 버튼 */}
          <button
            onClick={handlePause}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 transition-colors rounded"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          {/* Reset 버튼 */}
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 transition-colors rounded"
          >
            Reset
          </button>
          {/* Skip 버튼 */}
          <button
            onClick={handleSkip}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors rounded"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
