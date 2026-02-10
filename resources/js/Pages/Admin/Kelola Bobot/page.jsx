import React, { useMemo, useState, useEffect } from "react";
import { router, usePage, useForm, Link } from "@inertiajs/react";
import { AiOutlineExperiment } from "react-icons/ai";
import { Trash2, Edit, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast, Toaster } from "sonner";
import AdminLayout from "@/Layouts/AdminLayout";
import ModalStyles from "@/Components/ModalStyles";

function MainAbioticModal({
    isOpen,
    onClose,
    onSubmit,
    form,
    setForm,
    errors,
    title,
    geoZones,
    waterTypes,
}) {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/50 transition-all duration-500"
                onClick={onClose}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-modal-appear">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Geographical Zone
                            </label>
                            <select
                                name="id_geo_zone"
                                value={form.id_geo_zone}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Zona</option>
                                {geoZones.map((z) => (
                                    <option key={z.id} value={z.id}>
                                        {z.name}
                                    </option>
                                ))}
                            </select>
                            {errors.id_geo_zone && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.id_geo_zone}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type of Water
                            </label>
                            <select
                                name="id_type_water"
                                value={form.id_type_water}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Tipe Air</option>
                                {waterTypes.map((w) => (
                                    <option key={w.id} value={w.id}>
                                        {w.name}
                                    </option>
                                ))}
                            </select>
                            {errors.id_type_water && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.id_type_water}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nilai Awal
                            </label>
                            <input
                                type="number"
                                step="any"
                                name="initial_value"
                                value={form.initial_value}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.initial_value && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.initial_value}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nilai Akhir
                            </label>
                            <input
                                type="number"
                                step="any"
                                name="final_value"
                                value={form.final_value}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.final_value && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.final_value}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bobot
                            </label>
                            <input
                                type="number"
                                step="any"
                                name="weight"
                                value={form.weight}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.weight && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.weight}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function AdditionalAbioticModal({
    isOpen,
    onClose,
    onSubmit,
    form,
    setForm,
    errors,
    title,
}) {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/50 transition-all duration-500"
                onClick={onClose}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-modal-appear">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nilai Awal
                            </label>
                            <input
                                type="number"
                                step="any"
                                name="initial_value"
                                value={form.initial_value}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.initial_value && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.initial_value}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nilai Akhir
                            </label>
                            <input
                                type="number"
                                step="any"
                                name="final_value"
                                value={form.final_value}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.final_value && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.final_value}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bobot
                            </label>
                            <input
                                type="number"
                                step="any"
                                name="weight"
                                value={form.weight}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.weight && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.weight}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function DeleteMainAbioticModal({ isOpen, onClose, onConfirm, processing, parameter }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/50 transition-all duration-500"
                onClick={onClose}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-modal-appear">
                <h3 className="text-xl font-bold mb-2 text-red-600">
                    Hapus Parameter
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                    Apakah Anda yakin ingin menghapus parameter{" "}
                    <span className="font-semibold">{parameter?.name}</span>?
                </p>
                <p className="text-xs text-gray-500 mb-6">
                    Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {processing ? "Menghapus..." : "Ya, Hapus"}
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminKelolaBobot({
    mainAbioticParameters,
    additionalAbioticParameters,
    bioticIndexParameters,
    geoZones,
    waterTypes,
}) {
    const { url } = usePage();

    const tab = useMemo(() => {
        const qs = url.split("?")[1] || "";
        return new URLSearchParams(qs).get("tab") || "main-abiotic";
    }, [url]);

    const content = useMemo(() => {
        switch (tab) {
            case "additional-abiotic":
                return {
                    title: "Bobot Additional Abiotic",
                    desc: "Konten khusus untuk bobot parameter additional abiotic.",
                    color: "from-cyan-500 to-emerald-500",
                };
            case "index-biotic":
                return {
                    title: "Bobot Index Biotic",
                    desc: "Konten khusus untuk bobot perhitungan index biotic.",
                    color: "from-cyan-500 to-emerald-500",
                };
            case "family-biotic":
                return {
                    title: "Bobot Family Biotic",
                    desc: "Konten khusus untuk bobot family biotic.",
                    color: "from-cyan-500 to-emerald-500",
                };
            case "main-abiotic":
            default:
                return {
                    title: "Bobot Main Abiotic",
                    desc: "Konten khusus untuk bobot parameter main abiotic.",
                    color: "from-cyan-500 to-emerald-500",
                };
        }
    }, [tab]);

    const [perPageMain, setPerPageMain] = useState(
        mainAbioticParameters?.per_page || 10
    );
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedParam, setSelectedParam] = useState(null);
    const [addErrors, setAddErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});

    // Additional Abiotic state (CRUD)
    const [showAddAdditionalModal, setShowAddAdditionalModal] = useState(false);
    const [showEditAdditionalModal, setShowEditAdditionalModal] = useState(false);
    const [showDeleteAdditionalModal, setShowDeleteAdditionalModal] = useState(false);
    const [selectedAdditionalParam, setSelectedAdditionalParam] = useState(null);
    const [addAdditionalErrors, setAddAdditionalErrors] = useState({});
    const [editAdditionalErrors, setEditAdditionalErrors] = useState({});

    const { delete: destroy, processing } = useForm();

    const [addForm, setAddForm] = useState({
        name: "",
        id_geo_zone: "",
        id_type_water: "",
        initial_value: "",
        final_value: "",
        weight: "",
    });

    const [editForm, setEditForm] = useState({
        name: "",
        id_geo_zone: "",
        id_type_water: "",
        initial_value: "",
        final_value: "",
        weight: "",
    });

    const [addAdditionalForm, setAddAdditionalForm] = useState({
        name: "",
        initial_value: "",
        final_value: "",
        weight: "",
    });

    const [editAdditionalForm, setEditAdditionalForm] = useState({
        name: "",
        initial_value: "",
        final_value: "",
        weight: "",
    });

    const [perPageAdditional, setPerPageAdditional] = useState(
        additionalAbioticParameters?.per_page || 10
    );

    // Biotic Index state (CRUD)
    const [showAddBioticModal, setShowAddBioticModal] = useState(false);
    const [showEditBioticModal, setShowEditBioticModal] = useState(false);
    const [showDeleteBioticModal, setShowDeleteBioticModal] = useState(false);
    const [selectedBioticParam, setSelectedBioticParam] = useState(null);
    const [addBioticErrors, setAddBioticErrors] = useState({});
    const [editBioticErrors, setEditBioticErrors] = useState({});

    const [addBioticForm, setAddBioticForm] = useState({
        name: "",
        initial_value: "",
        final_value: "",
        weight: "",
    });

    const [editBioticForm, setEditBioticForm] = useState({
        name: "",
        initial_value: "",
        final_value: "",
        weight: "",
    });

    const [perPageBiotic, setPerPageBiotic] = useState(
        bioticIndexParameters?.per_page || 10
    );

    useEffect(() => {
        if (mainAbioticParameters?.per_page) {
            setPerPageMain(mainAbioticParameters.per_page);
        }
    }, [mainAbioticParameters?.per_page]);

    useEffect(() => {
        if (additionalAbioticParameters?.per_page) {
            setPerPageAdditional(additionalAbioticParameters.per_page);
        }
    }, [additionalAbioticParameters?.per_page]);

    useEffect(() => {
        if (bioticIndexParameters?.per_page) {
            setPerPageBiotic(bioticIndexParameters.per_page);
        }
    }, [bioticIndexParameters?.per_page]);

    const handlePerPageChangeMain = (value) => {
        const newPerPage = Number(value);
        setPerPageMain(newPerPage);
        router.get(
            "/admin/kelola-bobot",
            { per_page: newPerPage, tab: "main-abiotic" },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handlePerPageChangeAdditional = (value) => {
        const newPerPage = Number(value);
        setPerPageAdditional(newPerPage);
        router.get(
            "/admin/kelola-bobot",
            { per_page: newPerPage, tab: "additional-abiotic" },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handlePerPageChangeBiotic = (value) => {
        const newPerPage = Number(value);
        setPerPageBiotic(newPerPage);
        router.get(
            "/admin/kelola-bobot",
            { per_page: newPerPage, tab: "index-biotic" },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handlePageChangeMain = (pageUrl) => {
        if (!pageUrl) return;
        const urlObj = new URL(pageUrl, window.location.origin);
        urlObj.searchParams.set("per_page", perPageMain);
        urlObj.searchParams.set("tab", "main-abiotic");
        router.get(urlObj.pathname + urlObj.search, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handlePageChangeAdditional = (pageUrl) => {
        if (!pageUrl) return;
        const urlObj = new URL(pageUrl, window.location.origin);
        urlObj.searchParams.set("per_page", perPageAdditional);
        urlObj.searchParams.set("tab", "additional-abiotic");
        router.get(urlObj.pathname + urlObj.search, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handlePageChangeBiotic = (pageUrl) => {
        if (!pageUrl) return;
        const urlObj = new URL(pageUrl, window.location.origin);
        urlObj.searchParams.set("per_page", perPageBiotic);
        urlObj.searchParams.set("tab", "index-biotic");
        router.get(urlObj.pathname + urlObj.search, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        router.post(
            "/admin/kelola-bobot/main-abiotic?tab=main-abiotic",
            addForm,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowAddModal(false);
                    setAddForm({
                        name: "",
                        id_geo_zone: "",
                        id_type_water: "",
                        initial_value: "",
                        final_value: "",
                        weight: "",
                    });
                    setAddErrors({});
                    toast.success("Berhasil!", {
                        description:
                            "Parameter main abiotic berhasil ditambahkan",
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    setAddErrors(errors);
                    toast.error("Gagal Menambahkan", {
                        description: "Mohon periksa kembali form Anda.",
                        duration: 3000,
                    });
                },
            }
        );
    };

    const handleEditClick = (parameter) => {
        setSelectedParam(parameter);
        setEditForm({
            name: parameter.name || "",
            id_geo_zone: parameter.id_geo_zone || parameter.geo_zone?.id || "",
            id_type_water:
                parameter.id_type_water || parameter.water_type?.id || "",
            initial_value: parameter.initial_value ?? "",
            final_value: parameter.final_value ?? "",
            weight: parameter.weight ?? "",
        });
        setEditErrors({});
        setShowEditModal(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!selectedParam) return;

        router.put(
            `/admin/kelola-bobot/main-abiotic/${selectedParam.id}?tab=main-abiotic`,
            editForm,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowEditModal(false);
                    setEditForm({
                        name: "",
                        id_geo_zone: "",
                        id_type_water: "",
                        initial_value: "",
                        final_value: "",
                        weight: "",
                    });
                    setEditErrors({});
                    setSelectedParam(null);
                    toast.success("Berhasil!", {
                        description:
                            "Parameter main abiotic berhasil diupdate",
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    setEditErrors(errors);
                    toast.error("Gagal Update", {
                        description: "Mohon periksa kembali form Anda.",
                        duration: 3000,
                    });
                },
            }
        );
    };

    const handleDeleteClick = (parameter) => {
        setSelectedParam(parameter);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!selectedParam) return;

        destroy(
            `/admin/kelola-bobot/main-abiotic/${selectedParam.id}?tab=main-abiotic`,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedParam(null);
                    toast.success("Berhasil!", {
                        description:
                            "Parameter main abiotic berhasil dihapus",
                        duration: 3000,
                    });
                },
                onError: () => {
                    toast.error("Gagal!", {
                        description: "Gagal menghapus parameter",
                        duration: 3000,
                    });
                },
            }
        );
    };

    // Additional Abiotic handlers
    const handleAddAdditionalSubmit = (e) => {
        e.preventDefault();
        router.post(
            "/admin/kelola-bobot/additional-abiotic?tab=additional-abiotic",
            addAdditionalForm,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowAddAdditionalModal(false);
                    setAddAdditionalForm({
                        name: "",
                        initial_value: "",
                        final_value: "",
                        weight: "",
                    });
                    setAddAdditionalErrors({});
                    toast.success("Berhasil!", {
                        description:
                            "Parameter additional abiotic berhasil ditambahkan",
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    setAddAdditionalErrors(errors);
                    toast.error("Gagal Menambahkan", {
                        description: "Mohon periksa kembali form Anda.",
                        duration: 3000,
                    });
                },
            }
        );
    };

    const handleEditAdditionalClick = (parameter) => {
        setSelectedAdditionalParam(parameter);
        setEditAdditionalForm({
            name: parameter?.name || "",
            initial_value: parameter?.initial_value ?? "",
            final_value: parameter?.final_value ?? "",
            weight: parameter?.weight ?? "",
        });
        setEditAdditionalErrors({});
        setShowEditAdditionalModal(true);
    };

    const handleEditAdditionalSubmit = (e) => {
        e.preventDefault();
        if (!selectedAdditionalParam) return;

        router.put(
            `/admin/kelola-bobot/additional-abiotic/${selectedAdditionalParam.id}?tab=additional-abiotic`,
            editAdditionalForm,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowEditAdditionalModal(false);
                    setEditAdditionalForm({
                        name: "",
                        initial_value: "",
                        final_value: "",
                        weight: "",
                    });
                    setEditAdditionalErrors({});
                    setSelectedAdditionalParam(null);
                    toast.success("Berhasil!", {
                        description:
                            "Parameter additional abiotic berhasil diupdate",
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    setEditAdditionalErrors(errors);
                    toast.error("Gagal Update", {
                        description: "Mohon periksa kembali form Anda.",
                        duration: 3000,
                    });
                },
            }
        );
    };

    const handleDeleteAdditionalClick = (parameter) => {
        setSelectedAdditionalParam(parameter);
        setShowDeleteAdditionalModal(true);
    };

    const handleDeleteAdditionalConfirm = () => {
        if (!selectedAdditionalParam) return;

        destroy(
            `/admin/kelola-bobot/additional-abiotic/${selectedAdditionalParam.id}?tab=additional-abiotic`,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteAdditionalModal(false);
                    setSelectedAdditionalParam(null);
                    toast.success("Berhasil!", {
                        description:
                            "Parameter additional abiotic berhasil dihapus",
                        duration: 3000,
                    });
                },
                onError: () => {
                    toast.error("Gagal!", {
                        description: "Gagal menghapus parameter",
                        duration: 3000,
                    });
                },
            }
        );
    };

    // Biotic Index handlers
    const handleAddBioticSubmit = (e) => {
        e.preventDefault();
        router.post(
            "/admin/kelola-bobot/biotic-index?tab=index-biotic",
            addBioticForm,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowAddBioticModal(false);
                    setAddBioticForm({
                        name: "",
                        initial_value: "",
                        final_value: "",
                        weight: "",
                    });
                    setAddBioticErrors({});
                    toast.success("Berhasil!", {
                        description:
                            "Parameter biotic index berhasil ditambahkan",
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    setAddBioticErrors(errors);
                    toast.error("Gagal Menambahkan", {
                        description: "Mohon periksa kembali form Anda.",
                        duration: 3000,
                    });
                },
            }
        );
    };

    const handleEditBioticClick = (parameter) => {
        setSelectedBioticParam(parameter);
        setEditBioticForm({
            name: parameter?.name || "",
            initial_value: parameter?.initial_value ?? "",
            final_value: parameter?.final_value ?? "",
            weight: parameter?.weight ?? "",
        });
        setEditBioticErrors({});
        setShowEditBioticModal(true);
    };

    const handleEditBioticSubmit = (e) => {
        e.preventDefault();
        if (!selectedBioticParam) return;

        router.put(
            `/admin/kelola-bobot/biotic-index/${selectedBioticParam.id}?tab=index-biotic`,
            editBioticForm,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowEditBioticModal(false);
                    setEditBioticForm({
                        name: "",
                        initial_value: "",
                        final_value: "",
                        weight: "",
                    });
                    setEditBioticErrors({});
                    setSelectedBioticParam(null);
                    toast.success("Berhasil!", {
                        description:
                            "Parameter biotic index berhasil diupdate",
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    setEditBioticErrors(errors);
                    toast.error("Gagal Update", {
                        description: "Mohon periksa kembali form Anda.",
                        duration: 3000,
                    });
                },
            }
        );
    };

    const handleDeleteBioticClick = (parameter) => {
        setSelectedBioticParam(parameter);
        setShowDeleteBioticModal(true);
    };

    const handleDeleteBioticConfirm = () => {
        if (!selectedBioticParam) return;

        destroy(
            `/admin/kelola-bobot/biotic-index/${selectedBioticParam.id}?tab=index-biotic`,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteBioticModal(false);
                    setSelectedBioticParam(null);
                    toast.success("Berhasil!", {
                        description:
                            "Parameter biotic index berhasil dihapus",
                        duration: 3000,
                    });
                },
                onError: () => {
                    toast.error("Gagal!", {
                        description: "Gagal menghapus parameter",
                        duration: 3000,
                    });
                },
            }
        );
    };

    const renderPageNumbersMain = () => {
        const pages = [];
        const currentPage = mainAbioticParameters?.current_page || 1;
        const lastPage = mainAbioticParameters?.last_page || 1;

        if (lastPage <= 7) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) pages.push("...");
            }

            for (
                let i = Math.max(1, currentPage - 2);
                i <= Math.min(lastPage, currentPage + 2);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < lastPage - 2) {
                if (currentPage < lastPage - 3) pages.push("...");
                pages.push(lastPage);
            }
        }

        return pages;
    };

    const renderPageNumbersAdditional = () => {
        const pages = [];
        const currentPage = additionalAbioticParameters?.current_page || 1;
        const lastPage = additionalAbioticParameters?.last_page || 1;

        if (lastPage <= 7) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) pages.push("...");
            }

            for (
                let i = Math.max(1, currentPage - 2);
                i <= Math.min(lastPage, currentPage + 2);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < lastPage - 2) {
                if (currentPage < lastPage - 3) pages.push("...");
                pages.push(lastPage);
            }
        }

        return pages;
    };

    const renderPageNumbersBiotic = () => {
        const pages = [];
        const currentPage = bioticIndexParameters?.current_page || 1;
        const lastPage = bioticIndexParameters?.last_page || 1;

        if (lastPage <= 7) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) pages.push("...");
            }

            for (
                let i = Math.max(1, currentPage - 2);
                i <= Math.min(lastPage, currentPage + 2);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < lastPage - 2) {
                if (currentPage < lastPage - 3) pages.push("...");
                pages.push(lastPage);
            }
        }

        return pages;
    };

    return (
        <AdminLayout>
            <Toaster
                position="top-right"
                expand={true}
                richColors
                closeButton
            />
            <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div
                                className={`bg-gradient-to-br ${content.color} p-3 rounded-xl shadow-lg ring-4 ring-white/30`}
                            >
                                <AiOutlineExperiment className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                                    Kelola Bobot
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    {content.title}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        <Link
                            href="/admin/kelola-bobot?tab=main-abiotic"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                tab === "main-abiotic"
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                            }`}
                        >
                            Main Abiotic
                        </Link>
                        <Link
                            href="/admin/kelola-bobot?tab=additional-abiotic"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                tab === "additional-abiotic"
                                    ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                            }`}
                        >
                            Additional Abiotic
                        </Link>
                        <Link
                            href="/admin/kelola-bobot?tab=index-biotic"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                tab === "index-biotic"
                                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                            }`}
                        >
                            Biotic Index
                        </Link>
                    </div>

                    {tab === "main-abiotic" ? (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div
                                className={`h-2 bg-gradient-to-r ${content.color}`}
                            ></div>

                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-gray-700 font-medium">
                                        Tampilkan:
                                    </label>
                                    <select
                                        value={perPageMain}
                                        onChange={(e) =>
                                            handlePerPageChangeMain(
                                                e.target.value
                                            )
                                        }
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                    <span className="text-sm text-gray-700">
                                        data per halaman
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Menampilkan{" "}
                                    {mainAbioticParameters?.from || 0} -{" "}
                                    {mainAbioticParameters?.to || 0} dari{" "}
                                    {mainAbioticParameters?.total || 0} data
                                </div>
                            </div>

                            <div className="px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Tabel Bobot Main Abiotic
                                </h2>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="group flex items-center gap-2 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 hover:from-blue-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold">
                                                Nama
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold">
                                                Geographical Zone
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold">
                                                Type of Water
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold">
                                                Nilai Awal
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold">
                                                Nilai Akhir
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold">
                                                Bobot
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {mainAbioticParameters?.data &&
                                        mainAbioticParameters.data.length >
                                            0 ? (
                                            mainAbioticParameters.data.map(
                                                (param) => (
                                                    <tr
                                                        key={param.id}
                                                        className="hover:bg-blue-50 transition-colors"
                                                    >
                                                        <td className="px-6 py-3 text-sm text-gray-700">
                                                            {param.id}
                                                        </td>
                                                        <td className="px-6 py-3 text-sm font-medium text-gray-900">
                                                            {param.name}
                                                        </td>
                                                        <td className="px-6 py-3 text-sm text-gray-800">
                                                            {param.geo_zone
                                                                ?.name || "-"}
                                                        </td>
                                                        <td className="px-6 py-3 text-sm text-gray-800">
                                                            {param.water_type
                                                                ?.name || "-"}
                                                        </td>
                                                        <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                            {
                                                                param.initial_value
                                                            }
                                                        </td>
                                                        <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                            {
                                                                param.final_value
                                                            }
                                                        </td>
                                                        <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                            {param.weight}
                                                        </td>
                                                        <td className="px-6 py-3 text-sm">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button
                                                                    onClick={() =>
                                                                        handleEditClick(
                                                                            param
                                                                        )
                                                                    }
                                                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                                                                    title="Edit"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteClick(
                                                                            param
                                                                        )
                                                                    }
                                                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                                                    title="Hapus"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="px-6 py-8 text-center text-gray-500"
                                                >
                                                    Tidak ada data parameter
                                                    main abiotic
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {mainAbioticParameters?.last_page > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Halaman{" "}
                                        {
                                            mainAbioticParameters.current_page
                                        }{" "}
                                        dari {mainAbioticParameters.last_page}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                handlePageChangeMain(
                                                    mainAbioticParameters.prev_page_url
                                                )
                                            }
                                            disabled={
                                                !mainAbioticParameters.prev_page_url
                                            }
                                            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                mainAbioticParameters.prev_page_url
                                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Prev
                                        </button>

                                        <div className="flex items-center gap-1">
                                            {renderPageNumbersMain().map(
                                                (page, index) => {
                                                    if (page === "...") {
                                                        return (
                                                            <span
                                                                key={`ellipsis-${index}`}
                                                                className="px-3 py-2 text-gray-500"
                                                            >
                                                                ...
                                                            </span>
                                                        );
                                                    }

                                                    const pageUrl = `/admin/kelola-bobot?page=${page}&per_page=${perPageMain}&tab=main-abiotic`;

                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() =>
                                                                handlePageChangeMain(
                                                                    pageUrl
                                                                )
                                                            }
                                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                                page ===
                                                                mainAbioticParameters.current_page
                                                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <button
                                            onClick={() =>
                                                handlePageChangeMain(
                                                    mainAbioticParameters.next_page_url
                                                )
                                            }
                                            disabled={
                                                !mainAbioticParameters.next_page_url
                                            }
                                            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                mainAbioticParameters.next_page_url
                                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div
                                className={`h-2 bg-gradient-to-r ${content.color}`}
                            ></div>

                            {tab === "additional-abiotic" && (
                                <>
                                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-700 font-medium">
                                                Tampilkan:
                                            </label>
                                            <select
                                                value={perPageAdditional}
                                                onChange={(e) =>
                                                    handlePerPageChangeAdditional(
                                                        e.target.value
                                                    )
                                                }
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={25}>25</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>
                                            <span className="text-sm text-gray-700">
                                                data per halaman
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Menampilkan{" "}
                                            {additionalAbioticParameters?.from ||
                                                0}{" "}
                                            -{" "}
                                            {additionalAbioticParameters?.to ||
                                                0}{" "}
                                            dari{" "}
                                            {additionalAbioticParameters?.total ||
                                                0}{" "}
                                            data
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 flex justify-between items-center">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            Tabel Bobot Additional Abiotic
                                        </h2>
                                        <button
                                            onClick={() => {
                                                setShowAddAdditionalModal(true);
                                                setAddAdditionalErrors({});
                                            }}
                                            className="group flex items-center gap-2 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 hover:from-blue-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold">
                                                        ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold">
                                                        Nama
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold">
                                                        Nilai Awal
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold">
                                                        Nilai Akhir
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold">
                                                        Bobot
                                                    </th>
                                                    <th className="px-6 py-3 text-center text-xs font-semibold">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {additionalAbioticParameters?.data &&
                                                additionalAbioticParameters.data
                                                    .length > 0 ? (
                                                    additionalAbioticParameters.data.map(
                                                        (param) => (
                                                            <tr
                                                                key={param.id}
                                                                className="hover:bg-blue-50 transition-colors"
                                                            >
                                                                <td className="px-6 py-3 text-sm text-gray-700">
                                                                    {param.id}
                                                                </td>
                                                                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                                                                    {param.name}
                                                                </td>
                                                                <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                                    {
                                                                        param.initial_value
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                                    {
                                                                        param.final_value
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                                    {
                                                                        param.weight
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-3 text-sm">
                                                                    <div className="flex items-center justify-center gap-2">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleEditAdditionalClick(
                                                                                    param
                                                                                )
                                                                            }
                                                                            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                                                                            title="Edit"
                                                                        >
                                                                            <Edit className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDeleteAdditionalClick(
                                                                                    param
                                                                                )
                                                                            }
                                                                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                                                            title="Hapus"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="6"
                                                            className="px-6 py-8 text-center text-gray-500"
                                                        >
                                                            Tidak ada data
                                                            parameter
                                                            additional abiotic
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {additionalAbioticParameters?.last_page >
                                        1 && (
                                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                            <div className="text-sm text-gray-600">
                                                Halaman{" "}
                                                {
                                                    additionalAbioticParameters.current_page
                                                }{" "}
                                                dari{" "}
                                                {
                                                    additionalAbioticParameters.last_page
                                                }
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handlePageChangeAdditional(
                                                            additionalAbioticParameters.prev_page_url
                                                        )
                                                    }
                                                    disabled={
                                                        !additionalAbioticParameters.prev_page_url
                                                    }
                                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        additionalAbioticParameters.prev_page_url
                                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    }`}
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                    Prev
                                                </button>

                                                <div className="flex items-center gap-1">
                                                    {renderPageNumbersAdditional().map(
                                                        (page, index) => {
                                                            if (
                                                                page === "..."
                                                            ) {
                                                                return (
                                                                    <span
                                                                        key={`ellipsis-${index}`}
                                                                        className="px-3 py-2 text-gray-500"
                                                                    >
                                                                        ...
                                                                    </span>
                                                                );
                                                            }

                                                            const pageUrl = `/admin/kelola-bobot?page=${page}&per_page=${perPageAdditional}&tab=additional-abiotic`;

                                                            return (
                                                                <button
                                                                    key={page}
                                                                    onClick={() =>
                                                                        handlePageChangeAdditional(
                                                                            pageUrl
                                                                        )
                                                                    }
                                                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                                        page ===
                                                                        additionalAbioticParameters.current_page
                                                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                                    }`}
                                                                >
                                                                    {page}
                                                                </button>
                                                            );
                                                        }
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        handlePageChangeAdditional(
                                                            additionalAbioticParameters.next_page_url
                                                        )
                                                    }
                                                    disabled={
                                                        !additionalAbioticParameters.next_page_url
                                                    }
                                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        additionalAbioticParameters.next_page_url
                                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    }`}
                                                >
                                                    Next
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            
                            {tab === "index-biotic" && (
                                <>
                                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-700 font-medium">
                                                Tampilkan:
                                            </label>
                                            <select
                                                value={perPageBiotic}
                                                onChange={(e) =>
                                                    handlePerPageChangeBiotic(
                                                        e.target.value
                                                    )
                                                }
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={25}>25</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>
                                            <span className="text-sm text-gray-700">
                                                data per halaman
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Menampilkan{" "}
                                            {bioticIndexParameters?.from ||
                                                0}{" "}
                                            -{" "}
                                            {bioticIndexParameters?.to ||
                                                0}{" "}
                                            dari{" "}
                                            {bioticIndexParameters?.total ||
                                                0}{" "}
                                            data
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 flex justify-between items-center">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            Tabel Bobot Biotic Index
                                        </h2>
                                        <button
                                            onClick={() => {
                                                setShowAddBioticModal(true);
                                                setAddBioticErrors({});
                                            }}
                                            className="group flex items-center gap-2 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 hover:from-blue-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold">
                                                        ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold">
                                                        Nama
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold">
                                                        Nilai Awal
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold">
                                                        Nilai Akhir
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-semibold">
                                                        Bobot
                                                    </th>
                                                    <th className="px-6 py-3 text-center text-xs font-semibold">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {bioticIndexParameters?.data &&
                                                bioticIndexParameters.data
                                                    .length > 0 ? (
                                                    bioticIndexParameters.data.map(
                                                        (param) => (
                                                            <tr
                                                                key={param.id}
                                                                className="hover:bg-blue-50 transition-colors"
                                                            >
                                                                <td className="px-6 py-3 text-sm text-gray-700">
                                                                    {param.id}
                                                                </td>
                                                                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                                                                    {param.name}
                                                                </td>
                                                                <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                                    {
                                                                        param.initial_value
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                                    {
                                                                        param.final_value
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-3 text-sm text-right text-gray-800">
                                                                    {
                                                                        param.weight
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-3 text-sm">
                                                                    <div className="flex items-center justify-center gap-2">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleEditBioticClick(
                                                                                    param
                                                                                )
                                                                            }
                                                                            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                                                                            title="Edit"
                                                                        >
                                                                            <Edit className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDeleteBioticClick(
                                                                                    param
                                                                                )
                                                                            }
                                                                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                                                            title="Hapus"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="6"
                                                            className="px-6 py-8 text-center text-gray-500"
                                                        >
                                                            Tidak ada data
                                                            parameter
                                                            biotic index
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {bioticIndexParameters?.last_page >
                                        1 && (
                                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                            <div className="text-sm text-gray-600">
                                                Halaman{" "}
                                                {
                                                    bioticIndexParameters.current_page
                                                }{" "}
                                                dari{" "}
                                                {
                                                    bioticIndexParameters.last_page
                                                }
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handlePageChangeBiotic(
                                                            bioticIndexParameters.prev_page_url
                                                        )
                                                    }
                                                    disabled={
                                                        !bioticIndexParameters.prev_page_url
                                                    }
                                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        bioticIndexParameters.prev_page_url
                                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    }`}
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                    Prev
                                                </button>

                                                <div className="flex items-center gap-1">
                                                    {renderPageNumbersBiotic().map(
                                                        (page, index) => {
                                                            if (
                                                                page === "..."
                                                            ) {
                                                                return (
                                                                    <span
                                                                        key={`ellipsis-${index}`}
                                                                        className="px-3 py-2 text-gray-500"
                                                                    >
                                                                        ...
                                                                    </span>
                                                                );
                                                            }

                                                            const pageUrl = `/admin/kelola-bobot?page=${page}&per_page=${perPageBiotic}&tab=index-biotic`;

                                                            return (
                                                                <button
                                                                    key={page}
                                                                    onClick={() =>
                                                                        handlePageChangeBiotic(
                                                                            pageUrl
                                                                        )
                                                                    }
                                                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                                        page ===
                                                                        bioticIndexParameters.current_page
                                                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                                    }`}
                                                                >
                                                                    {page}
                                                                </button>
                                                            );
                                                        }
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        handlePageChangeBiotic(
                                                            bioticIndexParameters.next_page_url
                                                        )
                                                    }
                                                    disabled={
                                                        !bioticIndexParameters.next_page_url
                                                    }
                                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        bioticIndexParameters.next_page_url
                                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    }`}
                                                >
                                                    Next
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <MainAbioticModal
                isOpen={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    setAddErrors({});
                }}
                onSubmit={handleAddSubmit}
                form={addForm}
                setForm={setAddForm}
                errors={addErrors}
                title="Tambah Parameter Main Abiotic"
                geoZones={geoZones || []}
                waterTypes={waterTypes || []}
            />

            <MainAbioticModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditErrors({});
                    setSelectedParam(null);
                }}
                onSubmit={handleEditSubmit}
                form={editForm}
                setForm={setEditForm}
                errors={editErrors}
                title="Edit Parameter Main Abiotic"
                geoZones={geoZones || []}
                waterTypes={waterTypes || []}
            />

            <DeleteMainAbioticModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                processing={processing}
                parameter={selectedParam}
            />

            <AdditionalAbioticModal
                isOpen={showAddAdditionalModal}
                onClose={() => {
                    setShowAddAdditionalModal(false);
                    setAddAdditionalErrors({});
                }}
                onSubmit={handleAddAdditionalSubmit}
                form={addAdditionalForm}
                setForm={setAddAdditionalForm}
                errors={addAdditionalErrors}
                title="Tambah Parameter Additional Abiotic"
            />

            <AdditionalAbioticModal
                isOpen={showEditAdditionalModal}
                onClose={() => {
                    setShowEditAdditionalModal(false);
                    setEditAdditionalErrors({});
                    setSelectedAdditionalParam(null);
                }}
                onSubmit={handleEditAdditionalSubmit}
                form={editAdditionalForm}
                setForm={setEditAdditionalForm}
                errors={editAdditionalErrors}
                title="Edit Parameter Additional Abiotic"
            />

            <DeleteMainAbioticModal
                isOpen={showDeleteAdditionalModal}
                onClose={() => setShowDeleteAdditionalModal(false)}
                onConfirm={handleDeleteAdditionalConfirm}
                processing={processing}
                parameter={selectedAdditionalParam}
            />

            <AdditionalAbioticModal
                isOpen={showAddBioticModal}
                onClose={() => {
                    setShowAddBioticModal(false);
                    setAddBioticErrors({});
                }}
                onSubmit={handleAddBioticSubmit}
                form={addBioticForm}
                setForm={setAddBioticForm}
                errors={addBioticErrors}
                title="Tambah Parameter Biotic Index"
            />

            <AdditionalAbioticModal
                isOpen={showEditBioticModal}
                onClose={() => {
                    setShowEditBioticModal(false);
                    setEditBioticErrors({});
                    setSelectedBioticParam(null);
                }}
                onSubmit={handleEditBioticSubmit}
                form={editBioticForm}
                setForm={setEditBioticForm}
                errors={editBioticErrors}
                title="Edit Parameter Biotic Index"
            />

            <DeleteMainAbioticModal
                isOpen={showDeleteBioticModal}
                onClose={() => setShowDeleteBioticModal(false)}
                onConfirm={handleDeleteBioticConfirm}
                processing={processing}
                parameter={selectedBioticParam}
            />

            <ModalStyles />
        </AdminLayout>
    );
}
