<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/test', function () {
    return Inertia::render('test');
})->name('test');

Route::get('/tictactoe', function () {
    return Inertia::render('tictactoe');
})->name('tictactoe');

Route::get('/fruit', function () {
    return Inertia::render('fruit');
})->name('fruit');

