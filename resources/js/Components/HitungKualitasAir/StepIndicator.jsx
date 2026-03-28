import React from "react";
import { FaCheck } from "react-icons/fa";

export default function StepIndicator({ currentStep, steps }) {
    // Mencegah error jika currentStep melampaui total step
    const activeIndex = Math.min(Math.max(currentStep - 1, 0), steps.length - 1);

    return (
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-12 w-full">
            <div className="flex items-center justify-center w-full px-1 sm:px-4">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                        <div className={`flex flex-col items-center relative`}>
                            <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white transition-all duration-300 z-10
                                ${index + 1 <= currentStep 
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg scale-110" 
                                    : "bg-gray-300 text-gray-500"}`}
                            >
                                {index + 1 < currentStep ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
                            </div>
                            
                            {/* Mode Desktop/Tablet: Menampilkan label secara vertikal di bawah nomor */}
                            <div className="absolute top-10 sm:top-12 sm:whitespace-nowrap text-[10px] sm:text-xs font-semibold text-gray-600 hidden sm:block">
                                {step.title}
                            </div>
                        </div>

                        {/* Garis Penghubung antar step */}
                        {index < steps.length - 1 && (
                            <div
                                className={`w-10 sm:w-16 md:w-24 h-1 transition-all duration-300 mx-1 sm:mx-2
                                ${index + 1 < currentStep ? "bg-cyan-500" : "bg-gray-300"}`}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
