
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

const StationForm = ({ data, setData, geoZones, waterTypes, errors }) => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Informasi Stasiun</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Geographical Zone <span className="text-red-500">*</span></label>
                    <select
                        value={data.id_geo_zone}
                        onChange={(e) => setData("id_geo_zone", e.target.value)}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.id_geo_zone ? 'border-red-500 bg-red-50' : ''}`}
                    >
                        <option value="">Pilih Zone</option>
                        {geoZones.map((z) => (
                            <option key={z.id} value={z.id}>{z.name}</option>
                        ))}
                    </select>
                    {errors.id_geo_zone && <p className="text-red-500 text-xs mt-1">{errors.id_geo_zone}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Water <span className="text-red-500">*</span></label>
                    <select
                        value={data.id_type_water}
                        onChange={(e) => setData("id_type_water", e.target.value)}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.id_type_water ? 'border-red-500 bg-red-50' : ''}`}
                    >
                        <option value="">Pilih Tipe Air</option>
                        {waterTypes.map((w) => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                        ))}
                    </select>
                    {errors.id_type_water && <p className="text-red-500 text-xs mt-1">{errors.id_type_water}</p>}
                </div>
            </div>
        </div>
    );
};

const MainParameterForm = ({ data, setData, bioticFamilies, errors }) => {
    
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
        
        // Auto-fill name if selecting from dropdown
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
                        <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 items-start bg-gray-50 p-4 rounded-xl shadow-sm border">
                           <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Family Checkbox/Dropdown <span className="text-red-500">*</span></label>
                                <select 
                                    className={`w-full mt-1 p-2 border rounded-lg text-sm ${errors[`family_${index}_id_family`] ? 'border-red-500 bg-red-50' : ''}`}
                                    value={fam.id_family}
                                    onChange={(e) => handleFamilyChange(index, "id_family", e.target.value)}
                                >
                                    <option value="">Pilih Family</option>
                                    {bioticFamilies.map(f => (
                                        <option key={f.id} value={f.id}>{f.name} (Bobot: {f.weight})</option>
                                    ))}
                                </select>
                                {errors[`family_${index}_id_family`] && <p className="text-red-500 text-xs mt-1">{errors[`family_${index}_id_family`]}</p>}
                           </div>
                           <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Nama Genus/Spesies <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    className={`w-full mt-1 p-2 border rounded-lg text-sm ${errors[`family_${index}_name`] ? 'border-red-500 bg-red-50' : ''}`}
                                    placeholder="Contoh: Chironomus sp."
                                    value={fam.name}
                                    onChange={(e) => handleFamilyChange(index, "name", e.target.value)}
                                />
                                {errors[`family_${index}_name`] && <p className="text-red-500 text-xs mt-1">{errors[`family_${index}_name`]}</p>}
                           </div>
                           <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Kelimpahan <span className="text-red-500">*</span></label>
                                <input 
                                    type="number" 
                                    className={`w-full mt-1 p-2 border rounded-lg text-sm ${errors[`family_${index}_abundance`] ? 'border-red-500 bg-red-50' : ''}`}
                                    value={fam.abundance}
                                    onChange={(e) => handleFamilyChange(index, "abundance", e.target.value)}
                                />
                                {errors[`family_${index}_abundance`] && <p className="text-red-500 text-xs mt-1">{errors[`family_${index}_abundance`]}</p>}
                           </div>
                           <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Taxa Indicator <span className="text-red-500">*</span></label>
                                <input 
                                    type="number" step="0.01"
                                    className={`w-full mt-1 p-2 border rounded-lg text-sm ${errors[`family_${index}_taxa`] ? 'border-red-500 bg-red-50' : ''}`}
                                    value={fam.taxa_indicator}
                                    onChange={(e) => handleFamilyChange(index, "taxa_indicator", e.target.value)}
                                />
                                {errors[`family_${index}_taxa`] && <p className="text-red-500 text-xs mt-1">{errors[`family_${index}_taxa`]}</p>}
                           </div>
                           <button 
                                onClick={() => handleRemoveFamily(index)}
                                className="text-red-500 hover:text-red-700 p-2 mt-4 md:mt-0"
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label} <span className="text-red-500">*</span></label>
                            <input
                                type="number" step="0.01"
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)}
                                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none ${errors[field.name] ? 'border-red-500 bg-red-50' : ''}`}
                            />
                            {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AdditionalParameterForm = ({ data, setData, errors }) => {
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label} <span className="text-red-500">*</span></label>
                            <input
                                type="number" step="0.01"
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)}
                                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[field.name] ? 'border-red-500 bg-red-50' : ''}`}
                            />
                            {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label} <span className="text-red-500">*</span></label>
                            <input
                                type="number" step="0.01"
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)}
                                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none ${errors[field.name] ? 'border-red-500 bg-red-50' : ''}`}
                            />
                            {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
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
    const [validationErrors, setValidationErrors] = useState({}); // To track empty fields

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

    const validateStep = () => {
        const errors = {};
        
        if (currentStep === 1) {
            if (!data.id_geo_zone) errors.id_geo_zone = "Geographical Zone wajib diisi";
            if (!data.id_type_water) errors.id_type_water = "Type of Water wajib diisi";
        }
        else if (currentStep === 2) {
            const mainAbioticFields = [
                { key: 'salinity', label: 'Salinity' },
                { key: 'temperature', label: 'Temperature' },
                { key: 'dissolved_oxygen', label: 'Dissolved Oxygen' },
                { key: 'ph', label: 'pH' },
                { key: 'nh3', label: 'NH3' },
                { key: 'nh2', label: 'NH2' },
                { key: 'ammonia', label: 'Ammonia' }
            ];
            
            mainAbioticFields.forEach(field => {
                if (data[field.key] === "" || data[field.key] === null) {
                    errors[field.key] = `${field.label} wajib diisi`;
                }
            });
            
            // Validate biotic families
            data.families.forEach((fam, index) => {
                if (!fam.id_family) errors[`family_${index}_id_family`] = "Family wajib dipilih";
                if (!fam.name) errors[`family_${index}_name`] = "Nama spesies wajib diisi";
                if (fam.abundance === "" || fam.abundance === null) errors[`family_${index}_abundance`] = "Kelimpahan wajib diisi";
                if (fam.taxa_indicator === "" || fam.taxa_indicator === null) errors[`family_${index}_taxa`] = "Taxa Indicator wajib diisi";
            });
        }
        else if (currentStep === 3) {
            const indexFields = [
                { key: 'similarity', label: 'Similarity' },
                { key: 'dominance', label: 'Dominance' },
                { key: 'diversity', label: 'Diversity' },
                { key: 'total_abundance', label: 'Total Abundance' },
                { key: 'number_of_species', label: 'Number of Species' }
            ];
            
            const additionalAbioticFields = [
                { key: 'conductivity', label: 'Conductivity' },
                { key: 'ratio_cn', label: 'Ratio C/N' },
                { key: 'turbidity', label: 'Turbidity' },
                { key: 'clay', label: 'Clay' },
                { key: 'sand', label: 'Sand' },
                { key: 'silt', label: 'Silt' },
                { key: 'coarse_sediment', label: 'Coarse Sediment' },
                { key: 'total_organic_dissolved', label: 'Total Org. Dissolved' },
                { key: 'total_organic_substrate', label: 'Total Org. Substrate' },
                { key: 'macrozoobenthos_density', label: 'Macrozoobenthos Den.' }
            ];
            
            [...indexFields, ...additionalAbioticFields].forEach(field => {
                if (data[field.key] === "" || data[field.key] === null) {
                    errors[field.key] = `${field.label} wajib diisi`;
                }
            });
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (!validateStep()) {
            toast.error("Mohon lengkapi semua input yang diwajibkan pada form ini");
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateStep()) {
            toast.error("Mohon lengkapi semua input yang diwajibkan pada form ini");
            return;
        }
        
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
                return <StationForm data={data} setData={setData} geoZones={geoZones} waterTypes={waterTypes} errors={validationErrors} />;
            case 2:
                return <MainParameterForm data={data} setData={setData} bioticFamilies={bioticFamilies} errors={validationErrors} />;
            case 3:
                return <AdditionalParameterForm data={data} setData={setData} errors={validationErrors} />;
            case 4:
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
            {(result && currentStep === 4) && (
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
            )}

            <Toaster position="top-center" expand={true} richColors />
            <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6 flex items-center justify-center print:hidden">
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
