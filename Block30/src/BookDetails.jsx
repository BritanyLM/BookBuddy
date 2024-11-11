import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetails() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
      .then(response => {
       
        console.log('Fetched book details:', response.data);

        if (response.data.book) {
          setBook(response.data.book); 
        } else {
          setError('Book not found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
        setError('Failed to fetch book details');
        setLoading(false);
      });
  }, [id]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>No book details found.</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <img src={book.coverimage} alt={book.title} style={{ width: '200px' }} />
      <p>Available: {book.available ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default BookDetails;

