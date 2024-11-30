import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [movies, setMovies] = useState([]); // Initialize with an empty array
  const [selectedMovie, setSelectedMovie] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch movies data from API
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://dc6nxcp3ttcv4t5cm5m7mfo2ji0wbjdj.lambda-url.ap-south-1.on.aws/",
          {
            headers: {
              "Content-type": "application/json",
            },
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.data); // Assuming the API returns an array of employee objects
      } catch (error) {
        console.error('Error fetching movies:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to fetch movies!',
          text: error.message,
        });
      }
    };

    fetchMovies();
  }, []);

  const handleEdit = async (_id) => {
    // Find the movie by its _id
    const movie = movies.find((m) => m._id === _id);
    
    if (!movie) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Movie not found.",
      });
      return;
    }
  
    // Set the selected movie for editing
    setSelectedMovie(movie);
    setIsEditing(true);
  
    try {
  
      // Assuming the API call is successful, update the local state
      const updatedMovies = movies.map((m) =>
        m._id === _id
          ? { ...movie } // Update with any changes if needed
          : m
      );
      setMovies(updatedMovies);
    
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error updating movie:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update movie!",
        text: error.message,
      });
    }
  };    

  // Handle Delete
  const handleDelete = async (_id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) { // use `isConfirmed` instead of `value`
        try {
          // Send a DELETE request to the backend
          const response = await fetch(
            // `http://127.0.0.1:8000/delete_movie_api/delete_movie?movie_id=${encodeURIComponent(_id)}`,
            `https://pp6qykluj54toy4qqhtqahqzbu0nzzus.lambda-url.ap-south-1.on.aws/?movie_id=${encodeURIComponent(_id)}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "DELETE",
            }
          );
          
          if (!response.ok) {
            throw new Error("Failed to delete movie");
          }

          // Remove the deleted movie from the local state
          const remainingMovies = movies.filter((movie) => movie._id !== _id);
          setMovies(remainingMovies);

          // Show success message
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `The movie has been deleted successfully.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting movie:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete movie!",
            text: error.message,
          });
        }
      }
    });
  };


  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            movies={movies}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          movies={movies}
          setMovies={setMovies}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          movies={movies}
          selectedMovie={selectedMovie}
          setMovies={setMovies}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
