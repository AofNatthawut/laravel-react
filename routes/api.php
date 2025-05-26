<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ThaiMovieController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeaveController;
use Inertia\Inertia;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/product', function () {
    $products = Product::all(); // Fetch all products
    return response()->json($products); // Return as JSON
});

Route::apiResource('/product', ProductController::class);


Route::apiResource('/movies', ThaiMovieController::class);


Route::get('/leaves', [LeaveController::class, 'index']);
Route::post('/leaves', [LeaveController::class, 'store']);
Route::put('/leaves/{id}', [LeaveController::class, 'update']);
Route::delete('/leaves/{id}', [LeaveController::class, 'destroy']);
Route::put('/leaves/{id}/status', [LeaveController::class, 'updateStatus']);



Route::get('/leave-form', fn() => Inertia::render('LeaveForm'));

Route::get('/leave-form/{id}', function ($id) {
    $leave = \App\Models\Leave::findOrFail($id);
    return Inertia::render('LeaveForm', ['leave' => $leave]);
});