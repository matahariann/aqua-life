import React, { useState } from "react";
import {
    Fish,
    Droplets,
    Award,
    ArrowRight,
    CheckCircle,
    Menu,
    X,
} from "lucide-react";

export default function AquaLife() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
            {/* Navigation */}
            <nav className="bg-white shadow-md fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <img
                                src="Logo.png"
                                alt="Logo"
                                className="w-14 h-14"
                            />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            <button
                                onClick={() => scrollToSection("home")}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection("about")}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection("services")}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => scrollToSection("pricing")}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Pricing
                            </button>
                        </div>

                        <div className="hidden md:flex space-x-4">
                            <button className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium transition">
                                Sign Up
                            </button>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
                                Sign In
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 py-4 space-y-3">
                            <button
                                onClick={() => scrollToSection("home")}
                                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection("about")}
                                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection("services")}
                                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => scrollToSection("pricing")}
                                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Pricing
                            </button>
                            <button className="w-full px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg font-medium">
                                Sign Up
                            </button>
                            <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">
                                Sign In
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
                                Hitung Kualitas Air Budidaya Perikanan dengan
                                Mudah dan Akurat
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                AquaLife membantu Anda menghitung dan menilai
                                kualitas air budidaya berdasarkan parameter
                                fisik-kimia, indeks biotik, dan keluarga biotik
                                untuk memastikan kondisi air yang optimal bagi
                                ikan Anda.
                            </p>
                            <button
                                onClick={() => scrollToSection("services")}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center space-x-2 shadow-lg"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-200 via-blue-100 to-blue-300 rounded-2xl shadow-lg">
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 1200 400"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient
                                        id="oceanGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="0%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#0ea5e9" />
                                        <stop
                                            offset="100%"
                                            stopColor="#0284c7"
                                        />
                                    </linearGradient>
                                </defs>

                                {/* Wave Layer 1 - Back */}
                                <path fill="#3b82f6" opacity="0.3">
                                    <animate
                                        attributeName="d"
                                        dur="10s"
                                        repeatCount="indefinite"
                                        values="
                      M0,250 Q150,200 300,250 T600,250 T900,250 T1200,250 L1200,400 L0,400 Z;
                      M0,250 Q150,280 300,250 T600,250 T900,250 T1200,250 L1200,400 L0,400 Z;
                      M0,250 Q150,200 300,250 T600,250 T900,250 T1200,250 L1200,400 L0,400 Z
                    "
                                    />
                                </path>

                                {/* Wave Layer 2 - Middle Back */}
                                <path fill="#2563eb" opacity="0.5">
                                    <animate
                                        attributeName="d"
                                        dur="8s"
                                        repeatCount="indefinite"
                                        values="
                      M0,270 Q200,220 400,270 T800,270 T1200,270 L1200,400 L0,400 Z;
                      M0,270 Q200,300 400,270 T800,270 T1200,270 L1200,400 L0,400 Z;
                      M0,270 Q200,220 400,270 T800,270 T1200,270 L1200,400 L0,400 Z
                    "
                                    />
                                </path>

                                {/* Wave Layer 3 - Middle Front */}
                                <path fill="#1e40af" opacity="0.7">
                                    <animate
                                        attributeName="d"
                                        dur="6s"
                                        repeatCount="indefinite"
                                        values="
                      M0,290 Q180,250 360,290 T720,290 T1080,290 L1200,400 L0,400 Z;
                      M0,290 Q180,320 360,290 T720,290 T1080,290 L1200,400 L0,400 Z;
                      M0,290 Q180,250 360,290 T720,290 T1080,290 L1200,400 L0,400 Z
                    "
                                    />
                                </path>

                                {/* Wave Layer 4 - Front */}
                                <path fill="url(#oceanGradient)" opacity="0.9">
                                    <animate
                                        attributeName="d"
                                        dur="5s"
                                        repeatCount="indefinite"
                                        values="
                      M0,310 Q160,270 320,310 T640,310 T960,310 T1200,310 L1200,400 L0,400 Z;
                      M0,310 Q160,340 320,310 T640,310 T960,310 T1200,310 L1200,400 L0,400 Z;
                      M0,310 Q160,270 320,310 T640,310 T960,310 T1200,310 L1200,400 L0,400 Z
                    "
                                    />
                                </path>

                                {/* Wave highlights/foam on top */}
                                <path
                                    fill="rgba(255, 255, 255, 0.4)"
                                    stroke="none"
                                >
                                    <animate
                                        attributeName="d"
                                        dur="5s"
                                        repeatCount="indefinite"
                                        values="
                      M0,310 Q160,270 320,310 T640,310 T960,310 T1200,310 L1200,318 Q960,318 960,318 T640,318 T320,318 Q160,278 0,318 Z;
                      M0,310 Q160,340 320,310 T640,310 T960,310 T1200,310 L1200,318 Q960,318 960,318 T640,318 T320,318 Q160,348 0,318 Z;
                      M0,310 Q160,270 320,310 T640,310 T960,310 T1200,310 L1200,318 Q960,318 960,318 T640,318 T320,318 Q160,278 0,318 Z
                    "
                                    />
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Tentang AquaLife
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Droplets className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                Input Parameter Lengkap
                            </h3>
                            <p className="text-gray-600">
                                Masukkan data main parameter seperti pH, suhu,
                                DO, dan parameter penting lainnya dengan mudah
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                Analisis Indeks Biotik
                            </h3>
                            <p className="text-gray-600">
                                Hitung kualitas air berdasarkan indeks biotik
                                dan family biotik untuk penilaian ekosistem yang
                                komprehensif
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Fish className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                Hasil Penilaian Instan
                            </h3>
                            <p className="text-gray-600">
                                Dapatkan hasil perhitungan dan penilaian
                                kualitas air secara langsung setelah memasukkan
                                semua parameter
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Layanan Kami
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Dengan membership AquaLife, Anda dapat menghitung
                            kualitas air budidaya dengan memasukkan berbagai
                            parameter penting untuk mendapatkan penilaian yang
                            akurat
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
                        <div className="text-center mb-6">
                            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                                <Droplets className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-2">
                                Perhitungan Kualitas Air
                            </h3>
                            <p className="text-gray-600">
                                Layanan unggulan untuk pelaku usaha perikanan
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Input Main Parameter: pH, suhu, oksigen
                                    terlarut (DO), TDS, turbidity, dll
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Perhitungan Index Biotic untuk menilai
                                    kualitas ekosistem perairan
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Input Additional Parameter sesuai kebutuhan
                                    analisis Anda
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Data Family Biotic untuk penilaian
                                    keanekaragaman hayati
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Hasil perhitungan kualitas air yang
                                    komprehensif dan mudah dipahami
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => scrollToSection("pricing")}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition shadow-lg"
                        >
                            Lihat Harga
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section
                id="pricing"
                className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Harga Membership
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">
                            Investasi terbaik untuk kesuksesan bisnis budidaya
                            perikanan Anda
                        </p>
                    </div>

                    <div className="max-w-lg mx-auto">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16 opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-800 rounded-full -ml-20 -mb-20 opacity-30"></div>

                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2">
                                        Premium Membership
                                    </h3>
                                    <p className="text-blue-100">
                                        Akses penuh ke semua fitur AquaLife
                                    </p>
                                </div>

                                <div className="text-center mb-8">
                                    <div className="text-5xl font-bold mb-2">
                                        Rp 500.000
                                    </div>
                                    <div className="text-blue-100">
                                        per bulan
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Akses unlimited perhitungan kualitas
                                            air
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Form input untuk semua parameter
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Perhitungan main parameter lengkap
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Analisis index biotic dan family
                                            biotic
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Hasil penilaian kualitas air detail
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Riwayat perhitungan tersimpan
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-bold transition shadow-lg">
                                    Mulai Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-8 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Fish className="w-8 h-8" />
                        <span className="text-2xl font-bold">AquaLife</span>
                    </div>
                    <p className="text-blue-200 mb-4">
                        Aplikasi perhitungan kualitas air untuk budidaya
                        perikanan
                    </p>
                    <p className="text-blue-300 text-sm">
                        © 2026 AquaLife. All rights reserved.
                    </p>
                </div>
            </footer>

            <style>{`
        .wave {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
      `}</style>
        </div>
    );
}
