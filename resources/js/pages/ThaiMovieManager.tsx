import BootstrapLayout from "@/layouts/BootstrapLayout";
import React, { useState, useEffect } from "react";

type Movie = {
    id?: number;
    title: string;
    description: string;
    director: string;
    year: string;
    image: string;
};

const ThaiMovieManager = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [formVisible, setFormVisible] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [formData, setFormData] = useState<Movie>({
        title: "",
        description: "",
        director: "",
        year: "",
        image: ""
    });
    const [errors, setErrors] = useState<Partial<Record<keyof Movie, string>>>({});

    const loadMovies = async () => {
        try {
            const res = await fetch("/api/movies");
            const data = await res.json();
            setMovies(data);
        } catch (err) {
            console.error("Error fetching movies:", err);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this movie?")) {
            const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
            if (res.ok) {
                setMovies(movies.filter((m) => m.id !== id));
                alert("Deleted successfully");
            }
        }
    };

    const openForm = (movie: Movie | null = null) => {
        setErrors({});
        setFormVisible(true);
        setEditingMovie(movie);
        if (movie) {
            setFormData(movie);
        } else {
            setFormData({
                title: "",
                description: "",
                director: "",
                year: "",
                image: ""
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingMovie ? `/api/movies/${editingMovie.id}` : "/api/movies";
        const method = editingMovie ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
            alert(editingMovie ? "Movie updated" : "Movie added");
            setFormVisible(false);
            setEditingMovie(null);
            loadMovies();
        } else {
            setErrors(data.errors || {});
        }
    };

    return (
        <BootstrapLayout>
            <div className="container-fluid bg-dark text-light min-vh-100 py-5">
                <div className="container">
                    <h1 className="text-center mb-4" style={{ fontFamily: "'Mali', cursive" }}>
                        🎬 Thai BL Series ซีรี่ย์วาย 🎬
                    </h1>

                    <div className="text-center mb-4">
                        <button className="btn btn-success" onClick={() => openForm()}>
                            <i className="bi bi-plus-circle"></i> Add Movie
                        </button>
                    </div>

                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {movies.map((movie) => (
                            <div className="col" key={movie.id}>
                                <div className="card bg-secondary text-light h-100 shadow-sm" style={{ borderRadius: "1rem" }}>
                                    <img
                                        src={movie.image}
                                        className="card-img-top"
                                        alt={movie.title}
                                        style={{
                                        height: "360px",
                                        objectFit: "contain",
                                        borderBottom: "4px solid #f8bbd0"
                                    }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ fontFamily: "'Mali', cursive" }}>{movie.title}</h5>
                                        <p>{movie.description}</p>
                                        <p className="text-muted">🎥 {movie.director} | {movie.year}</p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-dark border-0">
                                        <button className="btn btn-warning btn-sm" onClick={() => openForm(movie)}>
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(movie.id!)}>
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal Form */}
                    {formVisible && (
                        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content bg-dark text-light">
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-header border-secondary">
                                            <h5 className="modal-title">
                                                {editingMovie ? "Edit Movie" : "Add New Movie"}
                                            </h5>
                                            <button type="button" className="btn-close bg-light" onClick={() => setFormVisible(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            {(["title", "description", "director", "year", "image"] as (keyof Movie)[]).map((field) => (
                                                <div className="mb-3" key={field}>
                                                    <label className="form-label text-capitalize">{field}</label>
                                                    {field === "description" ? (
                                                        <textarea
                                                            className="form-control bg-secondary text-light"
                                                            name={field}
                                                            value={formData[field]}
                                                            onChange={handleChange}
                                                        />
                                                    ) : (
                                                        <input
                                                            type={field === "year" ? "number" : "text"}
                                                            className="form-control bg-secondary text-light"
                                                            name={field}
                                                            value={formData[field]}
                                                            onChange={handleChange}
                                                        />
                                                    )}
                                                    {errors[field] && <small className="text-danger">{errors[field]}</small>}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="modal-footer border-secondary">
                                            <button type="button" className="btn btn-secondary" onClick={() => setFormVisible(false)}>
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                {editingMovie ? "Update" : "Save"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </BootstrapLayout>
    );
};

export default ThaiMovieManager;
