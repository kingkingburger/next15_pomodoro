import MovingBackground from "@/component/moving-background";
import PomodoroTimer from "@/component/poromodoTimer";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <MovingBackground />
      </div>

      <div className="flex items-center justify-center w-full h-full">
        <PomodoroTimer />
      </div>
    </div>
  );
}
