import React from "react";

export default function StationForm({ data, setData, geoZones, waterTypes, errors }) {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Informasi Stasiun</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Station <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder=""
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.name ? 'border-red-500 bg-red-50' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
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
}
