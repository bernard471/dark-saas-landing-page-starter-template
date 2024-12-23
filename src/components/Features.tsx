'use client';

import EmailTrackingIcon from "../assets/icons/emailTracking.svg";
import MailIcon from "../assets/icons/mail.svg";
import PhoneTrackingIcon from "../assets/icons/phoneNumberTracking.svg";
import FakePageDetectionIcon from "../assets/icons/FakePageDetection.svg";
import { motion } from "framer-motion";

const features = [
  {
    title: "E-mail Tracking",
    description:
      "Effortlessly track and manage suspicious emails in real-time.",
    icons: [MailIcon, EmailTrackingIcon]
  },
  {
    title: "Phone Number Tracking",
    description:
      "Take phone number tracking to a different level by monitoring and overseeing suspicious phone numbers in real time.",
    icons: [PhoneTrackingIcon, EmailTrackingIcon]
  },
  {
    title: "Fake Page Detection",
    description:
      "Detect and monitor fake pages in real-time to protect your brand and reputation.",
    icons: [FakePageDetectionIcon]
  },
];

export const Features = () => {
  return (
    <section id = "features">
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">Explore Our Solutions</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center text-xl mt-5 text-white/70">Easily select and monitor the phone numbers, emails or fake pages that look suspicious to you. 
            Our versatile tool allows you to track multiple asset types with precision, 
            ensuring you stay informed and in control of your communications and contacts.</p>
        </div>
        <div className="mt-16 flex flex-col sm:grid sm:grid-cols-3 gap-4">
          {features.map(({ title, description, icons }) => (
            <motion.div 
              key={title} 
              className="border border-white/30 rounded-xl py-10 text-center sm:flex-1"
              whileHover={{ borderColor: "#a46edb", borderWidth: "4px", scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.5, 
 
              }}
              layout
            >
              <div className="inline-flex h-14 w-14 bg-[linear-gradient(180deg,#200d42_34%,#4f21a1_65%,#a46edb_82%)] text-white text-transparent justify-center items-center rounded-xl gap-1">
                {icons.map((Icon, index) => (
                  <Icon key={index} />
                ))}
              </div>  
              <h3 className="mt-6 font-bold">{title}</h3>
              <p className="mt-2 px-4 text-white/70">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>  
    </section>
  );
};
