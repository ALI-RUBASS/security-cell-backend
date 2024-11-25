import React, { useEffect, useRef, useState } from "react";
import Typist from "react-typist";

function SourceCode({ updates }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks which message to animate
  const [typedUpdates, setTypedUpdates] = useState([]); // Stores completed messages
  const [currentUpdate, setCurrentUpdate] = useState(""); // Current animated message
  const containerRef = useRef(null); // Ref for the code container

  useEffect(() => {
    if (currentIndex < updates.length) {
      // Start animating the current message
      setCurrentUpdate(updates[currentIndex]);
    }
  }, [currentIndex, updates]);

  useEffect(() => {
    // Scroll to the bottom when a new update is added
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [typedUpdates, currentUpdate]);

  const handleTypingDone = () => {
    // Add the current message to typedUpdates and move to the next
    setTypedUpdates((prev) => [...prev, currentUpdate]);
    setCurrentIndex((prev) => prev + 1);
    setCurrentUpdate(""); // Clear the current animated message
  };

  const codeStyle = {
    fontFamily: "Fira Code, monospace",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    maxHeight: "700px", // Set a maximum height for the code area
    overflowY: "auto", // Add vertical scrolling when content exceeds maxHeight
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full w-full bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
        <div id="header-buttons" className="py-3 px-4 flex items-center">
          <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
          <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
          <div className="rounded-full w-3 h-3 bg-green-500"></div>
        </div>
        <div
          id="code-area"
          ref={containerRef} // Attach the ref to the container
          className="py-4 px-4 mt-1 text-white text-xl code-area"
          style={codeStyle}
        >
          {/* Render already-typed messages */}
          {typedUpdates.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.includes("detected")
                  ? "text-red-500"
                  : "text-white"
              }`}
            >
              {message}
            </div>
          ))}
          {/* Animate the current message */}
          {currentUpdate && (
            <Typist
              key={currentIndex}
              avgTypingDelay={0}
              cursor={{ hideWhenDone: true }}
              onTypingDone={handleTypingDone}
            >
              <div
                className={`mb-2 ${
                  currentUpdate.includes("Potential XSS vulnerability detected")
                    ? "text-red-500"
                    : "text-white"
                }`}
              >
                {currentUpdate}
              </div>
            </Typist>
          )}
        </div>
      </div>
    </div>
  );
}

export default SourceCode;
