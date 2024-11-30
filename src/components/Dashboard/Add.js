import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ movies, setMovies, setIsAdding }) => {
  const [movieName, setMovieName] = useState('');
  const [moviePosterLink, setMoviePosterLink] = useState('');
  const [movieLink, setMovieLink] = useState('');
  const [movieCategory, setMovieCategory] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!movieName || !moviePosterLink || !movieCategory || !movieLink) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newMovie = {
      movieName,
      moviePosterLink,
      movieLink,
      movieCategory,
    };

    // Show SweetAlert loader
    Swal.fire({
      title: 'Adding Movie...',
      text: 'Please wait while the movie is being added.',
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        `https://wcgw2uzznhfggkba2kkhw7hyeq0ppkne.lambda-url.ap-south-1.on.aws/?movie_name=${encodeURIComponent(
          newMovie.movieName
        )}&poster_url=${encodeURIComponent(
          newMovie.moviePosterLink
        )}&movie_link=${encodeURIComponent(
          newMovie.movieLink
        )}&category=${encodeURIComponent(newMovie.movieCategory)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add movie');
      }
      const result = await response.json();

      // Update state and local storage
      setMovies((prev) => [...prev, { id: result.id, ...newMovie }]);
      setIsAdding(false);

      // Close the loader and show success alert
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${movieName} has been added successfully.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Close the loader and show error alert
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add movie. Please try again later.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Movie</h1>
        <label htmlFor="movieName">Movie Name</label>
        <input
          id="movieName"
          type="text"
          name="movieName"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label htmlFor="moviePosterLink">Movie Poster Link</label>
        <input
          id="moviePosterLink"
          type="text"
          name="moviePosterLink"
          value={moviePosterLink}
          onChange={(e) => setMoviePosterLink(e.target.value)}
        />
        <label htmlFor="movieLink">Movie Link</label>
        <input
          id="movieLink"
          type="text"
          name="movieLink"
          value={movieLink}
          onChange={(e) => setMovieLink(e.target.value)}
        />
        <label htmlFor="moviesCategory">Movie Category</label>
        <select
          id="moviesCategory"
          name="moviesCategory"
          value={movieCategory}
          onChange={(e) => setMovieCategory(e.target.value)}
        >
            <option value="">Select a Category</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
        </select>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
