'use client'

import ArrowWIcon  from '../assets/icons/arrow-w.svg';
import cursorImage from '../assets/images/cursor.png';
import messageImage from '../assets/images/message.png';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const bounceAnimation: Variants = {
  bounce: {
    y: [-20, 0, -20],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse"
    }
  }
};

export const Hero = () => {
  return (
  <div className="bg-black text-white bg-[linear-gradient(to_bottom,#000000,#200d42_34%,#4f21a1_65%,#a46edb_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:h-[768px] sm:w-[1536px] lg:h-[1024px] lg:w-[2470px] rounded-[100%] bg-black blur-[10px] left-1/2 -translate-x-1/2 border-[#b48cde] bg-[radial-gradient(closest-side,#000_82%,#9560eb)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)] lg:top-[calc(100%-160px)]"></div>
    <div className="container relative">
        <div className="flex items-center justify-center">
        <a href="#" className="inline-flex items-center gap-2 border-2 border-white border-opacity-30 px-2 py-1 rounded-lg">
          <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            Version 1.0 is here
            
          </span> 
          <span className="inline-flex items-center gap-1">
          <span className="hidden sm:inline">take control of your assets</span>
          <span className="sm:hidden">
          check it out</span>
          <ArrowWIcon />
        </span>
        </a>
        </div>
        <div className="flex justify-center items-center mt-8">
        <div className="inline-flex relative">
        <h1 className="text-white text-6xl sm:text-7xl font-bold tracking-tighter text-center inline-flex">
          Unique Solutions & <br /> Innovative approach to Tracking
        </h1>
        <motion.div
          drag
          dragSnapToOrigin
          animate="bounce"
          variants={bounceAnimation}
          whileDrag={{ scale: 1.1 }}
          onDragEnd={(event, info) => {
            const element = event.target as HTMLElement;
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = '';
          }}
          className="absolute lg:right-[1010px] lg:top-[20px] sm:right-[690px] sm:top-[140px] hidden lg:inline-block sm:inline-block"
        >
          <Image 
            src={cursorImage} 
            height="200" 
            width="200" 
            alt="cursor" 
            className='max-w-none' 
            draggable={false} 
          />
        </motion.div>
        <motion.div
          drag
          dragSnapToOrigin
          animate="bounce"
          variants={bounceAnimation}
          whileDrag={{ scale: 1.1 }}
          onDragEnd={(event, info) => {
            const element = event.target as HTMLElement;
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = '';
          }}
          className="absolute lg:left-[1030px] lg:top-[56px] sm:left-[700px] sm:top-[-70px] hidden lg:inline-block sm:inline-block"
        >
          <Image 
            src={messageImage} 
            height="200" 
            width="200" 
            alt="message" 
            className='max-w-none' 
            draggable={false} 
          />
        </motion.div>
        </div>
        </div>
        <div className="flex justify-center items-center">
        <p className="text-center text-xl mt-8 max-w-md">Advanced tools for comprehensive email tracking and analysis.
        </p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Link href="/signup">
        <button className="bg-white text-black px-5 py-3 rounded-lg font-medium">Get Started</button>
        </Link> 
        </div>
      </div>
    </div> 
  );
}