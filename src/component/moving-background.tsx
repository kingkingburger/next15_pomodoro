"use client";

import React, { useRef, useEffect } from 'react';

interface Planet {
  img: HTMLImageElement;
  x: number;
  y: number;
  speed: number;
}

export const MovingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 배경 이미지 로드
    const bg = new Image();
    bg.src = '/images/parallax-space-background.png'; // public/images/background.png 에 배치했다고 가정

    // 행성들 이미지 로드
    const earth = new Image();
    earth.src = '/images/parallax-space-big-planet.png';
    const saturn = new Image();
    saturn.src = '/images/parallax-space-far-planets.png';
    const moon = new Image();
    moon.src = '/images/parallax-space-ring-planet.png';

    // 행성 정보를 담은 배열
    const planets: Planet[] = [
      { img: earth, x: 0, y: 50, speed: 0.5 },
      { img: saturn, x: 100, y: 200, speed: 0.3 },
      { img: moon, x: 300, y: 400, speed: 0.7 },
    ];

    // 애니메이션 함수
    const animate = () => {
      if (!canvas || !ctx) return;

      // 캔버스 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경 그리기
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      // 각 행성 이동 후 그리기
      planets.forEach((planet) => {
        planet.x += planet.speed;
        // 화면 밖으로 나가면 다시 왼쪽으로
        if (planet.x > canvas.width) {
          planet.x = -100; // 행성 이미지 폭만큼 여유를 줘서 밖에서 등장하도록
        }
        ctx.drawImage(planet.img, planet.x, planet.y);
      });

      // 다음 프레임 요청
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // 이미지가 모두 로드된 뒤에 애니메이션 시작
    const handleAllLoaded = () => {
      if (bg.complete && earth.complete && saturn.complete && moon.complete) {
        animate();
      }
    };

    bg.onload = handleAllLoaded;
    earth.onload = handleAllLoaded;
    saturn.onload = handleAllLoaded;
    moon.onload = handleAllLoaded;

    // 클린업
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

//   useEffect(() => {
//   const canvas = canvasRef.current;
//   if (!canvas) return;
//   const ctx = canvas.getContext('2d');
//   if (!ctx) return;
//
//   // 디버깅용 사각형
//   ctx.fillStyle = 'red';
//   ctx.fillRect(10, 10, 50, 50);
// }, []);

  return (
    <div id="game">
      <canvas ref={canvasRef} width={1270} height={800} />
    </div>
  );
};

export default MovingBackground;
