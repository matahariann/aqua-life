
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import AdminLayout from "@/Layouts/AdminLayout";
import { 
    FaMapMarkerAlt, 
    FaFlask, 
    FaVial, 
    FaChartPie, 
    FaCheck, 
    FaArrowRight, 
    FaArrowLeft,
    FaSave,
    FaPrint,
    FaInfoCircle
} from "react-icons/fa";

// --- Components ---

const StepIndicator = ({ currentStep, steps }) => {
    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div className={`flex flex-col items-center relative`}>
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 z-10
                            ${index + 1 <= currentStep 
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg scale-110" 
                                : "bg-gray-300 text-gray-500"}`}
                        >
                            {index + 1 < currentStep ? <FaCheck /> : index + 1}
                        </div>
                        <div className="absolute top-12 whitespace-nowrap text-xs font-semibold text-gray-600">
                            {step.title}
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`w-12 sm:w-24 h-1 transition-all duration-300 mx-2
                            ${index + 1 < currentStep ? "bg-cyan-500" : "bg-gray-300"}`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

const StationForm = ({ data, setData, geoZones, waterTypes }) => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Informasi Stasiun</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Geographical Zone</label>
                    <select
                        value={data.id_geo_zone}
                        onChange={(e) => setData("id_geo_zone", e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Pilih Zone</option>
                        {geoZones.map((z) => (
                            <option key={z.id} value={z.id}>{z.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Water</label>
                    <select
                        value={data.id_type_water}
                        onChange={(e) => setData("id_type_water", e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Pilih Tipe Air</option>
                        {waterTypes.map((w) => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

const MainParameterForm = ({ data, setData, bioticFamilies }) => {
    
    const handleAddFamily = () => {
        setData("families", [
            ...data.families,
            { id_family: "", name: "", abundance: 0, taxa_indicator: 0 }
        ]);
    };

    const handleRemoveFamily = (index) => {
        const newFamilies = [...data.families];
        newFamilies.splice(index, 1);
        setData("families", newFamilies);
    };

    const handleFamilyChange = (index, field, value) => {
        const newFamilies = [...data.families];
        newFamilies[index][field] = value;
        
        // Auto-fill name if selecting from dropdown (optional/redundant if ID is enough)
        if (field === 'id_family') {
            const selected = bioticFamilies.find(f => f.id == value);
            if(selected) newFamilies[index]['name'] = selected.name; 
        }

        setData("families", newFamilies);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Biotic Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                    <FaFlask className="text-blue-500" /> Parameter Biotik (Main)
                </h2>
                
                <div className="space-y-4">
                    {data.families.map((fam, index) => (
                        <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 items-end bg-gray-50 p-4 rounded-xl shadow-sm border">
                           <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Family Checkbox/Dropdown</label>
                                <select 
                                    className="w-full mt-1 p-2 border rounded-lg text-sm"
                                    value={fam.id_family}
                                    onChange={(e) => handleFamilyChange(index, "id_family", e.target.value)}
                                >
                                    <option value="">Pilih Family</option>
                                    {bioticFamilies.map(f => (
                                        <option key={f.id} value={f.id}>{f.name} (Bobot: {f.weight})</option>
                                    ))}
                                </select>
                           </div>
                           <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Nama Genus/Spesies</label>
                                <input 
                                    type="text" 
                                    className="w-full mt-1 p-2 border rounded-lg text-sm"
                                    placeholder="Contoh: Chironomus sp."
                                    value={fam.name}
                                    onChange={(e) => handleFamilyChange(index, "name", e.target.value)}
                                />
                           </div>
                           <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Kelimpahan</label>
                                <input 
                                    type="number" 
                                    className="w-full mt-1 p-2 border rounded-lg text-sm"
                                    value={fam.abundance}
                                    onChange={(e) => handleFamilyChange(index, "abundance", e.target.value)}
                                />
                           </div>
                           <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Taxa Indicator</label>
                                <input 
                                    type="number" step="0.01"
                                    className="w-full mt-1 p-2 border rounded-lg text-sm"
                                    value={fam.taxa_indicator}
                                    onChange={(e) => handleFamilyChange(index, "taxa_indicator", e.target.value)}
                                />
                           </div>
                           <button 
                                onClick={() => handleRemoveFamily(index)}
                                className="text-red-500 hover:text-red-700 p-2"
                           >
                               ✕
                           </button>
                        </div>
                    ))}
                    <button 
                        type="button"
                        onClick={handleAddFamily}
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                        + Tambah Data Biotik
                    </button>
                </div>
            </div>

            {/* Abiotic Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                    <FaVial className="text-emerald-500" /> Parameter Abiotik (Main)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                     {[
                        { label: "Salinity (ppt)", name: "salinity" },
                        { label: "Temperature (°C)", name: "temperature" },
                        { label: "Dissolved Oxygen (mg/L)", name: "dissolved_oxygen" },
                        { label: "pH", name: "ph" },
                        { label: "NH3 (mg/L)", name: "nh3" },
                        { label: "NH2 (mg/L)", name: "nh2" },
                        { label: "Ammonia (mg/L)", name: "ammonia" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            <input
                                type="number" step="0.01"
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AdditionalParameterForm = ({ data, setData }) => {
    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Biotic Index Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                    <FaChartPie className="text-purple-500" /> Parameter Index Biotik
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { label: "Similarity", name: "similarity" },
                        { label: "Dominance", name: "dominance" },
                        { label: "Diversity", name: "diversity" },
                        { label: "Total Abundance", name: "total_abundance" },
                        { label: "Number of Species", name: "number_of_species" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            <input
                                type="number" step="0.01"
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Abiotic Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                    <FaVial className="text-orange-500" /> Parameter Abiotik Tambahan
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                        { label: "Conductivity", name: "conductivity" },
                        { label: "Ratio C/N", name: "ratio_cn" },
                        { label: "Turbidity", name: "turbidity" },
                        { label: "Clay (%)", name: "clay" },
                        { label: "Sand (%)", name: "sand" },
                        { label: "Silt (%)", name: "silt" },
                        { label: "Coarse Sediment", name: "coarse_sediment" },
                        { label: "Total Org. Dissolved", name: "total_organic_dissolved" },
                        { label: "Total Org. Substrate", name: "total_organic_substrate" },
                        { label: "Macrozoobenthos Den.", name: "macrozoobenthos_density" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            <input
                                type="number" step="0.01"
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---

export default function AdminHitungKualitasAir({ geoZones, waterTypes, bioticFamilies }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [result, setResult] = useState(null); // To store result after submission

    const { data, setData, post, processing, errors } = useForm({
        // Station
        id_geo_zone: "",
        id_type_water: "",
        
        // Main Abiotic
        ph: "",
        temperature: "",
        dissolved_oxygen: "",
        salinity: "",
        nh3: "",
        nh2: "",
        ammonia: "",

        // Main Biotic (Dynamic)
        families: [], 

        // Additional Abiotic
        conductivity: "",
        ratio_cn: "",
        turbidity: "",
        clay: "",
        sand: "",
        silt: "",
        coarse_sediment: "",
        total_organic_dissolved: "",
        total_organic_substrate: "",
        macrozoobenthos_density: "",

        // Biotic Index
        similarity: "",
        dominance: "",
        diversity: "",
        total_abundance: "",
        number_of_species: "",
    });

    const steps = [
        { title: "Informasi Stasiun" },
        { title: "Parameter Utama" },
        { title: "Parameter Tambahan" },
        { title: "Hasil Perhitungan" }, // Step 4 is Result View
    ];

    const nextStep = () => {
        // Validation logic per step can be added here
        if (currentStep === 1 && (!data.id_geo_zone || !data.id_type_water)) {
            toast.error("Mohon lengkapi data stasiun");
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post('/admin/hitung-kualitas-air?is_preview=1', {
            transform: (data) => ({
                ...data,
                families: data.families.filter(f => f.id_family && f.id_family !== ""),
            }),
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                if (page.props.flash && page.props.flash.preview_result) {
                    setResult(page.props.flash.preview_result);
                    setCurrentStep(4);
                    toast.success("Perhitungan Selesai!");
                } else if (page.props.flash && page.props.flash.error) {
                    toast.error(page.props.flash.error);
                }
            },
            onError: (err) => {
                toast.error("Terdapat kesalahan pada input data. Periksa kembali form.");
                console.error("Validation Errors:", err);
            }
        });
    };

    const handleSave = () => {
        post('/admin/hitung-kualitas-air', {
            transform: (data) => ({
                ...data,
                families: data.families.filter(f => f.id_family && f.id_family !== ""),
            }),
            onSuccess: () => {
                toast.success("Data berhasil disimpan!");
                setTimeout(() => {
                    window.location.href = '/admin/history';
                }, 1000);
            }
        });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <StationForm data={data} setData={setData} geoZones={geoZones} waterTypes={waterTypes} />;
            case 2:
                return <MainParameterForm data={data} setData={setData} bioticFamilies={bioticFamilies} />;
            case 3:
                return <AdditionalParameterForm data={data} setData={setData} />;
            case 4:
                return (
                    <div className="animate-fade-in-up py-4">
                        <div className="text-center mb-8">
                            <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4 text-4xl">
                                <FaChartPie />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Hasil Perhitungan WSM</h2>
                            <p className="text-gray-600">Berikut adalah ringkasan data dan hasil perhitungan kualitas air.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                            <h3 className="text-xl font-bold border-b pb-2 mb-4">Ringkasan Input Data</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div><span className="text-gray-500 block">pH</span><span className="font-semibold">{data.ph || '-'}</span></div>
                                <div><span className="text-gray-500 block">Suhu</span><span className="font-semibold">{data.temperature || '-'} °C</span></div>
                                <div><span className="text-gray-500 block">DO</span><span className="font-semibold">{data.dissolved_oxygen || '-'} mg/L</span></div>
                                <div><span className="text-gray-500 block">Salinitas</span><span className="font-semibold">{data.salinity || '-'} ppt</span></div>
                                <div><span className="text-gray-500 block">Kekeruhan</span><span className="font-semibold">{data.turbidity || '-'}</span></div>
                                <div><span className="text-gray-500 block">Rasio C/N</span><span className="font-semibold">{data.ratio_cn || '-'}</span></div>
                                <div><span className="text-gray-500 block">Konduktivitas</span><span className="font-semibold">{data.conductivity || '-'}</span></div>
                                <div><span className="text-gray-500 block">Biota Family</span><span className="font-semibold">{data.families.filter(f => f.id_family).length} jenis</span></div>
                            </div>
                        </div>

                        {result && (
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-sm border border-blue-100 p-8 mb-8 text-center">
                                <h3 className="text-lg font-bold text-gray-700 mb-2">Skor Kualitas Air (WSM Normalisasi)</h3>
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
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AdminLayout>
            <Toaster position="top-center" expand={true} richColors />
            <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6 flex items-center justify-center">
                <div className="w-full max-w-7xl mx-auto">
                     <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[95vh] flex flex-col">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 p-6 text-white shrink-0">
                            <h1 className="text-3xl font-bold flex items-center gap-3">
                                <FaChartPie className="opacity-80"/> Hitung Kualitas Air
                            </h1>
                            <p className="opacity-90 mt-1">Metode Weighted Sum Model (WSM)</p>
                        </div>

                        {/* Step Indicator */}
                        <div className="pt-8 px-6 shrink-0">
                            <StepIndicator currentStep={currentStep} steps={steps} />
                        </div>

                        {/* Content Scrollable Area */}
                        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                            {renderStepContent()}
                        </div>

                        {/* Footer Controls */}
                        {currentStep < 4 && (
                            <div className="p-6 bg-gray-50 border-t flex justify-between">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all
                                    ${currentStep === 1 
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                                        : "bg-white border hover:bg-gray-100 text-gray-700 shadow-sm"}`}
                                >
                                    <FaArrowLeft /> Kembali
                                </button>

                                {currentStep === 3 ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={processing}
                                        className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-70"
                                    >
                                        {processing ? "Menghitung..." : (
                                            <>Selesai & Hitung <FaSave /></>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextStep}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                                    >
                                        Lanjut <FaArrowRight />
                                    </button>
                                )}
                            </div>
                        )}
                     </div>
                </div>
            </main>
        </AdminLayout>
    );
}
