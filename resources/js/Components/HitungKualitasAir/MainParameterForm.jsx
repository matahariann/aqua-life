import React from "react";
import { FaFlask, FaVial } from "react-icons/fa";

export default function MainParameterForm({ data, setData, bioticFamilies, errors }) {
    
    const recalculateTotals = (familiesArray) => {
        const totalAbundance = familiesArray.reduce((sum, fam) => sum + (parseFloat(fam.abundance) || 0), 0);
        const uniqueSpecies = new Set(
            familiesArray
                .map(f => f.name?.trim().toLowerCase())
                .filter(name => name)
        );
        return { total_abundance: totalAbundance, number_of_species: uniqueSpecies.size };
    };

    const handleAddFamily = () => {
        const newFamilies = [
            ...data.families,
            { id_family: "", name: "", abundance: 0, taxa_indicator: 0 }
        ];
        setData({
            ...data,
            families: newFamilies,
            ...recalculateTotals(newFamilies)
        });
    };

    const handleRemoveFamily = (index) => {
        const newFamilies = [...data.families];
        newFamilies.splice(index, 1);
        setData({
            ...data,
            families: newFamilies,
            ...recalculateTotals(newFamilies)
        });
    };

    const handleFamilyChange = (index, field, value) => {
        const newFamilies = [...data.families];
        newFamilies[index][field] = value;
        
        // Auto-fill name and taxa indicator if selecting from dropdown
        if (field === 'id_family') {
            const selected = bioticFamilies.find(f => f.id == value);
            if(selected) {
                newFamilies[index]['name'] = selected.name; 
                newFamilies[index]['taxa_indicator'] = selected.weight;
            }
        }

        setData({
            ...data,
            families: newFamilies,
            ...recalculateTotals(newFamilies)
        });
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
                                <label className="text-xs text-gray-500">Family <span className="text-red-500">*</span></label>
                                <select 
                                    className={`w-full mt-1 p-2 border rounded-lg text-sm ${errors[`family_${index}_id_family`] ? 'border-red-500 bg-red-50' : ''}`}
                                    value={fam.id_family}
                                    onChange={(e) => handleFamilyChange(index, "id_family", e.target.value)}
                                >
                                    <option value="">Pilih Family</option>
                                    {bioticFamilies.map(f => (
                                        <option key={f.id} value={f.id}>{f.name}</option>
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
                                    className={`w-full mt-1 p-2 border rounded-lg text-sm bg-gray-100 cursor-not-allowed ${errors[`family_${index}_taxa`] ? 'border-red-500 bg-red-50' : ''}`}
                                    value={fam.taxa_indicator}
                                    readOnly={true}
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
}
