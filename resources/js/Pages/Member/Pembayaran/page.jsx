import React, { useState, useEffect } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import { ChevronLeft, ChevronRight, Eye, X, Trash2 } from "lucide-react";
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

function CancelPaymentModal({
    isOpen,
    onClose,
    onConfirm,
    processing,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/50 transition-all duration-500"
                onClick={onClose}
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full transform transition-all animate-modal-appear overflow-hidden border border-white/30">
                <div className="h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 shadow-lg"></div>

                <button
                    onClick={onClose}
                    disabled={processing}
                    className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 group z-10 border border-white/40 hover:border-white/60 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <X className="text-xl text-white group-hover:rotate-90 transition-all duration-300 drop-shadow-lg" />
                </button>

                <div className="p-10 pt-12 text-center">
                    <div className="relative mx-auto w-24 h-24 mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                        <div className="absolute inset-2 bg-gradient-to-br from-red-400/30 to-red-500/30 rounded-full blur-lg animate-pulse-slower"></div>
                        <div className="absolute inset-3 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl animate-icon-float border-4 border-white/30">
                            <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm"></div>
                            <Trash2 className="text-white text-5xl relative z-10 drop-shadow-lg" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-300/40 animate-spin-slow"></div>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                        Konfirmasi Pembatalan
                    </h3>

                    <p className="text-white/90 text-base leading-relaxed mb-6 px-4 drop-shadow-md">
                        Apakah Anda yakin ingin membatalkan transaksi pembayaran ini?
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            disabled={processing}
                            className="flex-1 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/30 hover:border-white/60 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            Tutup
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={processing}
                            className="flex-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-red-700 hover:via-red-600 hover:to-red-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {processing ? "Membatalkan..." : "Ya, Batalkan"}
                                <Trash2 className="text-lg" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MemberPembayaran({ auth, payments }) {
    const { flash } = usePage().props;
    const [previewModal, setPreviewModal] = useState({ open: false, src: "" });
    const [perPage, setPerPage] = useState(payments.per_page || 10);
    const [showCancelModal, setShowCancelModal] = useState({ open: false, id: null });

    const { post, processing } = useForm();

    const isMembershipActive = auth.user.membership;

    const pendingPayment = payments?.data?.find((payment) => payment.status.toLowerCase() === "pending");
    const hasPendingPayment = !!pendingPayment;

    // Load Midtrans Snap script
    useEffect(() => {
        const clientKey = "Mid-client-GMbKIZPX6C8HOMjU"; // from .env MIDTRANS_CLIENT_KEY
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // Use sandbox for testing
        script.setAttribute("data-client-key", clientKey);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const triggerSnap = (token) => {
        console.log("triggerSnap called with token:", token);
        console.log("window.snap exists:", !!window.snap);
        
        if (!window.snap) {
            toast.error("Sistem pembayaran belum siap. Silakan refresh halaman.");
            return;
        }

        window.snap.pay(token, {
            onSuccess: function (result) {
                console.log("Midtrans Success:", result);
                toast.success("Pembayaran berhasil!");
                router.reload();
            },
            onPending: function (result) {
                console.log("Midtrans Pending:", result);
                toast.info("Menunggu pembayaran diselesaikan.");
                router.reload();
            },
            onError: function (result) {
                console.error("Midtrans Error:", result);
                toast.error("Pembayaran gagal.");
                router.reload();
            },
            onClose: function () {
                console.log("Midtrans Closed Manually");
                toast.info("Membutuhkan tindak lanjut pembayaran.");
                router.reload();
            }
        });
    };

    // Listen for snapToken from backend flash data
    useEffect(() => {
        console.log("Current Flash data:", flash);
        if (flash?.snapToken) {
            console.log("Detected snapToken in flash data:", flash.snapToken);
            triggerSnap(flash.snapToken);
        }
    }, [flash]);

    const handleJoinMembership = () => {
        console.log("handleJoinMembership clicked");
        if (pendingPayment?.snap_token) {
            console.log("Resuming pending payment with token:", pendingPayment.snap_token);
            // Already initialized, resume payment
            triggerSnap(pendingPayment.snap_token);
        } else {
            console.log("Initiating new POST to /member/pembayaran");
            // Initialize new payment
            post("/member/pembayaran", {
                preserveScroll: true,
                onSuccess: (page) => {
                    console.log("POST /member/pembayaran success! Page props:", page.props);
                },
                onError: (errors) => {
                    console.error("POST /member/pembayaran error:", errors);
                    toast.error("Gagal memulai proses pembayaran.");
                }
            });
        }
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

    const getStatusText = (status) => {
        if (!status) return null;
        switch (status.toLowerCase()) {
            case "approved":
                return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-300">Berhasil</span>;
            case "pending":
                return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-yellow-300">Pending</span>;
            case "rejected":
                return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-red-300">Gagal/Ditolak</span>;
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
                                    <div className="flex flex-row items-center gap-3">
                                        <span className="flex items-center gap-2 text-green-600 font-bold bg-green-100/50 px-3 py-1 rounded-lg">
                                            <FaCheckCircle /> Aktif
                                        </span>
                                        {auth.user.membership_start_at && auth.user.membership_end_at && (
                                            <div className="text-sm text-gray-700 font-semibold bg-gray-100/80 px-3 py-1 rounded-lg border border-gray-200">
                                                {formatDate(auth.user.membership_start_at)} <span className="text-gray-400 mx-1">-</span> {formatDate(auth.user.membership_end_at)}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <span className="flex items-center gap-2 text-red-600 font-bold bg-red-100/50 px-3 py-1 rounded-lg">
                                        <FaTimesCircle /> Tidak Aktif
                                    </span>
                                )}
                            </div>
                            
                            {!isMembershipActive && (
                                <button
                                    onClick={handleJoinMembership}
                                    disabled={processing}
                                    className={`px-8 py-4 rounded-2xl font-bold text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-2
                                        ${processing 
                                            ? 'bg-gray-400 cursor-not-allowed opacity-80' 
                                            : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:scale-105 hover:shadow-2xl'
                                        }`}
                                >
                                    <FaMoneyBillWave className="w-5 h-5" />
                                    {hasPendingPayment ? "Selesaikan Pembayaran" : "Join Membership"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Pending Notice */}
                    {hasPendingPayment && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-pulse-slow">
                            <FaClock className="text-yellow-600 w-6 h-6 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-yellow-800 font-bold text-lg">Pembayaran Menunggu Penyelesaian</h3>
                                <p className="text-yellow-700 text-sm mt-1 font-medium">Anda memiliki transaksi yang belum selesai. Silakan klik "Selesaikan Pembayaran" untuk melanjutkan, atau batalkan transaksi di riwayat bawah.</p>
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
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Tanggal Dibuat</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {payments.data.length > 0 ? (
                                        payments.data.map((payment, index) => (
                                            <tr key={payment.id} className="hover:bg-blue-50 transition-colors duration-200">
                                                <td className="px-6 py-4 text-sm text-gray-700">{(payments.from || 1) + index}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {payment.order_id ? (
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-blue-600 font-mono text-xs bg-blue-50 py-1 px-2 rounded border border-blue-100">{payment.order_id}</span>
                                                        </div>
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
                                                    {formatDate(payment.created_at)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        {payment.status?.toLowerCase() === "pending" && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowCancelModal({ open: true, id: payment.id });
                                                                }}
                                                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all duration-300 bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-0.5"
                                                                title="Batalkan Transaksi"
                                                            >
                                                                <FaTimes className="w-4 h-4 drop-shadow-sm" />
                                                                <span>Batalkan</span>
                                                            </button>
                                                        )}
                                                        {payment.status?.toLowerCase() !== "pending" && (
                                                            <span className="text-gray-400 italic text-xs">Tidak ada aksi</span>
                                                        )}
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

                {/* Legacy Image Preview Modal */}
                <ProofPreviewModal
                    isOpen={previewModal.open}
                    onClose={() => setPreviewModal({ open: false, src: "" })}
                    src={previewModal.src}
                />

                {/* Confirm Cancel Modal */}
                <CancelPaymentModal
                    isOpen={showCancelModal.open}
                    onClose={() => setShowCancelModal({ open: false, id: null })}
                    onConfirm={() => {
                        if (showCancelModal.id) {
                            router.delete(`/member/pembayaran/${showCancelModal.id}`, {
                                preserveScroll: true,
                                onSuccess: () => {
                                    setShowCancelModal({ open: false, id: null });
                                    toast.success("Riwayat pembayaran berhasil dibatalkan.");
                                },
                                onError: () => toast.error("Gagal membatalkan riwayat pembayaran."),
                            });
                        }
                    }}
                    processing={processing}
                />
            </main>
        </MemberLayout>
    );
}
