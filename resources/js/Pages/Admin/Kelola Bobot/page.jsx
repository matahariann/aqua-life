import React, { useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { AiOutlineExperiment } from "react-icons/ai";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AdminKelolaBobot() {
    const { url } = usePage();

    const tab = useMemo(() => {
        const qs = url.split("?")[1] || "";
        return new URLSearchParams(qs).get("tab") || "main-abiotic";
    }, [url]);

    const content = useMemo(() => {
        switch (tab) {
            case "additional-abiotic":
                return {
                    title: "Bobot Additional Abiotic",
                    desc: "Konten khusus untuk bobot parameter additional abiotic.",
                    color: "from-cyan-500 to-emerald-500",
                };
            case "index-biotic":
                return {
                    title: "Bobot Index Biotic",
                    desc: "Konten khusus untuk bobot perhitungan index biotic.",
                    color: "from-cyan-500 to-emerald-500",
                };
            case "family-biotic":
                return {
                    title: "Bobot Family Biotic",
                    desc: "Konten khusus untuk bobot family biotic.",
                    color: "from-cyan-500 to-emerald-500",
                };
            case "main-abiotic":
            default:
                return {
                    title: "Bobot Main Abiotic",
                    desc: "Konten khusus untuk bobot parameter main abiotic.",
                    color: "from-cyan-500 to-emerald-500",
                };
        }
    }, [tab]);

    return (
        <AdminLayout>
            <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`bg-gradient-to-br ${content.color} p-3 rounded-xl shadow-lg ring-4 ring-white/30`}>
                                <AiOutlineExperiment className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                                    Kelola Bobot
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    {content.title}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className={`h-2 bg-gradient-to-r ${content.color}`}></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                                {content.title}
                            </h2>
                            <p className="text-gray-700 mb-6">{content.desc}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-gray-200 p-5 bg-gradient-to-br from-gray-50 to-white">
                                    <div className="text-xs font-semibold text-gray-500 mb-1">
                                        Tab Aktif
                                    </div>
                                    <div className="font-bold text-gray-900">
                                        {tab}
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-gray-200 p-5 bg-gradient-to-br from-gray-50 to-white">
                                    <div className="text-xs font-semibold text-gray-500 mb-1">
                                        Info
                                    </div>
                                    <div className="text-gray-800">
                                        Kalau tulisan ini berubah sesuai submenu, berarti routing dropdown berhasil.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
}
