import React, { useState } from 'react';
import { getBooksQuery } from '../queries/queries'
import { useQuery } from '@apollo/react-hooks';

//components
import GetBookDetails from './GetBookDetails';
  
function GetBooks(){
  const [selected, setSelected] = useState("");
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return 'Loading...';
  if (error) return ``;
  
  return (
    <div>
        <ul id="book-list">
        {data.books.map(book =>
          <li key={book.id} onClick={(e) => setSelected(book.id)}>{book.name}</li>)}
        </ul>
        <GetBookDetails bookId={selected}/>
    </div>
  );
} 

export default GetBooks;