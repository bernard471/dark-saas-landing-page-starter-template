'use client';

import appScreen from "../assets/images/productscreen.png";
import Image from "next/image";
import { motion, useScroll, useTransform  }  from "framer-motion";
import { useRef } from "react";


export const ProductShowcase = () => {
  const appImage = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: [
      "start end",
      "end end"
    ]
  });


  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [.5, 1]);
  return (
    <div className="bg-black text-white bg-gradient-to-b from-black to-[#5d2ca8] py-[72px] sm:py-24">
      <div className="container">


        <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">Intuitive Interface</h2>
        <p className="max-w-xl mx-auto mt-5 text-center text-xl text-white/70">Leverage the full potential of our robust tracking system to gain a competitive edge. Whether you are monitoring phone numbers or emails, our platform gives you the tools you need to stay ahead, make informed decisions, and secure your assets with ease.</p>
        
        <motion.div
          style={{
            opacity: opacity,
            rotateX: rotateX,
            transformPerspective: "800px"
          }}
        >
          <Image src={appScreen} alt="app-screen" className="mt-14 rounded-xl" ref={appImage}/>
        </motion.div>
      </div>
    </div>
  );
};
