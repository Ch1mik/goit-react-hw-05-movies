import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./SharedLayout";
import { lazy, Suspense } from "react";

const Home = lazy(() => import('./Pages/Home/Home')).then(module => ({default: module.Home}));
const Movies = lazy(() => import('./Pages/Movies/Movies')).then(module => ({default: module.Movies}));
const MovieDetails = lazy(() => import('./Pages/MovieDetails/MovieDetails')).then(module => ({ default: module.MovieDetails }));

export const App = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} /> 
          <Route path="/movies/:movieId/*" element={<MovieDetails />} />
        </Route> 
      </Routes>
      </Suspense>
      </>
  );
};

