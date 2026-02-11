
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
    FaPrint
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
        
        // Filter empty families to avoid validation errors
        const cleanedFamilies = data.families.filter(f => f.id_family && f.id_family !== "");
        
        // We need to update the data with cleaned families before posting
        // Use the setData updater form to ensure we send clean data, 
        // OR just pass the data manually to transform? 
        // Inertia useForm 'transform' request data before sending:
        
        post(route('admin.hitung-kualitas-air.store'), {
            // Manually override the families data in the payload if possible, 
            // but useForm usage sends 'data'. 
            // Let's use transform prop of useForm if available, but here we can just update state first?
            // State update might be async/slow. 
            // Better: use the transform callback option of post (if supported) or global transform.
            // Inertia v1.0+ supports transform.
            transform: (data) => ({
                ...data,
                families: data.families.filter(f => f.id_family && f.id_family !== ""),
            }),
            onSuccess: (page) => {
                setCurrentStep(4);
                toast.success("Perhitungan Selesai!");
            },
            onError: (err) => {
                toast.error("Terdapat kesalahan pada input data. Periksa kembali form.");
                console.error("Validation Errors:", err);
                // Highlight the specific error if possible (Inertia handles this via 'errors' prop)
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
                    <div className="text-center animate-fade-in-up py-10">
                        <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-4 text-4xl">
                            <FaCheck />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Hasil Perhitungan Tersimpan</h2>
                        <p className="text-gray-600 mb-8">Data kualitas air telah berhasil dihitung dan disimpan ke dalam database.</p>
                        
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => window.location.href = route('admin.history')}
                                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
                            >
                                <FaSave /> Lihat Riwayat
                            </button>
                             <button 
                                onClick={() => window.print()}
                                className="px-6 py-2 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition shadow-lg flex items-center gap-2"
                            >
                                <FaPrint /> Cetak
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
