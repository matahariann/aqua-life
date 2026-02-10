import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { IoPeopleOutline } from "react-icons/io5";
import { router, useForm } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import AdminLayout from "@/Layouts/AdminLayout";
import AddUserModal from "@/Components/AddUserModal";
import EditUserModal from "@/Components/EditUserModal";
import DeleteUserModal from "@/Components/DeleteUserModal";
import ModalStyles from "@/Components/ModalStyles";

export default function AdminKelolaPengguna({ users }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [addErrors, setAddErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});
    const [perPage, setPerPage] = useState(users.per_page || 10);

    const { delete: destroy, processing } = useForm();

    const [addForm, setAddForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "member",
        is_membership: false,
    });

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "member",
        is_membership: false,
    });

    // Sync perPage dengan users.per_page dari backend
    useEffect(() => {
        if (users.per_page) {
            setPerPage(users.per_page);
        }
    }, [users.per_page]);

    const handleAddSubmit = (e) => {
        e.preventDefault();

        router.post("/admin/kelola-pengguna", addForm, {
            preserveScroll: true,
            data: { per_page: perPage },
            onSuccess: () => {
                setShowAddModal(false);
                setAddForm({
                    name: "",
                    email: "",
                    password: "",
                    role: "member",
                    is_membership: false,
                });
                setAddErrors({});
                toast.success("Berhasil!", {
                    description: "Pengguna berhasil ditambahkan",
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
            name: "",
            email: "",
            password: "",
            role: "member",
            is_membership: false,
        });
        setAddErrors({});
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditForm({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
            is_membership: user.is_membership,
        });
        setEditErrors({});
        setShowEditModal(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        if (selectedUser) {
            router.put(`/admin/kelola-pengguna/${selectedUser.id}`, editForm, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowEditModal(false);
                    setEditForm({
                        name: "",
                        email: "",
                        password: "",
                        role: "member",
                        is_membership: false,
                    });
                    setEditErrors({});
                    setSelectedUser(null);
                    toast.success("Berhasil!", {
                        description: "Pengguna berhasil diupdate",
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

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedUser) {
            destroy(`/admin/kelola-pengguna/${selectedUser.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                    toast.success("Berhasil!", {
                        description: "Pengguna berhasil dihapus",
                        duration: 3000,
                    });
                },
                onError: (errors) => {
                    console.error("Error deleting user:", errors);
                    toast.error("Gagal!", {
                        description: "Gagal menghapus pengguna",
                        duration: 3000,
                    });
                },
            });
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditForm({
            name: "",
            email: "",
            password: "",
            role: "member",
            is_membership: false,
        });
        setEditErrors({});
        setSelectedUser(null);
    };

    const handlePerPageChange = (value) => {
        const newPerPage = Number(value);
        setPerPage(newPerPage);
        router.get(
            "/admin/kelola-pengguna",
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
            // Parse URL dan tambahkan per_page parameter
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

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case "admin":
                return "bg-purple-100 text-purple-800";
            case "operator":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Generate page numbers
    const renderPageNumbers = () => {
        const pages = [];
        const currentPage = users.current_page;
        const lastPage = users.last_page;

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
                                        Kelola Pengguna
                                    </h1>
                                    <p className="text-gray-600 text-sm">
                                        Manajemen data pengguna sistem
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="group flex items-center gap-2 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 hover:from-blue-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 ring-2 ring-white/30"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Pengguna
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
                                Menampilkan {users.from || 0} - {users.to || 0}{" "}
                                dari {users.total} data
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white relative">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            No
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Nama
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Membership
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.data && users.data.length > 0 ? (
                                        users.data
                                            .sort((a, b) => {
                                                const roleOrder = {
                                                    admin: 1,
                                                    operator: 2,
                                                    member: 3,
                                                };
                                                const roleA =
                                                    roleOrder[a.role] || 4;
                                                const roleB =
                                                    roleOrder[b.role] || 4;

                                                if (roleA !== roleB) {
                                                    return roleA - roleB;
                                                }

                                                return a.name.localeCompare(
                                                    b.name
                                                );
                                            })
                                            .map((user, index) => (
                                                <tr
                                                    key={user.id}
                                                    className="hover:bg-blue-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {users.from + index}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {user.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
                                                                user.role
                                                            )}`}
                                                        >
                                                            {user.role.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                user.is_membership
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {user.is_membership
                                                                ? "Aktif"
                                                                : "Tidak Aktif"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleEditClick(
                                                                        user
                                                                    )
                                                                }
                                                                className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            {user.role !==
                                                                "admin" && (
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteClick(
                                                                            user
                                                                        )
                                                                    }
                                                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                                                    title="Hapus"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            )}
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
                        {users.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Halaman {users.current_page} dari{" "}
                                    {users.last_page}
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                users.prev_page_url
                                            )
                                        }
                                        disabled={!users.prev_page_url}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            users.prev_page_url
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

                                                const pageUrl = `/admin/kelola-pengguna?page=${page}&per_page=${perPage}`;

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
                                                            users.current_page
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
                                                users.next_page_url
                                            )
                                        }
                                        disabled={!users.next_page_url}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            users.next_page_url
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
                <AddUserModal
                    isOpen={showAddModal}
                    onClose={handleCloseAddModal}
                    form={addForm}
                    setForm={setAddForm}
                    onSubmit={handleAddSubmit}
                    serverErrors={addErrors}
                />

                <EditUserModal
                    isOpen={showEditModal}
                    onClose={handleCloseEditModal}
                    form={editForm}
                    setForm={setEditForm}
                    onSubmit={handleEditSubmit}
                    selectedUser={selectedUser}
                    serverErrors={editErrors}
                />

                <DeleteUserModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    user={selectedUser}
                    onConfirm={handleDeleteConfirm}
                    processing={processing}
                />

                <ModalStyles />
            </main>
        </AdminLayout>
    );
}
