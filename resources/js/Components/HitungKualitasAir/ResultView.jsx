import React from "react";
import { FaVial, FaFlask, FaInfoCircle, FaCheck, FaArrowLeft, FaSave, FaPrint } from "react-icons/fa";
import { getAbioticStatus, getBioticIndexStatus, getAdditionalAbioticStatus } from "@/Utils/evaluationLogic";

export default function ResultView({ 
    data, 
    result, 
    geoZones,
    waterTypes,
    bioticFamilies, 
    prevStep, 
    handleSave, 
    processing,
    isHistoryView = false 
}) {
    const geoZoneName = geoZones?.find(z => z.id == data.id_geo_zone)?.name || '-';
    const waterTypeName = waterTypes?.find(w => w.id == data.id_type_water)?.name || '-';

    const abioticMainParams = [
        { name: 'pH', key: 'ph', value: data.ph },
        { name: 'Suhu', key: 'temperature', value: data.temperature },
        { name: 'DO', key: 'dissolved_oxygen', value: data.dissolved_oxygen },
        { name: 'Salinitas', key: 'salinity', value: data.salinity },
        { name: 'NH3', key: 'nh3', value: data.nh3 },
        { name: 'NH2', key: 'nh2', value: data.nh2 },
    ];

    const abioticAdditionalParams = [
        { name: 'Conductivity', key: 'conductivity', value: data.conductivity },
        { name: 'Ratio C/N', key: 'ratio_cn', value: data.ratio_cn },
        { name: 'Turbidity', key: 'turbidity', value: data.turbidity },
        { name: 'Clay', key: 'clay', value: data.clay },
        { name: 'Sand', key: 'sand', value: data.sand },
        { name: 'Silt', key: 'silt', value: data.silt },
        { name: 'Coarse Sediment', key: 'coarse_sediment', value: data.coarse_sediment },
        { name: 'Total Organic Dissolved', key: 'total_organic_dissolved', value: data.total_organic_dissolved },
        { name: 'Total Organic Substrate', key: 'total_organic_substrate', value: data.total_organic_substrate },
        { name: 'Macrozoobenthos Density', key: 'macrozoobenthos_density', value: data.macrozoobenthos_density },
    ];

    const bioticIndexParams = [
        { name: 'Similarity', key: 'similarity', value: data.similarity },
        { name: 'Dominance', key: 'dominance', value: data.dominance },
        { name: 'Diversity', key: 'diversity', value: data.diversity },
        { name: 'Total Abundance', key: 'total_abundance', value: data.total_abundance },
        { name: 'Number of Species', key: 'number_of_species', value: data.number_of_species },
    ];

    return (
        <div className="animate-fade-in-up py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-start">
                
                {/* Kolom Kiri: Abiotik */}
                <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-bold border-b pb-2 flex items-center gap-2">
                        <FaVial className="text-emerald-500" /> Ringkasan Parameter Abiotik
                    </h3>
                    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                                <tr>
                                    <th className="px-4 py-3">Parameter</th>
                                    <th className="px-4 py-3 text-center">Nilai</th>
                                    <th className="px-4 py-3 text-center">Bobot</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td colSpan="4" className="px-4 py-2 bg-gray-50 font-semibold text-gray-600">A. Parameter Abiotik Utama</td>
                                </tr>
                                {abioticMainParams.map(param => {
                                    const isEmpty = param.value === "" || param.value === null;
                                    const displayValue = isEmpty ? "-" : param.value;
                                    const { status, bobot } = isEmpty 
                                        ? { status: 'Normal', bobot: '-' } 
                                        : getAbioticStatus(param.name, param.value, waterTypeName, geoZoneName);
                                    
                                    return (
                                        <tr key={param.key} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">{param.name}</td>
                                            <td className="px-4 py-2 text-center">{displayValue}</td>
                                            <td className="px-4 py-2 text-center font-medium">{bobot}</td>
                                            <td className="px-4 py-2 text-center">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${status === 'Normal' ? 'bg-emerald-100 text-emerald-800' : status === 'Mendekati' ? 'bg-yellow-100 text-yellow-800' : status === 'Jauh Dari Normal' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td colSpan="4" className="px-4 py-2 bg-gray-50 font-semibold text-gray-600">C. Parameter Abiotik Tambahan</td>
                                </tr>
                                {abioticAdditionalParams.map(param => {
                                    const isEmpty = param.value === "" || param.value === null;
                                    const displayValue = isEmpty ? "-" : param.value;
                                    const { status, bobot } = isEmpty 
                                        ? { status: 'Normal', bobot: '-' } 
                                        : getAdditionalAbioticStatus(param.name, param.value);
                                        
                                    return (
                                        <tr key={param.key} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">{param.name}</td>
                                            <td className="px-4 py-2 text-center">{displayValue}</td>
                                            <td className="px-4 py-2 text-center font-medium">{bobot}</td>
                                            <td className="px-4 py-2 text-center">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${status === 'Normal' ? 'bg-emerald-100 text-emerald-800' : status === 'Mendekati' ? 'bg-yellow-100 text-yellow-800' : status === 'Jauh Dari Normal' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Kolom Kanan: Biotik */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2">
                            <FaFlask className="text-blue-500" /> Ringkasan Parameter Biotik
                        </h3>
                        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                                    <tr>
                                        <th className="px-4 py-3">B. Indeks Biotik</th>
                                        <th className="px-4 py-3 text-center">Nilai</th>
                                        <th className="px-4 py-3 text-center">Bobot</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {bioticIndexParams.map(param => {
                                        const isEmpty = param.value === "" || param.value === null;
                                        const displayValue = isEmpty ? "-" : param.value;
                                        const { status, bobot } = isEmpty 
                                            ? { status: 'Normal', bobot: '-' } 
                                            : getBioticIndexStatus(param.name, param.value);
                                            
                                        return (
                                            <tr key={param.key} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">{param.name}</td>
                                                <td className="px-4 py-2 text-center">{displayValue}</td>
                                                <td className="px-4 py-2 text-center font-medium">{bobot}</td>
                                                <td className="px-4 py-2 text-center">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${status === 'Normal' ? 'bg-emerald-100 text-emerald-800' : status === 'Mendekati' ? 'bg-yellow-100 text-yellow-800' : status === 'Jauh Dari Normal' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {data.families.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2">
                                <FaFlask className="text-blue-500" /> Spesies Family
                            </h3>
                            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                                        <tr>
                                            <th className="px-4 py-3">Species/Genus</th>
                                            <th className="px-4 py-3">Family</th>
                                            <th className="px-4 py-3 text-center">Bobot</th>
                                            <th className="px-4 py-3 text-center">Kelimpahan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {data.families.map((fam, idx) => {
                                            if(!fam.id_family) return null;
                                            const familyName = bioticFamilies?.find(f => f.id == fam.id_family)?.name || fam.name;
                                            const speciesName = fam.name || '-';
                                            return (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 italic">{speciesName}</td>
                                                    <td className="px-4 py-2">{familyName}</td>
                                                    <td className="px-4 py-2 text-center font-medium">-</td>
                                                    <td className="px-4 py-2 text-center">{fam.abundance}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {result && (
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-sm border border-blue-100 px-8 py-3 text-center h-full flex flex-col justify-center">
                            <h3 className="text-lg font-bold text-gray-700 mb-2">Skor Kualitas Air</h3>
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 drop-shadow-sm mb-4">
                                {result.value}
                            </div>
                            <div className="inline-block px-6 py-2 rounded-full text-lg font-bold bg-white text-blue-700 shadow-sm border border-blue-200 mb-6 mx-auto">
                                Status: {result.status}
                            </div>
        
                            <div className="grid grid-cols-1 gap-2 text-left">
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
                </div>
            </div>
            
            <div className="flex justify-center flex-wrap gap-4 mt-8">
                {isHistoryView ? (
                    <button 
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
                    >
                        <FaPrint /> Cetak
                    </button>
                ) : (
                    <>
                        <button 
                            onClick={prevStep}
                            className="px-6 py-3 bg-white text-gray-700 border rounded-xl font-bold hover:bg-gray-50 transition shadow-sm flex items-center gap-2"
                        >
                            <FaArrowLeft /> Kembali
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2 disabled:opacity-70"
                        >
                            {processing ? "Menyimpan..." : <><FaSave /> Simpan</>}
                        </button>
                        <button 
                            onClick={() => window.print()}
                            className="px-6 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition shadow-lg flex items-center gap-2"
                        >
                            <FaPrint /> Cetak
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
