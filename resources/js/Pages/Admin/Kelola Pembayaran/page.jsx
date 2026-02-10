import React, { useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import { CheckCircle2, XCircle, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { MdPayment } from "react-icons/md";
import AdminLayout from "@/Layouts/AdminLayout";
import ModalStyles from "@/Components/ModalStyles";

function StatusBadge({ status }) {
    const cfg = {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
    };

    const label = useMemo(() => {
        if (status === "approved") return "Disetujui";
        if (status === "rejected") return "Ditolak";
        return "Pending";
    }, [status]);

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg[status] || "bg-gray-100 text-gray-800"}`}>
            {label}
        </span>
    );
}

function ProofPreviewModal({ isOpen, onClose, src, email }) {
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
                        <p className="text-white/80 text-sm">{email || "-"}</p>
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

export default function AdminKelolaPembayaran({ payments }) {
    const [perPage, setPerPage] = useState(payments?.per_page || 10);
    const [preview, setPreview] = useState({ open: false, src: "", email: "" });

    useEffect(() => {
        if (payments?.per_page) setPerPage(payments.per_page);
    }, [payments?.per_page]);

    const handlePerPageChange = (value) => {
        const newPerPage = Number(value);
        setPerPage(newPerPage);
        router.get(
            "/admin/kelola-pembayaran",
            { per_page: newPerPage },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const handlePageChange = (url) => {
        if (!url) return;
        const urlObj = new URL(url, window.location.origin);
        urlObj.searchParams.set("per_page", perPage);
        router.get(urlObj.pathname + urlObj.search, {}, { preserveState: true, preserveScroll: true, replace: true });
    };

    const doApprove = (paymentId) => {
        router.post(`/admin/kelola-pembayaran/${paymentId}/approve`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success("Berhasil!", { description: "Pembayaran disetujui", duration: 2500 }),
            onError: () => toast.error("Gagal!", { description: "Tidak bisa menyetujui pembayaran", duration: 2500 }),
        });
    };

    const doReject = (paymentId) => {
        router.post(`/admin/kelola-pembayaran/${paymentId}/reject`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success("Berhasil!", { description: "Pembayaran ditolak", duration: 2500 }),
            onError: () => toast.error("Gagal!", { description: "Tidak bisa menolak pembayaran", duration: 2500 }),
        });
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
        <AdminLayout>
            <Toaster position="top-right" expand={true} richColors closeButton />
            <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 p-3 rounded-xl shadow-lg ring-4 ring-white/30">
                                    <MdPayment className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                                        Kelola Pembayaran
                                    </h1>
                                    <p className="text-gray-600 text-sm">Verifikasi bukti pembayaran member</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-700 font-medium">Tampilkan:</label>
                                <select
                                    value={perPage}
                                    onChange={(e) => handlePerPageChange(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span className="text-sm text-gray-700">data per halaman</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                Menampilkan {payments?.from || 0} - {payments?.to || 0} dari {payments?.total || 0} data
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white relative">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Bukti</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {payments?.data && payments.data.length > 0 ? (
                                        payments.data.map((p, index) => (
                                            <tr key={p.id} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">{(payments.from || 1) + index}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{p.user?.email || "-"}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {p.proof_url ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => setPreview({ open: true, src: p.proof_url, email: p.user?.email || "-" })}
                                                            className="group flex items-center gap-3 text-left"
                                                            title="Klik untuk lihat gambar"
                                                        >
                                                            <img
                                                                src={p.proof_url}
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
                                                    <StatusBadge status={p.status} />
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => doApprove(p.id)}
                                                            disabled={p.status === "approved"}
                                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                                                                p.status === "approved"
                                                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                                    : "bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                                            }`}
                                                            title="Setujui"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Setujui
                                                        </button>
                                                        <button
                                                            onClick={() => doReject(p.id)}
                                                            disabled={p.status === "rejected"}
                                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                                                                p.status === "rejected"
                                                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                                    : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                                                            }`}
                                                            title="Tolak"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                            Tolak
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

                        {payments?.last_page > 1 && (
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

                                            const pageUrl = `/admin/kelola-pembayaran?page=${page}&per_page=${perPage}`;
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
                        )}
                    </div>
                </div>

                <ProofPreviewModal
                    isOpen={preview.open}
                    onClose={() => setPreview({ open: false, src: "", email: "" })}
                    src={preview.src}
                    email={preview.email}
                />

                <ModalStyles />
            </main>
        </AdminLayout>
    );
}
