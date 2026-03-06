
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

import StepIndicator from "@/Components/HitungKualitasAir/StepIndicator";
import StationForm from "@/Components/HitungKualitasAir/StationForm";
import MainParameterForm from "@/Components/HitungKualitasAir/MainParameterForm";
import AdditionalParameterForm from "@/Components/HitungKualitasAir/AdditionalParameterForm";
import ResultView from "@/Components/HitungKualitasAir/ResultView";
import PrintReport from "@/Components/HitungKualitasAir/PrintReport";

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
                    <ResultView 
                        data={data} 
                        result={result} 
                        bioticFamilies={bioticFamilies} 
                        prevStep={prevStep} 
                        handleSave={handleSave} 
                        processing={processing} 
                    />
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
            <PrintReport 
                data={data} 
                result={result} 
                geoZones={geoZones} 
                waterTypes={waterTypes} 
                bioticFamilies={bioticFamilies} 
                currentStep={currentStep} 
            />

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
