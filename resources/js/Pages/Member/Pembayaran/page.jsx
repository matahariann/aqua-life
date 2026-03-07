import React, { useState, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import { FaMoneyBillWave, FaUpload, FaTimes, FaCamera, FaHistory, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import MemberLayout from "@/Layouts/MemberLayout";

export default function MemberPembayaran({ auth, payments }) {
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState(null);
    const [perPage, setPerPage] = useState(payments.per_page || 10);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
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

        post("/member/pembayaran", {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false);
                reset();
                setPreview(null);
                toast.success("Bukti pembayaran berhasil diunggah!");
            },
            onError: (errors) => {
                toast.error("Gagal mengunggah bukti pembayaran.");
                console.error(errors);
            }
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
        switch (status) {
            case "Approved":
                return <FaCheckCircle className="text-green-500 w-5 h-5" />;
            case "Pending":
                return <FaClock className="text-yellow-500 w-5 h-5" />;
            case "Rejected":
                return <FaTimesCircle className="text-red-500 w-5 h-5" />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "Approved":
                return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-300">DITERIMA</span>;
            case "Pending":
                return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-yellow-300">MENUNGGU VERIFIKASI</span>;
            case "Rejected":
                return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-red-300">DITOLAK</span>;
            default:
                return null;
        }
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
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50/80 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                <FaHistory className="text-blue-500 opacity-80" />
                                Riwayat Pembayaran
                            </h2>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-semibold text-gray-500">Tampilkan:</label>
                                <select 
                                    value={perPage} 
                                    onChange={handlePerPageChange}
                                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition-all"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Tanggal</th>
                                        <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Bukti Pembayaran</th>
                                        <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {payments.data.length > 0 ? (
                                        payments.data.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-bold text-gray-800">
                                                            {new Date(payment.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </span>
                                                        <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                                                            <FaClock className="w-3 h-3" />
                                                            {new Date(payment.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="relative group w-32 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all">
                                                        <img 
                                                            src={`/storage/${payment.proof}`} 
                                                            alt="Bukti" 
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            onClick={() => window.open(`/storage/${payment.proof}`, '_blank')}
                                                        />
                                                        <div 
                                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white"
                                                            onClick={() => window.open(`/storage/${payment.proof}`, '_blank')}
                                                        >
                                                            <FaCamera className="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(payment.status)}
                                                        {getStatusText(payment.status)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-16 text-center text-gray-400 font-medium">
                                                <div className="flex flex-col items-center gap-3">
                                                    <FaHistory className="w-12 h-12 text-gray-200" />
                                                    <p>Belum ada riwayat pembayaran.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {payments.last_page > 1 && (
                            <div className="bg-gray-50/80 px-8 py-5 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                    Menampilkan {payments.from || 0} - {payments.to || 0} dari {payments.total}
                                </span>
                                <div className="flex gap-2">
                                    {payments.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm
                                                ${link.active 
                                                    ? 'bg-blue-600 text-white shadow-blue-500/30' 
                                                    : !link.url 
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                        : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
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
            </main>
        </MemberLayout>
    );
}
