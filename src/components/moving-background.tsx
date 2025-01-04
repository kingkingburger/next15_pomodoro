"use client";

import React, { useRef, useEffect } from "react";

interface Planet {
  img: HTMLImageElement;
  x: number;
  y: number;
  speed: number;
  scale: number;
}

export const MovingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 사이즈를 창 크기에 맞춰 설정하는 함수
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 초기 캔버스 크기 설정 + 리사이즈 이벤트 등록
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // 배경 이미지 로드
    const bg = new Image();
    bg.src = "/images/parallax-space-background.png";

    // 행성들 이미지 로드
    const earth = new Image();
    earth.src = "/images/parallax-space-big-planet.png";
    const saturn = new Image();
    saturn.src = "/images/parallax-space-far-planets.png";
    const moon = new Image();
    moon.src = "/images/parallax-space-ring-planet.png";
    const star = new Image();
    star.src = "/images/parallax-space-stars.png";

    // 행성 정보를 담은 배열
    const planets: Planet[] = [
      { img: earth, x: 300, y: 80, speed: 0.6, scale: 0.4 },
      { img: saturn, x: 600, y: 200, speed: 0.4, scale: 0.3 },
      { img: moon, x: 900, y: 320, speed: 0.5, scale: 0.3 },
      { img: star, x: 1200, y: 100, speed: 0.4, scale: 0.5 },
    ];

    const animate = () => {
      if (!canvas || !ctx) return;

      // 캔버스 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경 그리기
      ctx.drawImage(bg, 0, 0, canvas.width * 1.2, canvas.height * 1.2);

      // 각 행성 이동 후 그리기
      planets.forEach((planet) => {
        planet.x -= planet.speed;
        const planetWidth = planet.img.width * planet.scale;
        const planetHeight = planet.img.height * planet.scale;

        // 왼쪽 화면 밖으로 나가면 오른쪽 끝에서 재등장
        if (planet.x + planetWidth < 0) {
          planet.x = canvas.width + 100;
        }

        ctx.drawImage(
          planet.img,
          planet.x,
          planet.y,
          planetWidth,
          planetHeight,
        );
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    let loadedCount = 0;
    const totalImages = 5; // bg 포함

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        animate();
      }
    };

    // 이미지 로드 핸들러 등록
    bg.onload = handleImageLoad;
    earth.onload = handleImageLoad;
    saturn.onload = handleImageLoad;
    moon.onload = handleImageLoad;
    star.onload = handleImageLoad;

    // 클린업
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MovingBackground;
