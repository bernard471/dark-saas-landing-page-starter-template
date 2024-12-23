"use client";

import PlusIcon from "../assets/icons/plus.svg";
import { useState } from "react";
import clsx from "clsx";
import MinusIcon from "../assets/icons/minus.svg";
import { AnimatePresence, motion } from "framer-motion";


const items = [
  {
    question: "What is email and phone number tracking, and how does it work?",
    answer:
      "Email and phone number tracking help you monitor interactions with suspicious contacts in real-time. Our system identifies unusual activity patterns and alerts you to potential threats, allowing you to take immediate action.",
  },
  {
    question: "Is it legal to use email and phone tracking?",
    answer:
      "Yes, our services comply with legal and privacy standards. It's important to ensure you have appropriate consent and follow local regulations when using email and phone tracking features.",
  },
  {
    question: "How does fake page detection help protect my data?",
    answer:
      "Fake page detection identifies and warns you about fraudulent websites that imitate legitimate ones to steal personal information. Our system scans and flags such pages so you can avoid phishing attempts and keep your data secure.",
  },
  {
    question: "Is my information kept private and secure?",
    answer:
      "Absolutely. We prioritize your data security with end-to-end encryption and adhere to industry standards to protect your information from unauthorized access.",
  },
];

const AccordionItem = ({question, answer}: {question: string, answer: string}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div key={question} className="border-b border-white/30 py-7" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center justify-between">
        <span className="flex-1 text-xl font-bold">{question}</span> 
        <PlusIcon className={clsx({hidden: isOpen,})} />
        <MinusIcon className={clsx({hidden: !isOpen,})} />
      </div>
      <AnimatePresence>
      {isOpen && (
      <motion.div 
      initial={{
        opacity: 0,
        height: 0,
        marginTop: 0
      }}
      animate={{
        opacity: 1,
        height: "auto",
        marginTop: "16px"
      }}
      exit={{
        opacity: 0,
        height: 0,
        marginTop: 0
      }}>
        <p className="text-white/70">{answer}</p>
      </motion.div>
      )}
    </AnimatePresence>
    </div> 
  );
};

export const FAQs = () => {
  return (
    <div className="bg-gradient-to-b from-[#5d2ca8] to-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl sm:text-6xl sm:max-w-[700px] mx-auto font-bold tracking-tighter">Frequently Asked Questions</h2>
        <div className="mt-12 max-w-[700px] mx-auto">
          {items.map(({question, answer}) => (
           <AccordionItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};
