<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ThaiMovieController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/product', function () {
    $products = Product::all(); // Fetch all products
    return response()->json($products); // Return as JSON
});


//Route::get('/movies', [ThaiMovieController::class, 'index']);


Route::apiResource('/product', ProductController::class);

Route::apiResource('/thai_movies', ThaiMovieController::class);
//Route::apiResource('movie', ThaiMovieController::class);
