import { ReactNode } from "react";

interface HeroProps {
  children: ReactNode;
}

export default function Hero({ children }: HeroProps) {
  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden bg-black -mt-[4rem]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75 transition-opacity duration-300 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/70 after:to-black/40"
        style={{
          backgroundImage: 'url("/eyes-bg.jpg")'
        }}
      />
      <div className="relative h-full min-h-[80vh] flex flex-col justify-center items-center px-6 md:px-8 lg:px-12 text-white/90 drop-shadow-lg">

        {children}
      </div>
    </div>
  );
}