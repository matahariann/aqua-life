import React, { useState, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import { ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { FaMoneyBillWave, FaUpload, FaTimes, FaCamera, FaHistory, FaCheckCircle, FaClock, FaTimesCircle, FaEdit, FaTrash } from "react-icons/fa";
import MemberLayout from "@/Layouts/MemberLayout";

function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

function ProofPreviewModal({ isOpen, onClose, src }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60" onClick={onClose}>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md sm:max-w-lg w-full transform transition-all animate-modal-appear overflow-hidden border border-white/30">
                <div className="h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 shadow-lg"></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 group z-10 border border-white/40 hover:border-white/60 shadow-lg"
                    title="Tutup"
                >
                    <X className="text-xl text-white group-hover:rotate-90 transition-all duration-300 drop-shadow-lg" />
                </button>

                <div className="p-5 sm:p-6">
                    <div className="mb-4">
                        <h3 className="text-white text-xl font-bold drop-shadow-lg">Bukti Pembayaran</h3>
                    </div>

                    <div className="bg-black/20 border border-white/20 rounded-2xl overflow-hidden flex justify-center">
                        <img
                            src={src}
                            alt="Bukti Pembayaran"
                            className="w-auto max-w-full max-h-[65vh] object-contain bg-black/10"
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <a
                            href={src}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-semibold px-4 py-2.5 rounded-xl transition-all"
                        >
                            <Eye className="w-4 h-4" />
                            Buka di Tab Baru
                        </a>
                    </div>
                </div>

                <div className="relative h-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
            </div>
        </div>
    );
}

export default function MemberPembayaran({ auth, payments }) {
    const [showModal, setShowModal] = useState(false);
    const [previewModal, setPreviewModal] = useState({ open: false, src: "" });
    const [preview, setPreview] = useState(null);
    const [perPage, setPerPage] = useState(payments.per_page || 10);
    const [editingPaymentId, setEditingPaymentId] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        proof: null,
    });

    const isMembershipActive = auth.user.membership;

    const hasPendingPayment = payments.data.some((payment) => payment.status === "Pending");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("proof", file);
            setPreview(URL.createObjectURL(file));
            clearErrors("proof");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!data.proof) {
            toast.error("Silakan unggah bukti pembayaran terlebih dahulu.");
            return;
        }

        const isEditing = !!editingPaymentId;

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false);
                reset();
                setPreview(null);
                setEditingPaymentId(null);
                toast.success(isEditing ? "Bukti pembayaran berhasil diperbarui!" : "Bukti pembayaran berhasil diunggah!");
            },
            onError: (errors) => {
                toast.error(isEditing ? "Gagal memperbarui bukti pembayaran." : "Gagal mengunggah bukti pembayaran.");
                console.error(errors);
            },
        };

        if (isEditing) {
            router.post(`/member/pembayaran/${editingPaymentId}`, {
                _method: 'put',
                proof: data.proof
            }, {
                ...options,
                onSuccess: (page) => {
                    options.onSuccess(page);
                },
                onError: (err) => {
                    options.onError(err);
                }
            });
        } else {
            post("/member/pembayaran", options);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingPaymentId(null);
        reset();
        setPreview(null);
        clearErrors();
    };

    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        router.get(
            "/member/pembayaran",
            { per_page: newPerPage },
            { preserveState: true, replace: true }
        );
    };

    const handlePageChange = (url) => {
        if (!url) return;
        
        const urlObj = new URL(url, window.location.origin);
        urlObj.searchParams.set("per_page", perPage);
        
        router.get(
            urlObj.pathname + urlObj.search,
            {},
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const getStatusIcon = (status) => {
        if (!status) return null;
        switch (status.toLowerCase()) {
            case "approved":
                return <FaCheckCircle className="text-green-500 w-5 h-5" />;
            case "pending":
                return <FaClock className="text-yellow-500 w-5 h-5" />;
            case "rejected":
                return <FaTimesCircle className="text-red-500 w-5 h-5" />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        if (!status) return null;
        switch (status.toLowerCase()) {
            case "approved":
                return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-300">Disetujui</span>;
            case "pending":
                return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-yellow-300">Pending</span>;
            case "rejected":
                return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-red-300">Ditolak</span>;
            default:
                return null;
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const currentPage = payments?.current_page || 1;
        const lastPage = payments?.last_page || 1;

        if (lastPage <= 7) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) pages.push("...");
            }

            for (let i = Math.max(1, currentPage - 2); i <= Math.min(lastPage, currentPage + 2); i++) {
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
        <MemberLayout>
            <Toaster position="top-right" richColors />
            
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-10">
                <div className="max-w-6xl mx-auto space-y-8">
                    
                    {/* Header Section */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        
                        <div className="flex items-center gap-5 z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg flex items-center justify-center text-white shrink-0">
                                <FaMoneyBillWave className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Status Membership</h1>
                                <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Kelola pembayaran dan riwayat status keanggotaan Anda</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
                            <div className="px-6 py-3 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
                                <span className="text-sm font-semibold text-gray-600">Status Saat Ini:</span>
                                {isMembershipActive ? (
                                    <span className="flex items-center gap-2 text-green-600 font-bold bg-green-100/50 px-3 py-1 rounded-lg">
                                        <FaCheckCircle /> Aktif
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 text-red-600 font-bold bg-red-100/50 px-3 py-1 rounded-lg">
                                        <FaTimesCircle /> Tidak Aktif
                                    </span>
                                )}
                            </div>
                            
                            {!isMembershipActive && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    disabled={hasPendingPayment}
                                    className={`px-8 py-4 rounded-2xl font-bold text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-2
                                        ${hasPendingPayment 
                                            ? 'bg-gray-400 cursor-not-allowed opacity-80' 
                                            : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:scale-105 hover:shadow-2xl'
                                        }`}
                                >
                                    <FaUpload className="w-5 h-5" />
                                    {hasPendingPayment ? "Menunggu Verifikasi..." : "Join Membership"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Pending Notice */}
                    {hasPendingPayment && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-pulse-slow">
                            <FaClock className="text-yellow-600 w-6 h-6 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-yellow-800 font-bold text-lg">Pembayaran Sedang Diproses</h3>
                                <p className="text-yellow-700 text-sm mt-1 font-medium">Anda telah mengunggah bukti pembayaran. Silakan tunggu konfirmasi dari Admin. Anda tidak dapat mengajukan lagi hingga proses ini selesai.</p>
                            </div>
                        </div>
                    )}

                    {/* History Table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className={"bg-gradient-to-r from-cyan-500 to-emerald-500 p-1 rounded-xl shadow-lg ring-4 ring-white/30"}></div>
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                <FaHistory className="text-blue-500 opacity-80" />
                                Riwayat Pembayaran
                            </h2>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-semibold text-gray-500">Tampilkan:</label>
                                <select 
                                    value={perPage} 
                                    onChange={handlePerPageChange}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto max-h-[55vh] relative">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white relative sticky top-0 z-10">
                                    <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Bukti Pembayaran</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Tanggal Mulai Membership</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Tanggal Berakhir Membership</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {payments.data.length > 0 ? (
                                        payments.data.map((payment, index) => (
                                            <tr key={payment.id} className="hover:bg-blue-50 transition-colors duration-200">
                                                <td className="px-6 py-4 text-sm text-gray-700">{(payments.from || 1) + index}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {payment.proof_url ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => setPreviewModal({ open: true, src: payment.proof_url })}
                                                            className="group flex items-center gap-3 text-left"
                                                            title="Klik untuk lihat gambar"
                                                        >
                                                            <img
                                                                src={payment.proof_url}
                                                                alt="Bukti"
                                                                className="w-14 h-14 rounded-xl object-cover border border-gray-200 shadow-sm group-hover:shadow-md transition"
                                                            />
                                                            <span className="text-blue-600 font-semibold group-hover:underline inline-flex items-center gap-2">
                                                                <Eye className="w-4 h-4" />
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-500">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusText(payment.status)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {payment.status?.toLowerCase() === "approved"
                                                        ? formatDate(payment.membership_start_at)
                                                        : "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {payment.status?.toLowerCase() === "approved"
                                                        ? formatDate(payment.membership_end_at)
                                                        : "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingPaymentId(payment.id);
                                                                setShowModal(true);
                                                                setPreview(null);
                                                                reset();
                                                                clearErrors();
                                                            }}
                                                            disabled={payment.status?.toLowerCase() === "approved"}
                                                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all duration-300 ${
                                                                payment.status?.toLowerCase() === "approved"
                                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                                                                    : "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 hover:shadow-lg transform hover:-translate-y-0.5"
                                                            }`}
                                                            title={payment.status?.toLowerCase() === "approved" ? "Tidak dapat mengedit pembayaran yang sudah disetujui" : "Edit Pembayaran"}
                                                        >
                                                            <FaEdit className="w-4 h-4 drop-shadow-sm" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (!confirm("Yakin ingin menghapus riwayat pembayaran ini?")) return;
                                                                router.delete(`/member/pembayaran/${payment.id}`, {
                                                                    preserveScroll: true,
                                                                    onSuccess: () => toast.success("Riwayat pembayaran berhasil dihapus."),
                                                                    onError: () => toast.error("Gagal menghapus riwayat pembayaran."),
                                                                });
                                                            }}
                                                            disabled={payment.status?.toLowerCase() === "approved"}
                                                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all duration-300 ${
                                                                payment.status?.toLowerCase() === "approved"
                                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                                                                    : "bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-0.5"
                                                            }`}
                                                            title={payment.status?.toLowerCase() === "approved" ? "Tidak dapat menghapus pembayaran yang sudah disetujui" : "Hapus Pembayaran"}
                                                        >
                                                            <FaTrash className="w-4 h-4 drop-shadow-sm" />
                                                            <span>Hapus</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                                Belum ada data pembayaran
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Halaman {payments.current_page} dari {payments.last_page}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(payments.prev_page_url)}
                                    disabled={!payments.prev_page_url}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        payments.prev_page_url
                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Prev
                                </button>

                                <div className="flex items-center gap-1">
                                    {renderPageNumbers().map((page, idx) => {
                                        if (page === "...") {
                                            return (
                                                <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500">
                                                    ...
                                                </span>
                                            );
                                        }

                                        const pageUrl = `/member/pembayaran?page=${page}&per_page=${perPage}`;
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(pageUrl)}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    page === payments.current_page
                                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => handlePageChange(payments.next_page_url)}
                                    disabled={!payments.next_page_url}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        payments.next_page_url
                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex items-center justify-between text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/10 w-full h-full" style={{ background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 60%)'}}></div>
                                <h3 className="text-xl font-bold flex items-center gap-3 relative z-10">
                                    <FaUpload /> Upload Bukti
                                </h3>
                                <button 
                                    onClick={handleCloseModal}
                                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors relative z-10"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit} className="p-8">
                                <div className="space-y-6">
                                    {/* Info text */}
                                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium border border-blue-100 flex gap-3">
                                        <FaMoneyBillWave className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
                                        <p>Silakan upload bukti transfer pembayaran membership Anda. Admin akan melakukan verifikasi setelah bukti diunggah.</p>
                                    </div>

                                    {/* Upload Area */}
                                    <div className="relative">
                                        <input 
                                            type="file" 
                                            id="proof" 
                                            accept="image/jpeg,image/png,image/jpg"
                                            onChange={handleFileChange}
                                            className="hidden" 
                                        />
                                        <label 
                                            htmlFor="proof" 
                                            className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
                                                ${preview 
                                                    ? 'border-blue-400 bg-blue-50/50' 
                                                    : errors.proof 
                                                        ? 'border-red-400 bg-red-50 hover:bg-red-100' 
                                                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400'
                                                }`}
                                        >
                                            {preview ? (
                                                <div className="relative w-full h-full p-2">
                                                    <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl m-2 rounded-xl">
                                                        <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">Ganti Gambar</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 group">
                                                    <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                        <FaCamera className="w-8 h-8 text-blue-400 group-hover:text-blue-600 transition-colors" />
                                                    </div>
                                                    <p className="mb-2 text-sm font-bold text-gray-700">Klik untuk upload foto</p>
                                                    <p className="text-xs text-gray-400 font-medium">JPG, PNG atau JPEG (Max. 2MB)</p>
                                                </div>
                                            )}
                                        </label>
                                        {errors.proof && (
                                            <p className="mt-2 text-sm text-red-500 font-bold px-2 flex items-center gap-1">
                                                <FaTimesCircle /> {errors.proof}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="mt-8 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors focus:ring-4 focus:ring-gray-200 outline-none"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing || !data.proof}
                                        className={`flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 focus:ring-4 focus:ring-blue-300 outline-none
                                            ${(processing || !data.proof) && 'opacity-70 cursor-not-allowed'}`}
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <FaUpload /> Kirim Bukti
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Image Preview Modal */}
                <ProofPreviewModal
                    isOpen={previewModal.open}
                    onClose={() => setPreviewModal({ open: false, src: "" })}
                    src={previewModal.src}
                />
            </main>
        </MemberLayout>
    );
}
