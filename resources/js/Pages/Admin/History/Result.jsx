import React, { useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import ResultView from "@/Components/HitungKualitasAir/ResultView";
import PrintReport from "@/Components/HitungKualitasAir/PrintReport";
import { FaArrowLeft, FaHistory } from "react-icons/fa";
import { Link } from "@inertiajs/react";

export default function HistoryResult({ auth, result, data, geoZones, waterTypes, bioticFamilies }) {
    // Check if we should autoshown print dialog (e.g., from Print button)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('print') === '1') {
            setTimeout(() => {
                window.print();
            }, 500); // slight delay to ensure render
        }
    }, []);

    return (
        <AdminLayout>
            {/* Style khusus untuk cetak */}
            <style>{`
                @media print {
                    @page { size: portrait; margin: 15mm; }
                    body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background-color: white !important; }
                    body * { visibility: hidden; }
                    #print-section, #print-section * { visibility: visible; }
                    #print-section { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; background-color: white; }
                    ::-webkit-scrollbar { display: none; }
                }
            `}</style>
            
            {/* Print Only Section */}
            <PrintReport 
                data={data} 
                result={result} 
                geoZones={geoZones} 
                waterTypes={waterTypes} 
                bioticFamilies={bioticFamilies} 
                currentStep={4} 
            />

            <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6 flex flex-col items-center justify-center print:hidden">
                <div className="w-full max-w-7xl mx-auto h-[95vh] flex flex-col">
                     {/* Header */}
                     <div className="flex justify-between items-center mb-6 shrink-0">
                        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
                            <FaHistory className="text-blue-600"/> Detail Histori Perhitungan
                        </h1>
                        <Link 
                            href="/admin/history"
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-sm font-medium transition-colors"
                        >
                            <FaArrowLeft /> Kembali ke Histori
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1 flex flex-col mb-6">
                         {/* Content Scrollable Area */}
                        <div className="p-6 md:p-10 flex-1 overflow-y-auto">
                            {/* We reuse ResultView. We need to pass mock functions since we are just viewing. */}
                            <ResultView 
                                data={data} 
                                result={result} 
                                bioticFamilies={bioticFamilies} 
                                prevStep={() => window.history.back()} 
                                handleSave={() => {}} 
                                processing={false}
                                isHistoryView={true} 
                            />
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
}
