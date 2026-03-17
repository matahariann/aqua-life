import React from "react";
import { FaVial, FaFlask, FaInfoCircle, FaCheck, FaArrowLeft, FaSave, FaPrint } from "react-icons/fa";

export default function ResultView({ 
    data, 
    result, 
    bioticFamilies, 
    prevStep, 
    handleSave, 
    processing,
    isHistoryView = false 
}) {
    return (
        <div className="animate-fade-in-up py-4">
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2">
                    <FaVial className="text-emerald-500" /> Ringkasan Parameter Abiotik
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm mb-8 bg-gray-50 p-4 rounded-lg">
                    {/* Main Abiotic */}
                    <div><span className="text-gray-500 block">pH</span><span className="font-semibold">{data.ph}</span></div>
                    <div><span className="text-gray-500 block">Suhu</span><span className="font-semibold">{data.temperature} °C</span></div>
                    <div><span className="text-gray-500 block">DO</span><span className="font-semibold">{data.dissolved_oxygen} mg/L</span></div>
                    <div><span className="text-gray-500 block">Salinitas</span><span className="font-semibold">{data.salinity} ppt</span></div>
                    <div><span className="text-gray-500 block">NH3</span><span className="font-semibold">{data.nh3} mg/L</span></div>
                    <div><span className="text-gray-500 block">NH2</span><span className="font-semibold">{data.nh2} mg/L</span></div>
                    <div><span className="text-gray-500 block">Ammonia</span><span className="font-semibold">{data.ammonia} mg/L</span></div>
                    {/* Additional Abiotic */}
                    <div><span className="text-gray-500 block">Conductivity</span><span className="font-semibold">{data.conductivity}</span></div>
                    <div><span className="text-gray-500 block">Ratio C/N</span><span className="font-semibold">{data.ratio_cn}</span></div>
                    <div><span className="text-gray-500 block">Turbidity</span><span className="font-semibold">{data.turbidity}</span></div>
                    <div><span className="text-gray-500 block">Clay</span><span className="font-semibold">{data.clay} %</span></div>
                    <div><span className="text-gray-500 block">Sand</span><span className="font-semibold">{data.sand} %</span></div>
                    <div><span className="text-gray-500 block">Silt</span><span className="font-semibold">{data.silt} %</span></div>
                    <div><span className="text-gray-500 block">Coarse Sed.</span><span className="font-semibold">{data.coarse_sediment}</span></div>
                    <div><span className="text-gray-500 block">Total Org. Dissolved</span><span className="font-semibold">{data.total_organic_dissolved}</span></div>
                    <div><span className="text-gray-500 block">Total Org. Substrate</span><span className="font-semibold">{data.total_organic_substrate}</span></div>
                    <div><span className="text-gray-500 block">Macrozoobenthos Den.</span><span className="font-semibold">{data.macrozoobenthos_density}</span></div>
                </div>

                <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2">
                    <FaFlask className="text-blue-500" /> Ringkasan Parameter Biotik
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm mb-4 bg-gray-50 p-4 rounded-lg">
                    {/* Biotic Index */}
                    <div><span className="text-gray-500 block">Similarity</span><span className="font-semibold">{data.similarity}</span></div>
                    <div><span className="text-gray-500 block">Dominance</span><span className="font-semibold">{data.dominance}</span></div>
                    <div><span className="text-gray-500 block">Diversity</span><span className="font-semibold">{data.diversity}</span></div>
                    <div><span className="text-gray-500 block">Total Abundance</span><span className="font-semibold">{data.total_abundance}</span></div>
                    <div><span className="text-gray-500 block">Number of Species</span><span className="font-semibold">{data.number_of_species}</span></div>
                </div>
                
                {data.families.length > 0 && (
                    <div className="mt-4">
                        <span className="text-gray-500 font-medium block mb-2 text-sm">Spesies Family ({data.families.length}):</span>
                        <div className="flex flex-wrap gap-2">
                            {data.families.map((fam, idx) => (
                                fam.id_family && (
                                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                    {bioticFamilies.find(f => f.id == fam.id_family)?.name || fam.name} (Kelimpahan: {fam.abundance})
                                </span>
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {result && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-sm border border-blue-100 p-8 mb-8 text-center">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Skor Kualitas Air</h3>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 drop-shadow-sm mb-4">
                        {result.value}
                    </div>
                    <div className="inline-block px-6 py-2 rounded-full text-lg font-bold bg-white text-blue-700 shadow-sm border border-blue-200 mb-6">
                        Status: {result.status}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-50">
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><FaInfoCircle className="text-blue-500"/> Kesimpulan</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{result.conclusion}</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-50">
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><FaCheck className="text-emerald-500"/> Rekomendasi</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{result.recommendation}</p>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="flex justify-center flex-wrap gap-4 mt-8">
                {isHistoryView ? (
                    <button 
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
                    >
                        <FaPrint /> Cetak Laporan
                    </button>
                ) : (
                    <>
                        <button 
                            onClick={prevStep}
                            className="px-6 py-3 bg-white text-gray-700 border rounded-xl font-bold hover:bg-gray-50 transition shadow-sm flex items-center gap-2"
                        >
                            <FaArrowLeft /> Kembali Edit
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2 disabled:opacity-70"
                        >
                            {processing ? "Menyimpan..." : <><FaSave /> Simpan ke History</>}
                        </button>
                        <button 
                            onClick={() => window.print()}
                            className="px-6 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition shadow-lg flex items-center gap-2"
                        >
                            <FaPrint /> Cetak Laporan
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
