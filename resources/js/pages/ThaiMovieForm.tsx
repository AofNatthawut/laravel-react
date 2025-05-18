import BootstrapLayout from "@/layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const ThaiMovieForm = ({ movie }: any) => {
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        release_date: "",
        synopsis: "",
        image_url: "",
    });

    useEffect(() => {
        if (movie) {
            setFormData(movie);
        }
    }, [movie]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            method: movie ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        };

        try {
            const url = movie ? `/api/movies/${movie.id}` : "/api/movies";
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                alert(movie ? "Movie updated successfully!" : "Movie added successfully!");
                window.location.href = "/thai-movie-manager";
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fields: { label: string; name: keyof typeof formData; type: string }[] = [
        { label: "ชื่อเรื่อง (Title)", name: "title", type: "text" },
        { label: "แนวภาพยนตร์ (Genre)", name: "genre", type: "text" },
        { label: "วันเข้าฉาย (Release Date)", name: "release_date", type: "date" },
        { label: "ลิงก์ภาพโปสเตอร์ (Image URL)", name: "image_url", type: "text" },
    ];

    return (
        <BootstrapLayout>
            <Head title={movie ? "Edit Thai Movie" : "Create Thai Movie"} />
            <div className="min-vh-100 bg-dark text-light py-5 px-3" style={{ fontFamily: "'Mali', cursive" }}>
                <div className="container">
                    <div className="bg-secondary rounded p-4 shadow-lg">
                        <h1 className="text-center mb-4">{movie ? "🎬 Edit Thai Movie" : "🎥 Create Thai Movie"}</h1>
                        <form onSubmit={handleSubmit}>
                            {fields.map((field) => (
                                <div key={field.name} className="mb-3">
                                    <label className="form-label">{field.label}</label>
                                    <input
                                        type={field.type}
                                        className="form-control bg-dark text-light"
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.label}
                                    />
                                    {errors[field.name] && <small className="text-danger">{errors[field.name]}</small>}
                                </div>
                            ))}

                            <div className="mb-3">
                                <label className="form-label">เรื่องย่อ (Synopsis)</label>
                                <textarea
                                    className="form-control bg-dark text-light"
                                    name="synopsis"
                                    value={formData.synopsis}
                                    onChange={handleChange}
                                    placeholder="เรื่องย่อโดยย่อ"
                                    rows={4}
                                />
                                {errors.synopsis && <small className="text-danger">{errors.synopsis}</small>}
                            </div>

                            <div className="text-center mt-4">
                                <a href="/thai-movie-manager" className="btn btn-outline-light me-3">
                                    <i className="bi bi-arrow-left"></i> Back
                                </a>
                                <button type="submit" className="btn btn-primary">
                                    <i className="bi bi-save"></i> {movie ? "Update" : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </BootstrapLayout>
    );
};

export default ThaiMovieForm;
