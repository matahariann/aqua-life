import React, { useEffect, useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";
import { IoPeopleOutline, IoWaterOutline } from "react-icons/io5";
import { MdPayment, MdOutlinePinDrop, MdOutlineHistory } from "react-icons/md";
import { AiOutlineExperiment } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { ChevronDown } from "lucide-react";

const AdminSidebar = ({ handleLogout }) => {
    const { auth } = usePage().props;
    const { url } = usePage();

    const activeBobotTab = useMemo(() => {
        const qs = url.split("?")[1] || "";
        return new URLSearchParams(qs).get("tab");
    }, [url]);

    const isBobotSection = url.startsWith("/admin/kelola-bobot");
    const [isBobotOpen, setIsBobotOpen] = useState(isBobotSection);

    useEffect(() => {
        if (isBobotSection) setIsBobotOpen(true);
    }, [isBobotSection]);

    const menuItems = [
        {
            href: "/admin/kelola-pengguna",
            icon: IoPeopleOutline,
            label: "Kelola Pengguna",
        },
        {
            href: "/admin/kelola-pembayaran",
            icon: MdPayment,
            label: "Kelola Pembayaran",
        },
        {
            href: "/admin/kelola-station",
            icon: MdOutlinePinDrop,
            label: "Kelola Station",
        },
        {
            href: "/admin/kelola-bobot",
            icon: AiOutlineExperiment,
            label: "Kelola Bobot",
        },
        { href: "/admin/history", icon: MdOutlineHistory, label: "History" },
        {
            href: "/admin/hitung-kualitas-air",
            icon: IoWaterOutline,
            label: "Hitung Kualitas Air",
        },
    ];

    return (
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 border-r border-white/10 relative overflow-hidden shadow-2xl">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 left-10 w-40 h-40 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
                        <div
                            className="absolute top-1/3 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                        ></div>
                        <div
                            className="absolute bottom-20 left-1/4 w-36 h-36 bg-white/20 rounded-full blur-3xl animate-pulse"
                            style={{ animationDelay: "2s" }}
                        ></div>
                        <div
                            className="absolute top-1/2 left-10 w-24 h-24 bg-emerald-300/30 rounded-full blur-2xl animate-pulse"
                            style={{ animationDelay: "1.5s" }}
                        ></div>
                    </div>
                </div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>

                {/* Logo Section */}
                <div className="px-6 py-6 border-b border-white/20 bg-white/10 backdrop-blur-md relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/30">
                            <img
                                src="/Logo.png"
                                alt="Logo"
                                className="w-6 h-6 object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-white drop-shadow-lg">
                                AquaLife
                            </h1>
                            <p className="text-xs text-white/80">{auth?.user?.name || "User"}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="px-3 py-4 flex-1 overflow-y-auto relative z-10">
                    <nav className="space-y-1">
                        {menuItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isActive = url.startsWith(item.href);

                            return (
                                <React.Fragment key={item.href || index}>
                                    <a
                                        href={item.href}
                                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                                            isActive
                                                ? "bg-white text-blue-600 shadow-lg scale-105"
                                                : "text-white/90 hover:bg-white/20 hover:backdrop-blur-sm hover:scale-102"
                                        }`}
                                    >
                                        <div
                                            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                                                isActive
                                                    ? "bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-md"
                                                    : "bg-white/20 text-white group-hover:bg-white/30"
                                            }`}
                                        >
                                            <IconComponent className="text-base" />
                                        </div>
                                        <span
                                            className={`font-semibold text-sm transition-colors duration-300 ${
                                                isActive
                                                    ? "text-gray-900"
                                                    : "text-white group-hover:text-white"
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <div className="ml-auto w-2 h-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full shadow-lg animate-pulse"></div>
                                        )}
                                    </a>
                                </React.Fragment>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className="px-3 pb-4 border-t border-white/20 pt-4 bg-white/5 backdrop-blur-md relative z-10">
                    <button
                        onClick={handleLogout}
                        className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-500/90 transition-all duration-300 text-white/90 hover:text-white hover:shadow-lg hover:scale-102"
                    >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                            <TbLogout className="text-base transition-colors" />
                        </div>
                        <span className="font-semibold text-sm">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
