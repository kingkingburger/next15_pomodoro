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
    const radius = Math.min(centerX, centerY) * 0.8;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + 2 * Math.PI * progress;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the border (gray circle)
    context.strokeStyle = "white";
    context.lineWidth = 10;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.stroke();

    // Draw the progress arc
    context.strokeStyle = "black";
    context.lineWidth = 10;
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.stroke();
  }, [progress]);

  return <canvas ref={canvasRef} width={500} height={500} />;
};
