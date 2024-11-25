"use client"
import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

import { useRef } from "react";
import { FiLock } from "react-icons/fi";


const DragCloseDrawerExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid place-content-center">
      <button
        onClick={() => setOpen(true)}
      >
                      <EncryptButton />

      </button>

      <DragCloseDrawer open={open} setOpen={setOpen}>
  <div className="mx-auto max-w-2xl space-y-4 text-neutral-400 flex flex-col items-start justify-start">
    <h2 className="text-4xl font-bold text-neutral-200">
      Privacy Policy for Security Cell
    </h2>
    <p>
      Welcome to Security Cell, a platform dedicated to testing website
      vulnerabilities and enhancing online security. Your privacy and trust are
      of utmost importance to us. This policy outlines how we handle data,
      ensure confidentiality, and protect your rights when you use our services.
    </p>
    <h3 className="text-2xl font-semibold text-neutral-200">1. Data Collection</h3>
    <p className="flex flex-col items-start justify-start">
      When you use our services, we may collect information such as:
      <ul className="list-disc ml-6 flex flex-col items-start justify-start">
        <li>URLs and domains you submit for testing.</li>
        <li>IP addresses and other metadata for security analysis.</li>
        <li>
          Diagnostic and performance data to enhance our testing algorithms.
        </li>
      </ul>
      We do not collect personal data unless it is explicitly required for
      troubleshooting or user support.
    </p>
    <h3 className="text-2xl font-semibold text-neutral-200">2. Use of Data</h3>
    <p className="flex flex-col items-start justify-start">
      The data you provide is used solely for:
      <ul className="list-disc ml-6 flex flex-col items-start justify-start">
        <li>Vulnerability testing and reporting.</li>
        <li>Improving the accuracy and effectiveness of our tools.</li>
        <li>
          Ensuring compliance with security standards and best practices.
        </li>
      </ul>
    </p>
    <h3 className="text-2xl font-semibold text-neutral-200">3. Data Confidentiality</h3>
    <p className="flex flex-col items-start justify-start">
      We ensure that all data submitted is treated as confidential. Test
      results and related data are not shared with third parties unless
      explicitly requested by the user or required by law.
    </p>
    <h3 className="text-2xl font-semibold text-neutral-200">4. Security Practices</h3>
    <p className="flex flex-col items-start justify-start">
      We employ state-of-the-art security measures to safeguard your data,
      including:
      <ul className="list-disc ml-6 flex flex-col items-start justify-start">
        <li>Encryption of sensitive information.</li>
        <li>Strict access controls for our systems and data.</li>
        <li>Regular audits to detect and mitigate potential risks.</li>
      </ul>
    </p>
    <h3 className="text-2xl font-semibold text-neutral-200">5. User Rights</h3>
    <p className="flex flex-col items-start justify-start">
      As a user, you have the right to:
      <ul className="list-disc ml-6 flex flex-col items-start justify-start">
        <li>Request access to data collected during testing.</li>
        <li>Request the deletion of submitted URLs or test data.</li>
        <li>Contact us with any privacy concerns or questions.</li>
      </ul>
    </p>
    <h3 className="text-2xl font-semibold text-neutral-200">
      6. Policy Updates
    </h3>
    <p className="flex flex-col items-start justify-start">
      This privacy policy may be updated periodically to reflect changes in our
      practices or legal requirements. We encourage you to review it
      regularly.
    </p>
    <h3 className="text-2xl font-semibold text-neutral-200 ">7. Contact Us</h3>
    <p>
      If you have any questions or concerns about this privacy policy or our
      services, please contact us at{" "}
      <a href="mailto:support@securitycell.com" className="text-white font-bold">
        support@securitycell.com
      </a>
      .
    </p>
  </div>
</DragCloseDrawer>

    </div>
  );
};

const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};






export default DragCloseDrawerExample;




const TARGET_TEXT = "Privacy Policy";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = () => {
  const intervalRef = useRef(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      style={{width: '172px'}}
      className="group relative overflow-hidden rounded-lg border-[1px]  border-neutral-500  px-4 py-2 font-Urbanist font-medium uppercase text-gray-600 transition-colors "
    >
      <div className="relative z-10 flex items-center gap-2">
        <FiLock />
        <span className="text-xs font-Urbanist">{text}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-green-400/0 from-40% via-green-400/100 to-green-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};