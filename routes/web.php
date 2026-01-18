<?php

use App\Http\Controllers\AdminHistory;
use App\Http\Controllers\AdminHitungKualitasAir;
use App\Http\Controllers\AdminKelolaBobot;
use App\Http\Controllers\AdminKelolaPembayaran;
use App\Http\Controllers\AdminKelolaPengguna;
use App\Http\Controllers\AdminKelolaStation;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MemberHistory;
use App\Http\Controllers\MemberHitungKualitasAir;
use App\Http\Controllers\MemberPembayaran;
use App\Http\Controllers\OperatorHistory;
use App\Http\Controllers\OperatorHitungKualitasAir;
use App\Http\Controllers\OperatorKelolaBobot;
use App\Http\Controllers\OperatorKelolaStation;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    if (auth()->check()) {
        $user = auth()->user();
        if ($user->role === 'member') {
            return redirect()->route('member.history');
        } elseif ($user->role === 'operator') {
            return redirect()->route('operator.history');
        } elseif ($user->role === 'admin') {
            return redirect()->route('admin.kelola-pengguna');
        }
    }
    return redirect()->route('/');
})->name('root');

Route::middleware('guest')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    
    // Registrasi Routes
    Route::get('/registrasi', [AuthController::class, 'register'])->name('register');
    Route::post('/actionRegister', [AuthController::class, 'actionRegister'])->name('actionRegister');
    
    // Login Routes
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/actionLogin', [AuthController::class, 'actionLogin'])->name('actionLogin');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'actionLogout'])->name('logout');

    // Admin routes
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        // History
        Route::get('/history', [AdminHistory::class, 'index'])->name('history');

        // Hitung Kualitas Air
        Route::get('/hitung-kualitas-air', [AdminHitungKualitasAir::class, 'index'])->name('hitung-kualitas-air');

        // Kelola Bobot
        Route::get('/kelola-bobot', [AdminKelolaBobot::class, 'index'])->name('kelola-bobot');

        // Kelola Pembayaran
        Route::get('/kelola-pembayaran', [AdminKelolaPembayaran::class, 'index'])->name('kelola-pembayaran');

        // Kelola Pengguna
        Route::get('/kelola-pengguna', [AdminKelolaPengguna::class, 'index'])->name('kelola-pengguna');

        // Kelola Station
        Route::get('/kelola-station', [AdminKelolaStation::class, 'index'])->name('kelola-station');
    });

    // Operator routes
    Route::middleware('role:operator')->prefix('operator')->name('operator.')->group(function () {
        // History
        Route::get('/history', [OperatorHistory::class, 'index'])->name('history');

        // Hitung Kualitas Air
        Route::get('/hitung-kualitas-air', [OperatorHitungKualitasAir::class, 'index'])->name('hitung-kualitas-air');

        // Kelola Bobot
        Route::get('/kelola-bobot', [OperatorKelolaBobot::class, 'index'])->name('kelola-bobot');

        // Kelola Pembayaran
        Route::get('/kelola-pembayaran', [OperatorKelolaStation::class, 'index'])->name('kelola-pembayaran');
    });

    // Member routes
    Route::middleware('role:member')->prefix('member')->name('member.')->group(function () {
        // History
        Route::get('/history', [MemberHistory::class, 'index'])->name('history');

        // Hitung Kualitas Air
        Route::get('/hitung-kualitas-air', [MemberHitungKualitasAir::class, 'index'])->name('hitung-kualitas-air');

        // Pembayaran
        Route::get('/pembayaran', [MemberPembayaran::class, 'index'])->name('pembayaran');
    });

});