import Link from "next/link";
import MovieTable from "./components/MovieTable";

const MOVIES_ENDPOINT =
  "https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net/api/movies";

//agrego page y limit para la paginiacion
  async function getMovies(page, limit) {
  
  const res = await fetch(`${MOVIES_ENDPOINT}?page=${page}&limit=${limit}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("No se pudo obtener el listado de películas");
  }
  return res.json();
}

//5 agrego search parameters para la busqueda
export default async function MoviesPage({ searchParams }) {
  const params = await searchParams;

  const page = params?.page ? parseInt(params.page) : 1;
  const limit = params?.limit ? parseInt(params.limit) : 5;

  const movies = await getMovies(page, limit);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">
            ← Volver a inicio
          </Link>
          <h1 className="text-3xl font-bold">Películas</h1>
          <p className="text-zinc-300">
            Seleccioná una fila para ver el detalle cuando se implemente la ruta correspondiente.
          </p>
        </div>

        <MovieTable movies={movies} />

<div className="mt-4 flex justify-center gap-6 text-sm">
  {page > 1 && (
    <Link href={`/movies?page=${page - 1}&limit=${limit}`}>
      Anterior
    </Link>
  )}

  <span>Página {page}</span>

  {movies.length === limit && (
    <Link href={`/movies?page=${page + 1}&limit=${limit}`}>
      Siguiente
    </Link>
  )}
</div>
        
      </main>
    </div>
  );
}
