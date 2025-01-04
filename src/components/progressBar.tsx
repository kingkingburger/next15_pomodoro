import React, { useEffect, useRef } from "react";

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9; // 캔버스 크기에 맞춰 반지름 설정
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + 2 * Math.PI * progress;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // 배경 원 (회색)
    context.strokeStyle = "gray";
    context.lineWidth = 10;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.stroke();

    // 진행 원 (흰색)
    context.strokeStyle = "white";
    context.lineWidth = 10;
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.stroke();
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="w-full h-full"
    />
  );
};
