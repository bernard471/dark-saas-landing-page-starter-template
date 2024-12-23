'use client'

import helixImage from "../assets/images/helix2.png";
import emojiStarImage from "../assets/images/emojistar.png";
import Image from "next/image";
import { motion, Variants } from 'framer-motion';

const bounceAnimation: Variants = {
  animate: {
    y: [-20, 0, -20],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse"
    }
  }
};

export const CallToAction = () => {
  return (
    <div className="bg-black text-center text-white py-[72px] sm:py-24">
      <div className="container max-w-xl relative">
        <motion.div
          animate="animate"
          variants={bounceAnimation}
          className="absolute top-6 left-[calc(100%+36px)]"
        >
          <Image 
            src={helixImage} 
            alt="Helix" 
            draggable={false}
            className="max-w-none"
          />
        </motion.div>
        <motion.div
          animate="animate"
          variants={bounceAnimation}
          className="absolute -top-[50px] right-[calc(100%+24px)]"
        >
          <Image 
            src={emojiStarImage} 
            alt="Emoji Star" 
            draggable={false}
            className="max-w-none"
          />
        </motion.div>
        <h2 className="text-center text-5xl sm:text-6xl sm:max-w-[700px] mx-auto font-bold tracking-tighter">Ready to get started?</h2>
        <p className="text-center text-white/70 mt-5">Our platform offers seamless setup and powerful tools to help you manage your assets with ease and precision.</p>
        <form className="mt-12 flex flex-col gap-3 max-w-[500px] mx-auto">
          <input type="email" placeholder="your@email.com" className="h-12 w-full px-5 rounded-lg bg-white/20 text-white placeholder:text-[#9ca3af]" />
          <button type="submit" className="h-12 w-full rounded-lg bg-white text-black">Get a demo</button>
        </form> 
      </div>
    </div>
  );
};