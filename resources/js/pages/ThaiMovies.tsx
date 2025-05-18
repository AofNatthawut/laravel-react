import BootstrapLayout from "@/layouts/BootstrapLayout";
import React, { useState, useEffect } from "react";


const ThaiMovies = () => {
    const [movies, setMovies] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch("/api/movies");
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("There was an error fetching the movies!", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <BootstrapLayout>
            <div className="container my-5">
                <h1
                    className="text-center mb-5"
                    style={{
                        color: "#d63384",
                        fontFamily: "'Mali', cursive",
                        fontSize: "2.75rem",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                    }}
                >
                    🌸 Thai BL Movies ซีรีส์วายยอดฮิต !! 🌸
                </h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {movies.map((item: any) => (
                        <div className="col" key={item.id}>
                            <div
                                className="card h-100 border-0 shadow-lg"
                                style={{
                                    borderRadius: "1.5rem",
                                    overflow: "hidden",
                                    background: "linear-gradient(135deg, #fff0f5, #ffe6f0)",
                                    transition: "transform 0.3s ease-in-out"
                                }}
                            >
                                <img
                                    src={item.image}
                                    className="card-img-top"
                                    alt={item.title}
                                    style={{
                                        height: "360px",
                                        objectFit: "contain",
                                        borderBottom: "4px solid #f8bbd0"
                                    }}
                                />
                                <div
                                    className="card-body"
                                    style={{
                                        fontFamily: "'Sarabun', sans-serif",
                                        padding: "1.5rem",
                                        color: "#4a4a4a"
                                    }}
                                >
                                    <h5
                                        className="card-title"
                                        style={{
                                            fontFamily: "'Mali', cursive",
                                            fontSize: "1.5rem",
                                            color: "#b03060"
                                        }}
                                    >
                                        {item.title}
                                    </h5>
                                    <p
                                        className="card-text"
                                        style={{
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            color: "#555"
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                    <p
                                        className="text-muted"
                                        style={{
                                            fontSize: "0.85rem",
                                            fontStyle: "italic"
                                        }}
                                    >
                                        🎬 กำกับโดย: <strong>{item.director}</strong> | {item.year}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BootstrapLayout>
    );
};

export default ThaiMovies;
