import React, { useState, useEffect } from 'react';

export function TextScramble({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    let iteration = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iteration) {
          return text[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      }).join(""));
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}
