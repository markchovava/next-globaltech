"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
    words: string[];
    speed?: number;
    deleteSpeed?: number;
    delayBetweenWords?: number;
}

export default function Typewriter({
    words,
    speed = 100,
    deleteSpeed = 50,
    delayBetweenWords = 1500,
}: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Wait until the page has fully finished loading before starting the animation
    useEffect(() => {
        if (document.readyState === "complete") {
            setHasLoaded(true);
            return;
        }

        const handleLoad = () => setHasLoaded(true);
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
    }, []);

    useEffect(() => {
        if (!hasLoaded) return;

        const fullText = words[currentWordIndex];
        let timer: NodeJS.Timeout;

        if (!isDeleting) {
            if (currentText.length < fullText.length) {
                timer = setTimeout(() => {
                    setCurrentText(fullText.substring(0, currentText.length + 1));
                }, speed);
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, delayBetweenWords);
            }
        } else {
            if (currentText.length > 0) {
                timer = setTimeout(() => {
                    setCurrentText(fullText.substring(0, currentText.length - 1));
                }, deleteSpeed);
            } else {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        }

        return () => clearTimeout(timer);
    }, [hasLoaded, currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, delayBetweenWords]);

    return (
        <span className="inline-flex items-center">
            {currentText}
            <span className="ml-1 animate-pulse border-r-2 border-current h-9"></span>
        </span>
    );
}