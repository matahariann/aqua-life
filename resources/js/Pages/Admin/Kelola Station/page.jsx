import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { FaEye, FaEdit, FaPrint } from "react-icons/fa";
import { router, Link } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";

export default function AdminKelolaStation({ histories }) {
    const [perPage, setPerPage] = useState(histories?.per_page || 10);

    useEffect(() => {
        if (histories?.per_page) {
            setPerPage(histories.per_page);
        }
    }, [histories?.per_page]);

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

    const renderPageNumbers = () => {
        if (!histories) return [];
        const pages = [];
        const currentPage = histories.current_page;
        const lastPage = histories.last_page;

        if (lastPage <= 7) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) {
                    pages.push("...");
                }
            }

            for (
                let i = Math.max(1, currentPage - 2);
                i <= Math.min(lastPage, currentPage + 2);
                i++
            ) {
                pages.push(i);
            }

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
            <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 p-3 rounded-xl shadow-lg ring-4 ring-white/30">
                                <History className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                                    Kelola Station Semua User
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Riwayat perhitungan kualitas air dari semua pengguna
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 p-1 rounded-xl shadow-lg ring-4 ring-white/30"></div>
                        
                        {/* Per Page Selector */}
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-700 font-medium">
                                    Tampilkan:
                                </label>
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
                                Menampilkan {histories?.from || 0} - {histories?.to || 0} dari {histories?.total || 0} data
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-auto max-h-[55vh] relative">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white relative sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Pengguna</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Station</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Geographical Zone</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Type of Location</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Value</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Status</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold whitespace-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {histories?.data && histories.data.length > 0 ? (
                                        histories.data.map((history, index) => (
                                            <tr key={history.id} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {histories.from + index}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {history.user?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {history.station?.name || `Station ${history.id_station}`}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {history.station?.geo_zone?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {history.station?.water_type?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {history.value}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {history.status || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={`/admin/kelola-station/${history.id}/result`} className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 p-2 rounded-lg transition-colors flex items-center gap-2" title="Lihat Hasil">
                                                            <FaEye size={16} /> <span className="hidden xl:inline">Result</span>
                                                        </Link>
                                                        <Link href={`/admin/kelola-station/${history.id}/edit`} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors flex items-center gap-2" title="Edit Data">
                                                            <FaEdit size={16} /> <span className="hidden xl:inline">Edit</span>
                                                        </Link>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const printUrl = `/admin/kelola-station/${history.id}/result?print=1`;
                                                                const iframe = document.createElement('iframe');
                                                                iframe.style.display = 'none';
                                                                iframe.src = printUrl;
                                                                document.body.appendChild(iframe);
                                                                iframe.onload = function() {
                                                                    setTimeout(function() {
                                                                        iframe.contentWindow.focus();
                                                                        iframe.contentWindow.print();
                                                                        setTimeout(() => {
                                                                            document.body.removeChild(iframe);
                                                                        }, 10000);
                                                                    }, 1000);
                                                                };
                                                            }}
                                                            className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-200 p-2 rounded-lg transition-colors flex items-center gap-2"
                                                            title="Cetak Laporan"
                                                        >
                                                            <FaPrint size={16} /> <span className="hidden xl:inline">Print</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                                Tidak ada data histori perhitungan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600">
                                Halaman {histories?.current_page || 0} dari {histories?.last_page || 0}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(histories?.prev_page_url)}
                                    disabled={!histories?.prev_page_url}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        histories?.prev_page_url
                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Prev
                                </button>

                                <div className="flex items-center gap-1 hidden sm:flex">
                                    {renderPageNumbers().map((page, index) => {
                                        if (page === "...") {
                                            return (
                                                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                                                    ...
                                                </span>
                                            );
                                        }

                                        const pageUrl = `/admin/kelola-station?page=${page}&per_page=${perPage}`;

                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(pageUrl)}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    page === histories?.current_page
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
                                    onClick={() => handlePageChange(histories?.next_page_url)}
                                    disabled={!histories?.next_page_url}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        histories?.next_page_url
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
            </main>
        </AdminLayout>
    );
}
