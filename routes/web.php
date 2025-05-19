<?php

use App\Models\Product;
use App\Models\ThaiMovie;
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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('/test', function () {
    return Inertia::render('test');
})->name('test');

Route::get('/tictactoe', function () {
    return Inertia::render('tictactoe');
})->name('tictactoe');

Route::get('/fruit', function () {
    return Inertia::render('fruit');
})->name('fruit');


Route::get('/hello-teacher', function () {
    return Inertia::render('HelloTeacher');
})->name('hello-teacher');


Route::get('/about-page', function () {
    return Inertia::render('AboutPage');
})->name('about-page');


Route::get('/home-page', function () {
    return Inertia::render('HomePage');
})->name('home-page');


Route::get('/bootstrap', function () {
    return Inertia::render('BootstrapContent');
})->name('bootstrap');

//routes/web.php
Route::get('/circle', function () {
    return Inertia::render('Circle');
})->name('circle');

Route::get('/counter', function () {
    return Inertia::render('Counter');
})->name('counter');


Route::get('/form-example', function () {
    return Inertia::render('FormExample');
})->name('form-example');

Route::get('/list-manager', function () {
    return Inertia::render('ListManager');
})->name('list-manager');

Route::get('/infinite-scroll', function () {
    return Inertia::render('InfiniteScrollExample');
})->name('infinite-scroll');

Route::get('/GradeSystem', function () {
    return Inertia::render('GradeSystem');
})->name('GradeSystem');

// routes/web.php
// use App\Models\Product;
Route::get('/product', function () {
    $products = Product::all();
    return Inertia::render('ProductList', compact('products'));
})->name('product');

// routes/web.php
Route::get('/product-others', function () {
    return Inertia::render('ProductOthers');
})->name('product-others');


// Route::get('/ThaiMovies', function () {
//     return Inertia::render('ThaiMovies');
// });



Route::get('/product-manager', function () {
    $p = Product::all();
    return Inertia::render('ProductManager', compact('p'));
})->name('product-manager');

Route::get('/product/create', function () {
    return Inertia::render('ProductForm');
})->name('product.create');

Route::get('/product/{id}/edit', function ($id) {
    $product = Product::findOrFail($id);
    return Inertia::render('ProductForm', compact('product'));
})->name('product.edit');




Route::get('/thai-movie/create', function () {
    return Inertia::render('ThaiMovieForm', [
        'movie' => null,
    ]);
})->name('thai-movie.create');

Route::get('/thai-movie/{id}/edit', function ($id) {
    $movie = ThaiMovie::findOrFail($id);
    return Inertia::render('ThaiMovieForm', [
        'movie' => $movie,
    ]);
})->name('thai-movie.edit');

Route::get('/thai-movie-manager', function () {
    return Inertia::render('ThaiMovieManager');
});