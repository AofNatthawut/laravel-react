<?php

namespace App\Http\Controllers;

use App\Models\ThaiMovie;
use Illuminate\Http\Request;

class ThaiMovieController extends Controller
{
    public function index()
    {
        return response()->json(ThaiMovie::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $movie = ThaiMovie::create($request->all());

        return response()->json($movie, 201);
    }

    public function show($id)
    {
        $movie = ThaiMovie::findOrFail($id);
        return response()->json($movie);
    }

    public function update(Request $request, $id)
    {
        $movie = ThaiMovie::findOrFail($id);
        $movie->update($request->all());

        return response()->json($movie);
    }

    public function destroy($id)
    {
        $movie = ThaiMovie::findOrFail($id);
        $movie->delete();

        return response()->json(['message' => 'ลบเรียบร้อย'], 204);
    }
}
