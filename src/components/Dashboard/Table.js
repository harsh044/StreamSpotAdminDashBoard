import React from 'react';

const Table = ({ movies, handleEdit, handleDelete }) => {
  // movies.forEach((movie, i) => {
  //   movie._id // Assign IDs dynamically
  // });

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 0,
  // });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Movie Link</th>
            <th>Movie Poster Link</th>
            <th>Movie Category</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie, i) => (
              <tr key={movie._id}>
                <td>{movie.movie_name}</td>
                <td>{movie.movie_link}</td>
                <td>{movie.movie_poster_link}</td>
                <td>{movie.movie_category}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(movie._id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Movies</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
