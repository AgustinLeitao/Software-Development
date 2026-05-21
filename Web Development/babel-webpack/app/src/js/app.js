import { person, getPosts } from './lib.js';
import css from '../css/style.css';

var printPerson = () => console.log(person);
var printPosts = async () => console.log(await getPosts());

printPerson();
printPosts();