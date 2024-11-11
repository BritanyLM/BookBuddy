import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);

    const getBooks= async () => {
        axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`) 
        .then(response => {
            console.log(response.data)
            setBooks(response.data.books);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
    }
    useEffect(() => {
        getBooks();

    },[]);

    return (
      <div>
        <h1>Library Catalog</h1>
        <ul>
            {books && (

                books.map(book => (
                    <li key={book.id}>
                <Link to={`/book/${book.id}`}>{book.title}</Link>
               </li>
            )
            ))}
        </ul>
      </div>  
    );
}

export default BookList;