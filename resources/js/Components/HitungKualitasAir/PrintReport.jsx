import React from "react";

export default function PrintReport({ 
    data, 
    result, 
    geoZones, 
    waterTypes, 
    bioticFamilies, 
    currentStep 
}) {
    if (!result || currentStep !== 4) return null;

    return (
        <div id="print-section" className="hidden print:block w-full bg-white text-black text-sm p-4 h-full min-h-screen">
            <div className="text-center border-b-4 border-gray-800 pb-4 mb-6 pt-4">
                <h1 className="text-2xl font-bold uppercase mb-1">Laporan Hasil Uji Kualitas Air</h1>
                <h2 className="text-xl font-semibold text-gray-700">Metode Weighted Sum Model (WSM)</h2>
            </div>

            <div className="flex justify-between mb-8 border-b-2 border-gray-200 pb-4">
                <div>
                    <p className="mb-1"><span className="font-semibold inline-block w-32">Tanggal Cetak</span>: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><span className="font-semibold inline-block w-32">Jam</span>: {new Date().toLocaleTimeString('id-ID')}</p>
                </div>
                <div className="text-right">
                    <p className="mb-1"><span className="font-semibold">Zona Geografis:</span> {geoZones.find(z => z.id == data.id_geo_zone)?.name || '-'}</p>
                    <p><span className="font-semibold">Tipe Air:</span> {waterTypes.find(w => w.id == data.id_type_water)?.name || '-'}</p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-bold text-lg mb-3 bg-gray-100 p-2 border-l-4 border-gray-800">A. Parameter Abiotik</h3>
                <table className="w-full border-collapse border border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-800 p-2 text-left">Parameter Utama</th>
                            <th className="border border-gray-800 p-2 text-center w-24">Nilai</th>
                            <th className="border border-gray-800 p-2 text-left">Parameter Tambahan</th>
                            <th className="border border-gray-800 p-2 text-center w-28">Nilai</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-800 p-2">pH</td>
                            <td className="border border-gray-800 p-2 text-center">{data.ph}</td>
                            <td className="border border-gray-800 p-2">Conductivity</td>
                            <td className="border border-gray-800 p-2 text-center">{data.conductivity}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2">Suhu (°C)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.temperature}</td>
                            <td className="border border-gray-800 p-2">Ratio C/N</td>
                            <td className="border border-gray-800 p-2 text-center">{data.ratio_cn}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2">DO (mg/L)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.dissolved_oxygen}</td>
                            <td className="border border-gray-800 p-2">Turbidity</td>
                            <td className="border border-gray-800 p-2 text-center">{data.turbidity}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2">Salinitas (ppt)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.salinity}</td>
                            <td className="border border-gray-800 p-2">Clay (%)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.clay}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2">NH3 (mg/L)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.nh3}</td>
                            <td className="border border-gray-800 p-2">Sand (%)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.sand}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2">NH2 (mg/L)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.nh2}</td>
                            <td className="border border-gray-800 p-2">Silt (%)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.silt}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2">Ammonia (mg/L)</td>
                            <td className="border border-gray-800 p-2 text-center">{data.ammonia}</td>
                            <td className="border border-gray-800 p-2">Coarse Sediment</td>
                            <td className="border border-gray-800 p-2 text-center">{data.coarse_sediment}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2 bg-gray-50"></td>
                            <td className="border border-gray-800 p-2 bg-gray-50 text-center"></td>
                            <td className="border border-gray-800 p-2">Total Org. Dissolved</td>
                            <td className="border border-gray-800 p-2 text-center">{data.total_organic_dissolved}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2 bg-gray-50"></td>
                            <td className="border border-gray-800 p-2 bg-gray-50 text-center"></td>
                            <td className="border border-gray-800 p-2">Total Org. Substrate</td>
                            <td className="border border-gray-800 p-2 text-center">{data.total_organic_substrate}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-800 p-2 bg-gray-50"></td>
                            <td className="border border-gray-800 p-2 bg-gray-50 text-center"></td>
                            <td className="border border-gray-800 p-2">Macrozoobenthos Den.</td>
                            <td className="border border-gray-800 p-2 text-center">{data.macrozoobenthos_density}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-10">
                <h3 className="font-bold text-lg mb-3 bg-gray-100 p-2 border-l-4 border-gray-800">B. Parameter Biotik & Indeks</h3>
                <div className="grid grid-cols-2 gap-6 mb-4 items-start">
                    <table className="w-full border-collapse border border-gray-800 text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-800 p-2 text-left" colSpan="2">Indeks Ekologi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-800 p-2">Similarity</td>
                                <td className="border border-gray-800 p-2 text-center w-24">{data.similarity}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">Dominance</td>
                                <td className="border border-gray-800 p-2 text-center w-24">{data.dominance}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">Diversity</td>
                                <td className="border border-gray-800 p-2 text-center w-24">{data.diversity}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">Total Abundance</td>
                                <td className="border border-gray-800 p-2 text-center w-24">{data.total_abundance}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">Number of Species</td>
                                <td className="border border-gray-800 p-2 text-center w-24">{data.number_of_species}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="w-full border-collapse border border-gray-800 text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-800 p-2 text-left">Spesies Family ({data.families.length})</th>
                                <th className="border border-gray-800 p-2 text-center w-24">Kelimpahan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.families.map((fam, idx) => (
                                <tr key={idx}>
                                    <td className="border border-gray-800 p-2">{bioticFamilies.find(f => f.id == fam.id_family)?.name || fam.name}</td>
                                    <td className="border border-gray-800 p-2 text-center">{fam.abundance}</td>
                                </tr>
                            ))}
                            {data.families.length === 0 && (
                                <tr>
                                    <td className="border border-gray-800 p-2 text-center italic text-gray-500" colSpan="2">Tidak ada data</td>
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
