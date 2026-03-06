import React from "react";
import { FaCheck } from "react-icons/fa";

export default function StepIndicator({ currentStep, steps }) {
    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div className={`flex flex-col items-center relative`}>
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 z-10
                            ${index + 1 <= currentStep 
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg scale-110" 
                                : "bg-gray-300 text-gray-500"}`}
                        >
                            {index + 1 < currentStep ? <FaCheck /> : index + 1}
                        </div>
                        <div className="absolute top-12 whitespace-nowrap text-xs font-semibold text-gray-600">
                            {step.title}
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`w-12 sm:w-24 h-1 transition-all duration-300 mx-2
                            ${index + 1 < currentStep ? "bg-cyan-500" : "bg-gray-300"}`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
}
