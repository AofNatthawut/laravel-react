import BootstrapLayout from "@/layouts/BootstrapLayout";
import React, { useState, useEffect } from "react";

const ThaiMovieManager = ({ movies }: any) => {
    const [movieList, setMovieList] = useState<any[]>([]);

    useEffect(() => {
        setMovieList(movies);
    }, []);

    const deleteMovie = async (id: number) => {
        if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบภาพยนตร์นี้?")) {
            try {
                const response = await fetch(`/api/movie/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    setMovieList(movieList.filter((movie) => movie.id !== id));
                    alert("ลบภาพยนตร์เรียบร้อยแล้ว");
                } else {
                    console.error("ไม่สามารถลบภาพยนตร์ได้");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการลบภาพยนตร์:", error);
            }
        }
    };

    return (
        <BootstrapLayout>
            <div className="container my-5">
                <h1
                    className="text-center mb-5"
                    style={{
                        color: "#d63384",
                        fontFamily: "'Mali', cursive",
                        fontSize: "2.75rem",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                >
                    🌸 Thai BL Movies ซีรีส์วายยอดฮิต !! 🌸
                </h1>

                <div className="text-end mb-4">
                    <a href="/movie/create" className="btn btn-success">
                        <i className="bi bi-plus-lg me-2"></i>เพิ่มภาพยนตร์
                    </a>
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {movieList.map((item: any) => (
                        <div className="col" key={item.id}>
                            <div
                                className="card h-100 border-0 shadow-lg"
                                style={{
                                    borderRadius: "1.5rem",
                                    overflow: "hidden",
                                    background: "linear-gradient(135deg, #fff0f5, #ffe6f0)",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="card-img-top"
                                    style={{
                                        height: "360px",
                                        objectFit: "contain",
                                        backgroundColor: "#fff",
                                        borderBottom: "4px solid #f8bbd0",
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            "https://via.placeholder.com/300x200?text=No+Image";
                                    }}
                                />
                                <div
                                    className="card-body"
                                    style={{
                                        fontFamily: "'Sarabun', sans-serif",
                                        padding: "1.5rem",
                                        color: "#4a4a4a",
                                    }}
                                >
                                    <h5
                                        className="card-title"
                                        style={{
                                            fontFamily: "'Mali', cursive",
                                            fontSize: "1.5rem",
                                            color: "#b03060",
                                        }}
                                    >
                                        <a
                                            href={`/movie/${item.id}/edit`}
                                            className="text-decoration-none"
                                            style={{ color: "#b03060" }}
                                        >
                                            {item.name}
                                        </a>
                                    </h5>
                                    <p
                                        className="card-text"
                                        style={{
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            color: "#555",
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                    <p
                                        className="text-muted"
                                        style={{
                                            fontSize: "0.85rem",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        🎬 กำกับโดย: <strong>{item.director || "ไม่ระบุ"}</strong> |{" "}
                                        {item.year || "ไม่ทราบปี"}
                                    </p>
                                </div>
                                <div className="card-footer bg-white border-0 text-end">
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteMovie(item.id)}
                                    >
                                        <i className="bi bi-trash me-1"></i> ลบ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BootstrapLayout>
    );
};

export default ThaiMovieManager;
