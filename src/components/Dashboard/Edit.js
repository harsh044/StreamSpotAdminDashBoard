import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ selectedMovie, setMovies, setIsEditing, movies }) => {
  const id = selectedMovie._id;

  const [moviesName, setMovieName] = useState(selectedMovie.movie_name);
  const [moviesPosterLink, setMoviePosterLink] = useState(selectedMovie.movie_poster_link);
  const [moviesCategory, setMovieCategory] = useState(selectedMovie.movie_category);
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!moviesName || !moviesPosterLink || !moviesCategory) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    // setIsLoading(true); // Show loader before API call
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
      // API Call to Update Movie
      const apiUrl = `https://2y7kcpqd5ytswf7b7bgqfkiwia0jrjgg.lambda-url.ap-south-1.on.aws/?movie_id=${id}&movie_name=${moviesName}&poster_url=${moviesPosterLink}&category=${moviesCategory}`;
      
      console.log("apiurl >>", apiUrl);

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update movie.');
      }

      // Update the movie in local state
      const updatedMovies = movies.map((movie) =>
        movie._id === id
          ? {
              ...movie,
              movie_name: moviesName,
              movie_poster_link: moviesPosterLink,
              movie_category: moviesCategory,
            }
          : movie
      );

      setMovies(updatedMovies);
      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${moviesName} has been updated successfully.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update!',
        text: error.message || 'An unknown error occurred.',
        showConfirmButton: true,
      });
    } finally {
      setIsLoading(false); // Hide loader after API call
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Movies</h1>
        {isLoading ? (
          <div className="loader"></div> // Show loader when `isLoading` is true
        ) : (
          <>
            <label htmlFor="moviesName">Movie Name</label>
            <input
              id="moviesName"
              type="text"
              name="moviesName"
              value={moviesName}
              onChange={(e) => setMovieName(e.target.value)}
              disabled={isLoading} // Disable inputs when loading
            />
            <label htmlFor="moviesPosterLink">Movie Poster Link</label>
            <input
              id="moviesPosterLink"
              type="text"
              name="moviesPosterLink"
              value={moviesPosterLink}
              onChange={(e) => setMoviePosterLink(e.target.value)}
              disabled={isLoading} // Disable inputs when loading
            />
            <label htmlFor="moviesCategory">Movie Category</label>
            <select
              id="moviesCategory"
              name="moviesCategory"
              value={moviesCategory}
              onChange={(e) => setMovieCategory(e.target.value)}
              disabled={isLoading} // Disable inputs when loading
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
              <input type="submit" value="Update" disabled={isLoading} />
              <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="button"
                value="Cancel"
                onClick={() => setIsEditing(false)}
                disabled={isLoading} // Disable buttons when loading
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Edit;
