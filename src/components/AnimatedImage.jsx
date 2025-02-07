import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import image from "../imgs/gfgscLogo.png";
import Home from "../pages/Home";

const AnimatedImage = () => {
  const imgRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const logoAnimatedRef = useRef(false);
  const textAnimatedRef = useRef(false);

  const [showDiv, setShowDiv] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showHome, setShowHome] = useState(false); // State to track when to show Home

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!logoAnimatedRef.current) {
      logoAnimatedRef.current = true;
      const logoSize = screenWidth < 600 ? "80px" : "200px";

      gsap.fromTo(
        imgRef.current,
        { width: "50px", height: "50px", opacity: 0 },
        {
          width: logoSize,
          height: logoSize,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );

      gsap.to(imgRef.current, {
        x: -Math.min(400, screenWidth / 2 - 100) + "px",
        duration: 1.5,
        delay: 1.5,
        ease: "power2.out",
        onComplete: () => setShowDiv(true),
      });
    }
  }, []);

  useEffect(() => {
    if (showDiv && textRef1.current && !textAnimatedRef.current) {
      textAnimatedRef.current = true;

      const text1 = textRef1.current.textContent;
      textRef1.current.innerHTML = "";
      const characters = text1.split("").map((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;

        if (index < 13) {
          span.style.color = "#138660";
        } else {
          span.style.color = "#002132";
        }

        return span;
      });

      characters.forEach((span) => textRef1.current.appendChild(span));
      const chars1 = textRef1.current.querySelectorAll("span");

      gsap.fromTo(
        chars1,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          onComplete: () => setShowSecondLine(true),
        }
      );
    }
  }, [showDiv]);

  useEffect(() => {
    if (showSecondLine && textRef2.current) {
      const text2 = textRef2.current.textContent;
      textRef2.current.innerHTML = "";
      const characters2 = text2.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.color = "#002132";
        return span;
      });

      characters2.forEach((span) => textRef2.current.appendChild(span));
      const chars2 = textRef2.current.querySelectorAll("span");

      gsap.fromTo(
        chars2,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          onComplete: () => setTimeout(() => setShowHome(true), 500), // After animation, show Home
        }
      );
    }
  }, [showSecondLine]);

  if (showHome) {
    return <Home />; // Render Home page after animation completes
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden relative">
      <img
        ref={imgRef}
        src={image}
        alt="Animated"
        className="absolute"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      />

      {showDiv && (
        <div
          className="absolute"
          style={{
            position: "absolute",
            left: "60%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0)",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
            maxWidth: "90vw",
          }}
        >
          <p
            ref={textRef1}
            style={{
              fontSize: screenWidth < 600 ? "15px" : "60px",
              marginLeft: screenWidth < 600 ? "50px" : "0",
              whiteSpace: "nowrap",
              textAlign: screenWidth < 600 ? "left" : "center",
              overflow: "hidden",
            }}
          >
            GeeksforGeeks Student Chapter
          </p>

          {showSecondLine && (
            <p
              ref={textRef2}
              style={{
                fontSize: screenWidth < 600 ? "15px" : "60px",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              SRMIST Ramapuram
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimatedImage;
