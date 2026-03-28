import React from "react";
import { TbLogout } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import ModalStyles from "./ModalStyles";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Glassmorphism Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-md transition-all duration-500"
                onClick={onClose}
            >
                {/* Animated Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            {/* Glass Modal */}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full transform transition-all animate-modal-appear overflow-hidden border border-white/30">
                {/* Gradient Top Border */}
                <div className="h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 shadow-lg"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 group z-10 border border-white/40 hover:border-white/60 shadow-lg"
                    aria-label="Close"
                >
                    <IoClose className="text-xl text-white group-hover:text-white group-hover:rotate-90 transition-all duration-300 drop-shadow-lg" />
                </button>

                {/* Content */}
                <div className="p-6 pt-8 md:p-10 md:pt-12 text-center">
                    {/* Animated Icon Container with Glassmorphism */}
                    <div className="relative mx-auto w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8">
                        {/* Outer Glow Rings */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse-slow"></div>
                        <div className="absolute inset-2 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-lg animate-pulse-slower"></div>

                        {/* Glass Circle */}
                        <div className="absolute inset-3 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-icon-float border-4 border-white/30">
                            <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm"></div>
                            <RiLogoutCircleLine className="text-white text-4xl md:text-5xl relative z-10 drop-shadow-lg" />
                        </div>

                        {/* Rotating Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-300/40 animate-spin-slow"></div>
                    </div>

                    {/* Title with Gradient */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                        Konfirmasi Logout
                    </h3>

                    {/* Description */}
                    <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 md:mb-10 px-4 drop-shadow-md">
                        Apakah Anda yakin ingin keluar dari aplikasi?
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-semibold py-3 px-4 md:py-4 md:px-6 rounded-xl text-sm md:text-base hover:bg-white/30 hover:border-white/60 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white font-semibold py-3 px-4 md:py-4 md:px-6 rounded-xl text-sm md:text-base hover:from-blue-700 hover:via-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group border border-white/20"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Ya, Logout
                                <TbLogout className="text-lg" />
                            </span>
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-400/0 via-cyan-400/20 to-emerald-400/0 blur-xl transition-opacity duration-500"></div>
                        </button>
                    </div>
                </div>

                {/* Bottom Decorative Pattern */}
                <div className="relative h-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
            </div>

            <ModalStyles />
        </div>
    );
};

export default LogoutModal;
