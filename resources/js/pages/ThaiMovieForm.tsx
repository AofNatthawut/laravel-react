import BootstrapLayout from "@/layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const ThaiMovieForm = ({ movie }: any) => {
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        year: "",
        image: "",
    });

    useEffect(() => {
        if (movie) {
            setFormData(movie);
        }
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
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
            let url = movie ? `/api/movie/${movie.id}` : "/api/movie";
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                let msg = movie
                    ? "Movie updated successfully!"
                    : "Movie added successfully!";
                alert(msg);
                window.location.href = "/thai-movie-manager";
            } else {
                setErrors(data.errors);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <BootstrapLayout>
            <Head title="Thai Movie Form" />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm border-primary">
                            <div className="card-header bg-primary text-white">
                                <h3 className="mb-0">
                                    <i className="bi bi-film"></i>{" "}
                                    {movie ? "แก้ไขข้อมูลภาพยนตร์" : "เพิ่มภาพยนตร์ใหม่"}
                                </h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} noValidate>
                                    {/* ชื่อภาพยนตร์ */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-type"></i> ชื่อภาพยนตร์
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Movie Name"
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
                                        )}
                                    </div>

                                    {/* เรื่องย่อ */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-card-text"></i> เรื่องย่อ
                                        </label>
                                        <textarea
                                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Movie Description"
                                            rows={4}
                                        />
                                        {errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )}
                                    </div>

                                    {/* ราคา */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-cash-coin"></i> ราคา (ถ้ามี)
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="Movie Price"
                                        />
                                        {errors.price && (
                                            <div className="invalid-feedback">{errors.price}</div>
                                        )}
                                    </div>

                                    {/* ปี */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-cash-coin"></i> ปี
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.year ? "is-invalid" : ""}`}
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            placeholder="Movie Year"
                                        />
                                        {errors.year && (
                                            <div className="invalid-feedback">{errors.year}</div>
                                        )}
                                    </div>

                                    {/* ลิงก์ภาพ */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-image"></i> ลิงก์ภาพ
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="Image URL"
                                        />
                                        {errors.image && (
                                            <div className="invalid-feedback">{errors.image}</div>
                                        )}
                                    </div>

                                    {/* Preview ภาพ */}
                                    {formData.image && (
                                        <div className="text-center mb-4">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="img-fluid rounded shadow"
                                                style={{ maxHeight: "300px" }}
                                            />
                                        </div>
                                    )}

                                    {/* ปุ่มบันทึกและกลับ */}
                                    <div className="d-flex justify-content-between">
                                        <a href="/thai-movie-manager" className="btn btn-outline-secondary">
                                            <i className="bi bi-arrow-left"></i> กลับ
                                        </a>
                                        <button type="submit" className="btn btn-success">
                                            <i className="bi bi-save"></i> บันทึกข้อมูล
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BootstrapLayout>
    );
};

export default ThaiMovieForm;
