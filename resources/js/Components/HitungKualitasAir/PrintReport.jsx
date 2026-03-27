import React from "react";
import { getAbioticStatus, getBioticIndexStatus, getAdditionalAbioticStatus } from "@/Utils/evaluationLogic";

export default function PrintReport({ 
    data, 
    result, 
    geoZones, 
    waterTypes, 
    bioticFamilies, 
    currentStep 
}) {
    if (!result || currentStep !== 4) return null;

    const geoZoneName = geoZones?.find(z => z.id == data.id_geo_zone)?.name || '-';
    const waterTypeName = waterTypes?.find(w => w.id == data.id_type_water)?.name || '-';

    const abioticMainParams = [
        { name: 'pH', key: 'ph', value: data.ph },
        { name: 'Suhu', key: 'temperature', value: data.temperature },
        { name: 'DO', key: 'dissolved_oxygen', value: data.dissolved_oxygen },
        { name: 'Salinitas', key: 'salinity', value: data.salinity },
        { name: 'NH3', key: 'nh3', value: data.nh3 },
        { name: 'NH2', key: 'nh2', value: data.nh2 },
        { name: 'Ammonia', key: 'ammonia', value: data.ammonia },
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
        <div id="print-section" className="hidden print:block w-full bg-white text-black text-sm p-4 h-full min-h-screen">
            <div className="text-center border-b-4 border-gray-800 pb-4 mb-6 pt-4">
                <h1 className="text-2xl font-bold uppercase mb-1">Laporan Hasil Uji Kualitas Air</h1>
                <h2 className="text-xl font-semibold text-gray-700">Metode Weighted Sum Model (WSM)</h2>
            </div>

            <div className="flex justify-between mb-8 border-b-2 border-gray-200 pb-4">
                <div>
                    <p className="mb-1"><span className="font-semibold inline-block w-32">Tanggal Cetak</span>: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="mb-1"><span className="font-semibold inline-block w-32">Jam</span>: {new Date().toLocaleTimeString('id-ID')}</p>
                    <p><span className="font-semibold inline-block w-32">Nama Stasiun</span>: {data.name || '-'}</p>
                </div>
                <div className="text-right">
                    <p className="mb-1"><span className="font-semibold">Zona Geografis:</span> {geoZoneName}</p>
                    <p><span className="font-semibold">Tipe Air:</span> {waterTypeName}</p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-bold text-lg mb-3 bg-gray-100 p-2 border-l-4 border-gray-800">A. Parameter Abiotik</h3>
                <table className="w-full border-collapse border border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-800 p-2 text-left">Parameter</th>
                            <th className="border border-gray-800 p-2 text-center w-24">Nilai</th>
                            <th className="border border-gray-800 p-2 text-center w-24">Bobot</th>
                            <th className="border border-gray-800 p-2 text-center w-32">Status/Kelimpahan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4" className="border border-gray-800 p-2 bg-gray-50 font-bold">1. Parameter Utama</td>
                        </tr>
                        {abioticMainParams.map(param => {
                            if(param.value === "" || param.value === null) return null;
                            const { status, bobot } = getAbioticStatus(param.name, param.value, waterTypeName, geoZoneName);
                            return (
                                <tr key={param.key}>
                                    <td className="border border-gray-800 p-2">{param.name}</td>
                                    <td className="border border-gray-800 p-2 text-center">{param.value}</td>
                                    <td className="border border-gray-800 p-2 text-center">{bobot}</td>
                                    <td className="border border-gray-800 p-2 text-center">{status}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan="4" className="border border-gray-800 p-2 bg-gray-50 font-bold">2. Parameter Tambahan</td>
                        </tr>
                        {abioticAdditionalParams.map(param => {
                            if(param.value === "" || param.value === null) return null;
                            const { status, bobot } = getAdditionalAbioticStatus(param.name, param.value);
                            return (
                                <tr key={param.key}>
                                    <td className="border border-gray-800 p-2">{param.name}</td>
                                    <td className="border border-gray-800 p-2 text-center">{param.value}</td>
                                    <td className="border border-gray-800 p-2 text-center">{bobot}</td>
                                    <td className="border border-gray-800 p-2 text-center">{status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mb-10">
                <h3 className="font-bold text-lg mb-3 bg-gray-100 p-2 border-l-4 border-gray-800">B. Parameter Biotik & Indeks</h3>
                <div className="grid grid-cols-2 gap-6 mb-4 items-start">
                    <table className="w-full border-collapse border border-gray-800 text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-800 p-2 text-left">Indeks Ekologi</th>
                                <th className="border border-gray-800 p-2 text-center w-20">Nilai</th>
                                <th className="border border-gray-800 p-2 text-center w-20">Bobot</th>
                                <th className="border border-gray-800 p-2 text-center w-24">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bioticIndexParams.map(param => {
                                if(param.value === "" || param.value === null) return null;
                                const { status, bobot } = getBioticIndexStatus(param.name, param.value);
                                return (
                                    <tr key={param.key}>
                                        <td className="border border-gray-800 p-2">{param.name}</td>
                                        <td className="border border-gray-800 p-2 text-center">{param.value}</td>
                                        <td className="border border-gray-800 p-2 text-center">{bobot}</td>
                                        <td className="border border-gray-800 p-2 text-center">{status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <table className="w-full border-collapse border border-gray-800 text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-800 p-2 text-left">Species/Genus</th>
                                <th className="border border-gray-800 p-2 text-left">Family</th>
                                <th className="border border-gray-800 p-2 text-center w-20">Bobot</th>
                                <th className="border border-gray-800 p-2 text-center w-24">Kelimpahan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.families.map((fam, idx) => {
                                if(!fam.id_family) return null;
                                const familyName = bioticFamilies?.find(f => f.id == fam.id_family)?.name || fam.name;
                                const speciesName = fam.name || '-';
                                return (
                                    <tr key={idx}>
                                        <td className="border border-gray-800 p-2 italic">{speciesName}</td>
                                        <td className="border border-gray-800 p-2">{familyName}</td>
                                        <td className="border border-gray-800 p-2 text-center">-</td>
                                        <td className="border border-gray-800 p-2 text-center">{fam.abundance}</td>
                                    </tr>
                                );
                            })}
                            {data.families.length === 0 && (
                                <tr>
                                    <td className="border border-gray-800 p-2 text-center italic text-gray-500" colSpan="4">Tidak ada data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-8 break-inside-avoid shadow-sm">
                <h3 className="font-bold text-lg mb-0 bg-blue-50 p-3 border-l-4 border-t border-r border-gray-800 text-blue-900">C. Hasil Evaluasi Kualitas Air</h3>
                <div className="border border-gray-800 p-6 bg-gray-50">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-5 mb-5">
                        <div className="w-1/2 text-center border-r border-gray-300">
                            <p className="text-gray-600 font-semibold mb-1 uppercase text-xs tracking-wider">Total Skor WSM</p>
                            <p className="text-4xl font-black text-blue-700">{result.value}</p>
                        </div>
                        <div className="w-1/2 text-center">
                            <p className="text-gray-600 font-semibold mb-1 uppercase text-xs tracking-wider">Status Kualitas Air</p>
                            <p className="text-2xl font-bold text-gray-800">{result.status}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4 className="font-bold text-gray-800 mb-1">Kesimpulan:</h4>
                        <p className="text-gray-700 text-sm leading-relaxed text-justify">{result.conclusion}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-1">Rekomendasi:</h4>
                        <p className="text-gray-700 text-sm leading-relaxed text-justify">{result.recommendation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
