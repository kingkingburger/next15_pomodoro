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

    // 행성 정보를 담은 배열 (초기 위치와 스케일 추가)
    const planets: Planet[] = [
      { img: earth,  x: 300, y:  80,  speed: 0.6, scale: 0.3 },
      { img: saturn, x: 600, y: 200,  speed: 0.4, scale: 0.3 },
      { img: moon,   x: 900, y: 320,  speed: 0.5, scale: 0.3 },
      { img: star,   x: 1200, y: 100, speed: 0.7, scale: 0.3 },
    ];

    // 겹치지 않도록 y 위치를 랜덤 혹은 고정 간격으로 다시 배치하고 싶다면 여기서 로직 수정
    planets.forEach((planet, idx) => {
      planet.y = 100 + idx * 120;
      // 원하는 식으로 조정
    });

    const animate = () => {
      if (!canvas || !ctx) return;

      // 캔버스 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경 그리기
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      // 각 행성 이동 후 그리기
      planets.forEach((planet) => {
        planet.x -= planet.speed;

        // 행성이 왼쪽 화면 밖으로 완전히 벗어났다면
        // 오른쪽 바깥으로 새 위치를 지정
        const planetWidth = planet.img.width * planet.scale;
        if (planet.x + planetWidth < 0) {
          planet.x = canvas.width + 100;
          // 행성이 다시 들어올 때마다 높이도 살짝 랜덤 배치하기 위함
          planet.y = Math.random() * (canvas.height - planet.img.height * planet.scale);
        }

        // 행성 크기 적용해 그리기
        const planetHeight = planet.img.height * planet.scale;
        ctx.drawImage(planet.img, planet.x, planet.y, planetWidth, planetHeight);
      });

      // 다음 프레임 요청
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // 이미지가 모두 로드된 뒤에 애니메이션 시작
    let loadedCount = 0;
    const totalImages = planets.length + 1; // bg 포함 이미지 5개

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        animate();
      }
    };

    bg.onload = handleImageLoad;
    earth.onload = handleImageLoad;
    saturn.onload = handleImageLoad;
    moon.onload = handleImageLoad;
    star.onload = handleImageLoad;

    // 클린업
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
      <div className="flex fixed w-screen h-screen">
        <canvas
            ref={canvasRef}
            width={1912}
            height={928}
        />
      </div>
  );
};

export default MovingBackground;
