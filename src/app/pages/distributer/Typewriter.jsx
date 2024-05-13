"use client";
import React from "react";
import TypeWriter from "typewriter-effect";

export default function Typewriter({ manufacturerName }) {
    return (
        <TypeWriter
            options={{
                strings: [`Hello ${manufacturerName} Welcome Back !`],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 2,
                onInit: (typewriter) => {
                    typewriter
                        .callFunction(() => {
                            console.log("Typewriter initialized");
                        })
                        .start();
                },
            }}
        />
    );
}
