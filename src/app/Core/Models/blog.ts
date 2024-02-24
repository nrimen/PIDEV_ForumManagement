import { User } from '../Models/user';
import { Categorie } from './categorie';

export interface Blog {
    idBlog: number;
    comment: string;
    content:String;
    publishDate: Date;
    title: string;
    image: string;
    categorie: Categorie;
    userBlog: User;
  
    
}

