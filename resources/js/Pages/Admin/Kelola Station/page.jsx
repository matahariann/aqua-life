import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { IoPeopleOutline } from "react-icons/io5";
import { router, useForm } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import AdminLayout from "@/Layouts/AdminLayout";
import AddStationModal from "@/Components/AddStationModal";
import EditStationModal from "@/Components/EditStationModal";
import DeleteStationModal from "@/Components/DeleteStationModal";
import ModalStyles from "@/Components/ModalStyles";

export default function AdminKelolaStation({ users, stations, waterTypes, geoZones }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStation, setSelectedStation  ] = useState(null);
    const [addErrors, setAddErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});
    const [perPage, setPerPage] = useState(users.per_page || 10);

    const { delete: destroy, processing } = useForm();

    const [addForm, setAddForm] = useState({
        id_type_water: "",
        id_geo_zone: "",
        id_user: "",
    });

    const [editForm, setEditForm] = useState({
        id_type_water: "",
        id_geo_zone: "",
        id_user: "",
    });

    // Sync perPage dengan users.per_page dari backend
    useEffect(() => {
        if (stations.per_page) {
            setPerPage(stations.per_page);
        }
    }, [stations.per_page]);

    const handleAddSubmit = (e) => {
        e.preventDefault();

        router.post("/admin/kelola-station", addForm, {
            preserveScroll: true,
            data: { per_page: perPage },
            onSuccess: () => {
                setShowAddModal(false);
                setAddForm({
                    id_type_water: "",
                    id_geo_zone: "",
                    id_user: "",
                });
                setAddErrors({});
                toast.success("Berhasil!", {
                    description: "Station berhasil ditambahkan",
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
        });
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setAddForm({
            id_type_water: "",
            id_geo_zone: "",
            id_user: "",
        });
        setAddErrors({});
    };

    const handleEditClick = (station) => {
        setSelectedStation(station);
        setEditForm({
            id_type_water: station.id_type_water || station.water_type?.id || "",
            id_geo_zone: station.id_geo_zone || station.geo_zone?.id || "",
            id_user: station.id_user || station.user?.id || "",
        });
        setEditErrors({});
        setShowEditModal(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        if (selectedStation) {
            router.put(`/admin/kelola-station/${selectedStation.id}`, editForm, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowEditModal(false);
                    setEditForm({
                        id_type_water: "",
                        id_geo_zone: "",
                        id_user: "",
                    });
                    setEditErrors({});
                    setSelectedStation(null);
                    toast.success("Berhasil!", {
                        description: "Station berhasil diupdate",
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
            });
        }
    };

    const handleDeleteClick = (station) => {
        setSelectedStation(station);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedStation) {
            destroy(`/admin/kelola-station/${selectedStation.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedStation(null);
                    toast.success("Berhasil!", {
                        description: "Station berhasil dihapus",
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    console.error("Error deleting station:", errors);
                    toast.error("Gagal!", {
                        description: "Gagal menghapus station",
                        duration: 3000,
                    });
                },
            });
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditForm({
            id_type_water: "",
            id_geo_zone: "",
            id_user: "",
        });
        setEditErrors({});
        setSelectedStation(null);
    };

    const handlePerPageChange = (value) => {
        const newPerPage = Number(value);
        setPerPage(newPerPage);
        router.get(
            "/admin/kelola-station",
            { per_page: newPerPage },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handlePageChange = (url) => {
        if (url) {
            const urlObj = new URL(url, window.location.origin);
            urlObj.searchParams.set("per_page", perPage);

            router.get(
                urlObj.pathname + urlObj.search,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }
    };

    // Generate page numbers
    const renderPageNumbers = () => {
        const pages = [];
        const currentPage = stations.current_page;
        const lastPage = stations.last_page;

        if (lastPage <= 7) {
            // Jika total halaman <= 7, tampilkan semua
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) {
                    pages.push("...");
                }
            }

            // Show pages around current page
            for (
                let i = Math.max(1, currentPage - 2);
                i <= Math.min(lastPage, currentPage + 2);
                i++
            ) {
                pages.push(i);
            }

            // Always show last page
            if (currentPage < lastPage - 2) {
                if (currentPage < lastPage - 3) {
                    pages.push("...");
                }
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
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 p-3 rounded-xl shadow-lg ring-4 ring-white/30">
                                    <IoPeopleOutline className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                                        Kelola Station
                                    </h1>
                                    <p className="text-gray-600 text-sm">
                                        Manajemen data station
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="group flex items-center gap-2 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 hover:from-blue-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 ring-2 ring-white/30"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Station
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className={"bg-gradient-to-r from-cyan-500 to-emerald-500 p-1 rounded-xl shadow-lg ring-4 ring-white/30"}></div>
                        {/* Per Page Selector */}
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-700 font-medium">
                                    Tampilkan:
                                </label>
                                <select
                                    value={perPage}
                                    onChange={(e) =>
                                        handlePerPageChange(e.target.value)
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
                                Menampilkan {stations.from || 0} -{" "}
                                {stations.to || 0} dari {stations.total} data
                            </div>
                        </div>

                        <div className="overflow-auto max-h-[65vh] relative">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white relative sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            No
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Station
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Tipe Air
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Pengguna
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stations.data &&
                                    stations.data.length > 0 ? (
                                        stations.data
                                            .sort((a, b) => {
                                                const zoneA =
                                                    a.geoZone?.name || "";
                                                const zoneB =
                                                    b.geoZone?.name || "";

                                                return zoneA.localeCompare(
                                                    zoneB
                                                );
                                            })
                                            .map((station, index) => (
                                                <tr
                                                    key={station.id}
                                                    className="hover:bg-blue-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {stations.from + index}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {station.geo_zone?.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {
                                                            station.water_type
                                                                ?.name
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {station.user?.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleEditClick(
                                                                        station
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
                                                                        station
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
                                            ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-8 text-center text-gray-500"
                                            >
                                                Tidak ada data pengguna
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {stations.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Halaman {stations.current_page} dari{" "}
                                    {stations.last_page}
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                stations.prev_page_url
                                            )
                                        }
                                        disabled={!stations.prev_page_url}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            stations.prev_page_url
                                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Prev
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-1">
                                        {renderPageNumbers().map(
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

                                                const pageUrl = `/admin/kelola-station?page=${page}&per_page=${perPage}`;

                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pageUrl
                                                            )
                                                        }
                                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                            page ===
                                                            stations.current_page
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

                                    {/* Next Button */}
                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                stations.next_page_url
                                            )
                                        }
                                        disabled={!stations.next_page_url}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            stations.next_page_url
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
                </div>

                {/* Modals */}
                <AddStationModal
                    isOpen={showAddModal}
                    onClose={handleCloseAddModal}
                    form={addForm}
                    setForm={setAddForm}
                    onSubmit={handleAddSubmit}
                    serverErrors={addErrors}
                    waterTypes={waterTypes || []}
                    geoZones={geoZones || []}
                    users={users || []}
                />

                <EditStationModal
                    isOpen={showEditModal}
                    onClose={handleCloseEditModal}
                    form={editForm}
                    setForm={setEditForm}
                    onSubmit={handleEditSubmit}
                    selectedStation={selectedStation}
                    serverErrors={editErrors}
                    waterTypes={waterTypes || []}
                    geoZones={geoZones || []}
                    users={users || []}
                />

                <DeleteStationModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    station={selectedStation}
                    onConfirm={handleDeleteConfirm}
                    processing={processing}
                />

                <ModalStyles />
            </main>
        </AdminLayout>
    );
}
