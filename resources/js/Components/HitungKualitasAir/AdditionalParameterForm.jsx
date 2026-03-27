import React from "react";
import { FaChartPie, FaVial } from "react-icons/fa";

export default function AdditionalParameterForm({ data, setData, errors }) {
    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Biotic Index Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                    <FaChartPie className="text-purple-500" /> Parameter Index Biotik
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { label: "Similarity", name: "similarity", placeholder: "Range: 0 - 1"},
                        { label: "Dominance", name: "dominance", placeholder: "Range: 0 - 1"},
                        { label: "Diversity", name: "diversity", placeholder: "Range: 0 - 4"},
                        { label: "Total Abundance", name: "total_abundance"},
                        { label: "Number of Species", name: "number_of_species"},
                    ].map((field) => {
                        const isReadOnly = field.name === 'total_abundance' || field.name === 'number_of_species';
                        return (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            <input
                                type="number" step="0.01"
                                value={data[field.name]}
                                onChange={(e) => {
                                    if (!isReadOnly) setData(field.name, e.target.value);
                                }}
                                readOnly={isReadOnly}
                                placeholder={field.placeholder}
                                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''} ${errors[field.name] ? 'border-red-500 bg-red-50' : ''}`}
                            />
                            {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                        </div>
                    )})}
                </div>
            </div>

            {/* Additional Abiotic Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                    <FaVial className="text-orange-500" /> Parameter Abiotik Tambahan
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                        { label: "Conductivity", name: "conductivity", placeholder: "Min: 0"},
                        { label: "Ratio C/N", name: "ratio_cn", placeholder: "Min: 0"},
                        { label: "Turbidity", name: "turbidity", placeholder: "Min: 0"},
                        { label: "Clay (%)", name: "clay", placeholder: "Range: 0 - 20"},
                        { label: "Sand (%)", name: "sand", placeholder: "Range: 0 - 100"},
                        { label: "Silt (%)", name: "silt", placeholder: "Range: 0 - 100"},
                        { label: "Coarse Sediment", name: "coarse_sediment", placeholder: "Min: 0"},
                        { label: "Total Org. Dissolved", name: "total_organic_dissolved", placeholder: "Min: 0"},
                        { label: "Total Org. Substrate", name: "total_organic_substrate", placeholder: "Min: 0"},
                        { label: "Macrozoobenthos Den.", name: "macrozoobenthos_density", placeholder: "Min: 0"},
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            <input
                                type="number" step="0.01"
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none ${errors[field.name] ? 'border-red-500 bg-red-50' : ''}`}
                            />
                            {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
