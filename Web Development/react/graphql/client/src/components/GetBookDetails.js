import React from 'react';
import { getBookDetails } from '../queries/queries'
import { useQuery } from "@apollo/react-hooks";

function DisplayBookDetails({book}){
  if(typeof book !== 'undefined'){
    return (<div>
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <p>All books by this author</p>
      <ul className='other-books'>
        { book.author.books.map(item =>
          <li key={item.id}>{item.name}</li>          
        )}
      </ul>
    </div>
  )}
  else{
    return(<div>No book selected...</div>);
  }
}

function GetBookDetails({bookId}){ 
  const { data } = useQuery(getBookDetails, 
    { variables: { id: bookId },
    skip: bookId === "" 
  });
  
  return (
    <div id="books-details">
      <DisplayBookDetails book={data?.book} />
    </div>
  );
}

export default GetBookDetails