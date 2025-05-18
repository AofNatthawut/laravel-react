<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ThaiMovie;
use Illuminate\Http\Request;

class ThaiMovieController extends Controller
{
    public function index()
    {
        return response()->json(ThaiMovie::all());
    }

    public function show($id)
    {
        $movie = ThaiMovie::find($id);
        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }
        return response()->json($movie);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'director' => 'nullable|string|max:255',
            'year' => 'required|integer',
            'image' => 'nullable|url',
        ]);

        $movie = ThaiMovie::create($validated);

        return response()->json(['message' => 'Movie created successfully!', 'movie' => $movie], 201);
    }

    public function update(Request $request, $id)
    {
        $movie = ThaiMovie::find($id);
        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'director' => 'nullable|string|max:255',
            'year' => 'required|integer',
            'image' => 'nullable|url',
        ]);

        $movie->update($validated);

        return response()->json(['message' => 'Movie updated successfully!', 'movie' => $movie]);
    }

    public function destroy($id)
    {
        $movie = ThaiMovie::find($id);
        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $movie->delete();

        return response()->json(['message' => 'Movie deleted successfully!']);
    }
}
