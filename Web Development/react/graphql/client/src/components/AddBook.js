import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form'
import { getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'

function useDisplayAuthors(){     
    const { loading, data } = useQuery(getAuthorsQuery);
    if (loading) return <option disabled>Loading Authors...</option>;

    return (data.authors.map(author => {     
        return (  
            <option key= {author.id} value={author.id}>{author.name}</option>
        );     
    }));   
};

function AddBook() {  
    const defaultValues = {
        name:"",
        genre:"",
        author:""
    }

    const { register, handleSubmit, errors, setValue ,reset } = useForm({defaultValues});
    const [addBook] = useMutation(addBookMutation);

    const [bookName, setName] = useState("");
    const [bookGenre, setGenre] = useState("");
    const [bookAuthorId, setAuthorId] = useState("");      

    const onSubmit = () => {      
        addBook({variables: {
            name: bookName,
            genre: bookGenre,
            authorId: bookAuthorId
        },
        refetchQueries: [{query: getBooksQuery}]});    
        
        reset({defaultValues});

        setAuthorId("");
        setGenre("");
        setName("");
    };

    return(
        <form id="add-book" onSubmit= {handleSubmit(onSubmit)}>
        <div className="field">
            <label>Book name:</label>
            <input name="name" type="text" ref={register({validate: value => value.trim().length > 0})} onChange={(e) => {setName(e.target.value.trim())}}/>
            {errors.name && <p className="form-field-required">This field is required</p>}
        </div>

        <div className="field">
            <label>Genre:</label>
            <input name="genre" type="text" ref={register({validate: value => value.trim().length > 0})} onChange={(e) => setGenre(e.target.value.trim())}/>
            {errors.genre && <p className="form-field-required">This field is required</p>}
        </div>

        <div className="field">
            <label>Author:</label>
            <select ref={register({name: "author"}, { required: true })} onChange={(e) => {setValue("author", e.target.value); setAuthorId(e.target.value)}}>
                <option defaultValue hidden>Select Author</option>   
                {useDisplayAuthors()}
            </select>     
            {errors.author && <p className="form-field-required">This field is required</p>}         
        </div>

        <button>+</button>
    </form>
)}

export default AddBook