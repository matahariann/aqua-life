import React, { useState } from "react";
import { Fish, Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast, Toaster } from "sonner";

export default function Registrasi() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
        // Clear error saat user mulai mengetik
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        setProcessing(true);

        router.post("/actionRegister", data, {
            onSuccess: () => {
                router.visit("/login", {
                    onFinish: () => {
                        // Notifikasi muncul setelah berpindah ke halaman login
                        toast.success("Registrasi Berhasil!", {
                            description: "Silahkan login ke dalam AquaLife.",
                        });
                    },
                });
            },
            onError: (errors) => {
                setErrors(errors);
                toast.error("Gagal Registrasi", {
                    description: "Mohon periksa kembali form Anda.",
                });
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !processing) {
            handleSubmit();
        }
    };

    return (
        <>
            <Toaster className="mt-[60px] md:mt-0" position="top-center" expand={true} richColors />
            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated Wave Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <svg
                        className="absolute bottom-0 left-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 800"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="rgba(255,255,255,0.05)"
                            d="M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z"
                        >
                            <animate
                                attributeName="d"
                                dur="10s"
                                repeatCount="indefinite"
                                values="
                                    M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z;
                                    M0,400 Q360,500 720,400 T1440,400 L1440,800 L0,800 Z;
                                    M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z
                                "
                            />
                        </path>
                        <path
                            fill="rgba(255,255,255,0.05)"
                            d="M0,450 Q360,350 720,450 T1440,450 L1440,800 L0,800 Z"
                        >
                            <animate
                                attributeName="d"
                                dur="15s"
                                repeatCount="indefinite"
                                values="
                                    M0,450 Q360,350 720,450 T1440,450 L1440,800 L0,800 Z;
                                    M0,450 Q360,550 720,450 T1440,450 L1440,800 L0,800 Z;
                                    M0,450 Q360,350 720,450 T1440,450 L1440,800 L0,800 Z
                                "
                            />
                        </path>
                        <path
                            fill="rgba(255,255,255,0.08)"
                            d="M0,500 Q360,400 720,500 T1440,500 L1440,800 L0,800 Z"
                        >
                            <animate
                                attributeName="d"
                                dur="20s"
                                repeatCount="indefinite"
                                values="
                                    M0,500 Q360,400 720,500 T1440,500 L1440,800 L0,800 Z;
                                    M0,500 Q360,600 720,500 T1440,500 L1440,800 L0,800 Z;
                                    M0,500 Q360,400 720,500 T1440,500 L1440,800 L0,800 Z
                                "
                            />
                        </path>
                    </svg>

                    {/* Floating Bubbles */}
                    <div
                        className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-bounce"
                        style={{
                            animationDuration: "3s",
                            animationDelay: "0s",
                        }}
                    ></div>
                    <div
                        className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-full animate-bounce"
                        style={{
                            animationDuration: "4s",
                            animationDelay: "1s",
                        }}
                    ></div>
                    <div
                        className="absolute bottom-40 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-bounce"
                        style={{
                            animationDuration: "5s",
                            animationDelay: "2s",
                        }}
                    ></div>
                    <div
                        className="absolute top-1/3 right-1/4 w-14 h-14 bg-white/10 rounded-full animate-bounce"
                        style={{
                            animationDuration: "4.5s",
                            animationDelay: "1.5s",
                        }}
                    ></div>
                    <div
                        className="absolute bottom-20 right-10 w-10 h-10 bg-white/10 rounded-full animate-bounce"
                        style={{
                            animationDuration: "3.5s",
                            animationDelay: "0.5s",
                        }}
                    ></div>

                    {/* Glowing Orbs */}
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-400/20 rounded-full filter blur-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>

                    {/* Fish Icons Floating */}
                    <div
                        className="absolute top-1/4 left-10 opacity-20 animate-bounce"
                        style={{ animationDuration: "6s" }}
                    >
                        <Fish className="w-8 h-8 text-white transform rotate-45" />
                    </div>
                    <div
                        className="absolute bottom-1/3 right-20 opacity-20 animate-bounce"
                        style={{
                            animationDuration: "7s",
                            animationDelay: "1s",
                        }}
                    >
                        <Fish className="w-10 h-10 text-white transform -rotate-12" />
                    </div>
                    <div
                        className="absolute top-1/2 right-1/4 opacity-20 animate-bounce"
                        style={{
                            animationDuration: "8s",
                            animationDelay: "2s",
                        }}
                    >
                        <Fish className="w-6 h-6 text-white transform rotate-90" />
                    </div>
                </div>

                <div className="w-full max-w-4xl relative z-10">
                    {/* Glassmorphism Registration Card */}
                    <div className="bg-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
                        {/* Gradient Top Border */}
                        <div className="h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400"></div>

                        {/* Header Section */}
                        <div className="px-8 py-10 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

                            {/* Logo */}
                            <div className="mb-6 flex justify-center relative z-10">
                                <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/40 transform hover:scale-110 transition-transform duration-300">
                                    <img
                                        src="Logo.png"
                                        alt="Logo"
                                        className="w-14 h-14"
                                    />
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-2 relative z-10 drop-shadow-lg">
                                Buat Akun Baru
                            </h1>
                            <p className="text-white/90 text-sm relative z-10 drop-shadow-md">
                                Bergabunglah dengan AquaLife sekarang
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="px-8 py-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-white mb-2 drop-shadow-lg"
                                    >
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-white/80" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                handleChange(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={handleKeyPress}
                                            className={`w-full pl-12 pr-4 py-3 bg-white/30 backdrop-blur-md border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-white/60 font-medium ${
                                                errors.name
                                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300/50"
                                                    : "border-white/40 focus:border-white/60 focus:ring-white/30"
                                            }`}
                                            placeholder="Nama Anda"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-100 flex items-center drop-shadow-lg bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-red-300/30">
                                            <svg
                                                className="w-4 h-4 mr-1.5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-white mb-2 drop-shadow-lg"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-white/80" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                handleChange(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={handleKeyPress}
                                            className={`w-full pl-12 pr-4 py-3 bg-white/30 backdrop-blur-md border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-white/60 font-medium ${
                                                errors.email
                                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300/50"
                                                    : "border-white/40 focus:border-white/60 focus:ring-white/30"
                                            }`}
                                            placeholder="nama@email.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-100 flex items-center drop-shadow-lg bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-red-300/30">
                                            <svg
                                                className="w-4 h-4 mr-1.5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-white mb-2 drop-shadow-lg"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-white/80" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={data.password}
                                            onChange={(e) =>
                                                handleChange(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={handleKeyPress}
                                            className={`w-full pl-12 pr-12 py-3 bg-white/30 backdrop-blur-md border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-white/60 font-medium ${
                                                errors.password
                                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300/50"
                                                    : "border-white/40 focus:border-white/60 focus:ring-white/30"
                                            }`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/80 hover:text-white transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-100 flex items-center drop-shadow-lg bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-red-300/30">
                                            <svg
                                                className="w-4 h-4 mr-1.5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password Input */}
                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-semibold text-white mb-2 drop-shadow-lg"
                                    >
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-white/80" />
                                        </div>
                                        <input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                handleChange(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={handleKeyPress}
                                            className={`w-full pl-12 pr-12 py-3 bg-white/30 backdrop-blur-md border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-white/60 font-medium ${
                                                errors.password_confirmation
                                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300/50"
                                                    : "border-white/40 focus:border-white/60 focus:ring-white/30"
                                            }`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/80 hover:text-white transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="mt-2 text-sm text-red-100 flex items-center drop-shadow-lg bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-red-300/30">
                                            <svg
                                                className="w-4 h-4 mr-1.5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:from-blue-700 hover:via-cyan-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center relative overflow-hidden group border border-white/20"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative z-10">
                                                Daftar Sekarang
                                            </span>
                                            <ArrowRight className="ml-2 w-5 h-5 relative z-10" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Additional Links */}
                            <div className="text-center pt-4">
                                <p className="text-sm text-white/90 drop-shadow">
                                    Sudah punya akun?{" "}
                                    <a
                                        href="/login"
                                        className="text-white font-semibold hover:text-white/80 transition-colors underline decoration-2 underline-offset-2"
                                    >
                                        Masuk Sekarang
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Bottom Decorative */}
                        <div className="h-3 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
                    </div>
                </div>
            </div>
        </>
    );
}


