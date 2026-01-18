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
            <Toaster position="top-center" richColors />
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
                    {/* Registration Card */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                        {/* Header Section */}
                        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 px-8 py-12 text-center relative overflow-hidden">
                            {/* Decorative Wave Background */}
                            <div className="absolute inset-0 opacity-10">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 400 200"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="#ffffff" opacity="0.3">
                                        <animate
                                            attributeName="d"
                                            dur="8s"
                                            repeatCount="indefinite"
                                            values="
                                                M0,80 Q100,60 200,80 T400,80 L400,200 L0,200 Z;
                                                M0,80 Q100,100 200,80 T400,80 L400,200 L0,200 Z;
                                                M0,80 Q100,60 200,80 T400,80 L400,200 L0,200 Z
                                            "
                                        />
                                    </path>
                                </svg>
                            </div>

                            {/* Logo */}
                            <div className="mb-6 flex justify-center relative z-10">
                                <img
                                    src="Logo.png"
                                    alt="Logo"
                                    className="w-14 h-14"
                                />
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-2 relative z-10">
                                Buat Akun Baru
                            </h1>
                            <p className="text-blue-100 text-sm relative z-10">
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
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
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
                                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                                errors.name
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                                            }`}
                                            placeholder="Nama Anda"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
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
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
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
                                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                                errors.email
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                                            }`}
                                            placeholder="nama@email.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
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
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
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
                                            className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                                errors.password
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                                            }`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
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
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
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
                                            className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                                errors.password_confirmation
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
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
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
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
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
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
                                            <span>Daftar Sekarang</span>
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Additional Links */}
                            <div className="text-center pt-4">
                                <p className="text-sm text-gray-600">
                                    Sudah punya akun?{" "}
                                    <a
                                        href="/login"
                                        className="text-blue-600 hover:text-blue-700 font-semibold"
                                    >
                                        Masuk Sekarang
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
