import React from "react";
import { Trash2, X } from "lucide-react";

export default function DeleteBioticIndexModal({
    isOpen,
    onClose,
    parameter,
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
                        Konfirmasi Hapus
                    </h3>

                    <p className="text-white/90 text-base leading-relaxed mb-2 px-4 drop-shadow-md">
                        Apakah Anda yakin ingin menghapus parameter biotic index
                    </p>
                    <p className="text-white font-bold text-lg mb-6 drop-shadow-lg">
                        {parameter?.name}
                    </p>
                    <p className="text-white/80 text-sm mb-10 drop-shadow-md">
                        Tindakan ini tidak dapat dibatalkan.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            disabled={processing}
                            className="flex-1 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/30 hover:border-white/60 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={processing}
                            className="flex-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-red-700 hover:via-red-600 hover:to-red-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {processing ? "Menghapus..." : "Ya, Hapus"}
                                <Trash2 className="text-lg" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0 blur-xl transition-opacity duration-500"></div>
                        </button>
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
