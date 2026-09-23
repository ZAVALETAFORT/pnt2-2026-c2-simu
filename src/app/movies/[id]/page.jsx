"use client";

//4. Mostrar al menos: title, plot, cast, year y genres

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function MovieDetail() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (params.id) {
      // Uso la URL backend buscop por ID:
      fetch(`https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net/api/movies/${params.id}`)
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((err) => console.error(err));
    }
  }, [params.id]);

  if (!movie) return <p className="p-8 text-white">Cargando detalle...</p>;

  return (
    <div className="p-8 text-white">
      <button onClick={() => router.back()} className="mb-6 text-zinc-400 underline">
        ← Volver
      </button>
      
      <h1 className="mb-4 text-3xl font-bold">Titulo: {movie.title}</h1>
      
      <div className="flex flex-col gap-2">
        
        <p><strong>Sinopsis:</strong> {movie.plot || "-"}</p>
        <p><strong>Reparto:</strong> {movie.cast?.length ? movie.cast.join(", ") : "-"}</p>
        <p><strong>Año:</strong> {movie.year || "-"}</p>
        <p><strong>Géneros:</strong> {movie.genres?.length ? movie.genres.join(", ") : "-"}</p>
      </div>
    </div>
  );
}