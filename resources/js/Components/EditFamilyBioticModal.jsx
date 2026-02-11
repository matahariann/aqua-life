import React, { useState, useEffect } from "react";
import { Edit, X } from "lucide-react";

export default function EditFamilyBioticModal({
    isOpen,
    onClose,
    form,
    setForm,
    onSubmit,
    selectedParam,
    errors: serverErrors = {},
}) {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Sync serverErrors ke local errors state
    useEffect(() => {
        if (serverErrors && Object.keys(serverErrors).length > 0) {
            setErrors(serverErrors);
        }
    }, [serverErrors]);

    // Reset errors when modal opens/closes or selectedParam changes
    useEffect(() => {
        if (isOpen) {
            setErrors({});
            setTouched({});
        }
    }, [isOpen, selectedParam]);

    if (!isOpen) return null;

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "name":
                if (!value || value.trim() === "") {
                    error = "Nama parameter harus diisi";
                }
                break;

            case "weight":
                if (value === "" || value === null || value === undefined) {
                    error = "Bobot harus diisi";
                }
                break;

            default:
                break;
        }

        return error;
    };

    const handleFieldChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });

        // Clear error saat user mulai mengetik
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        // Validate on change if field has been touched
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));
        }
    };

    const handleBlur = (name) => {
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        const error = validateField(name, form[name]);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        ["name", "initial_value", "final_value", "weight"].forEach((field) => {
            const error = validateField(field, form[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        // Mark all fields as touched
        setTouched({
            name: true,
            initial_value: true,
            final_value: true,
            weight: true,
        });

        // If there are errors, don't submit
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(e);
    };

    const handleClose = () => {
        setErrors({});
        setTouched({});
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/50 transition-all duration-500"
                onClick={handleClose}
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full transform transition-all animate-modal-appear overflow-hidden border border-white/30 max-h-[90vh] overflow-y-auto">
                <div className="h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 shadow-lg"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 group z-10 border border-white/40 hover:border-white/60 shadow-lg"
                >
                    <X className="text-xl text-white group-hover:rotate-90 transition-all duration-300 drop-shadow-lg" />
                </button>

                <div className="p-6">
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 rounded-2xl mb-3 shadow-xl border-4 border-white/30">
                            <Edit className="text-white text-2xl drop-shadow-lg" />
                        </div>
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">
                            Edit Parameter
                        </h3>
                        <p className="text-white/80 text-sm mt-1">
                             Family Biotic
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5 drop-shadow-md">
                                Nama Parameter
                            </label>
                            <input
                                type="text"
                                value={form.name || ""}
                                onChange={(e) => handleFieldChange("name", e.target.value)}
                                onBlur={() => handleBlur("name")}
                                className={`w-full px-4 py-2 bg-white/20 backdrop-blur-md border-2 rounded-lg text-white placeholder-white/50 focus:bg-white/30 focus:outline-none transition-all ${
                                    errors.name
                                        ? "border-red-400 focus:border-red-500"
                                        : "border-white/40 focus:border-white/60"
                                }`}
                                placeholder="Masukkan nama parameter"
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-100 flex items-center drop-shadow-lg bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-red-300/30">
                                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Weight Field */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5 drop-shadow-md">
                                Bobot
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={form.weight || ""}
                                onChange={(e) => handleFieldChange("weight", e.target.value)}
                                onBlur={() => handleBlur("weight")}
                                className={`w-full px-4 py-2 bg-white/20 backdrop-blur-md border-2 rounded-lg text-white placeholder-white/50 focus:bg-white/30 focus:outline-none transition-all ${
                                    errors.weight
                                        ? "border-red-400 focus:border-red-500"
                                        : "border-white/40 focus:border-white/60"
                                }`}
                                placeholder="Masukkan bobot"
                            />
                            {errors.weight && (
                                <p className="mt-2 text-sm text-red-100 flex items-center drop-shadow-lg bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-red-300/30">
                                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.weight}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/30 hover:border-white/60 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:via-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group border border-white/20"
                            >
                                <span className="relative z-10">Simpan Perubahan</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="relative h-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
            </div>
        </div>
    );
}
