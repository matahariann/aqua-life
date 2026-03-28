import React, { useState } from "react";
import { router } from "@inertiajs/react";
import MemberSidebar from "./MemberSidebar";
import LogoutModal from "../Components/LogoutModal";

const MemberLayout = ({ children }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        router.post("/logout");
        setShowLogoutModal(false);
    };

    return (
        <>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <MemberSidebar 
                    isOpen={isSidebarOpen} 
                    setIsOpen={setIsSidebarOpen} 
                    handleLogout={() => setShowLogoutModal(true)} 
                />
                <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden object-cover w-full">
                    {/* Mobile Header */}
                    <div className="md:hidden fixed top-0 left-0 w-full flex items-center bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-3 shadow-md z-50">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                            className="p-1.5 mr-3 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                                <img src="/Logo.png" alt="Logo" className="w-5 h-5 object-contain" />
                            </div>
                            <h1 className="font-bold text-lg text-white drop-shadow-md">AquaLife</h1>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pb-6 relative z-10 pt-[60px] md:pt-0">
                        {children}
                    </div>
                </main>
            </div>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default MemberLayout;