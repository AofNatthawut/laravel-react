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

Route::apiResource('/product', ProductController::class);


Route::apiResource('/movies', ThaiMovieController::class);

// Route::prefix('movies')->group(function () {
//    Route::get('/', [ThaiMovieController::class, 'index']);       // GET /api/movies
//    Route::get('{id}', [ThaiMovieController::class, 'show']);     // GET /api/movies/{id}
//     Route::post('/', [ThaiMovieController::class, 'store']);      // POST /api/movies
//     Route::put('{id}', [ThaiMovieController::class, 'update']);   // PUT /api/movies/{id}
//     Route::delete('{id}', [ThaiMovieController::class, 'destroy']); // DELETE /api/movies/{id}
//     Route::get('/movies', [ThaiMovieController::class, 'index']);
//     Route::post('/movies', [ThaiMovieController::class, 'store']);
//     Route::put('/movies/{id}', [ThaiMovieController::class, 'update']);
//     Route::delete('/movies/{id}', [ThaiMovieController::class, 'destroy']);}
// );
