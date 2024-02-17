import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../../Core/Models/categorie';
import { blogService, supabase } from 'src/app/Service/blog-service';
import { Blog } from 'src/app/Core/Models/blog';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent { //implements OnInit{
  articles: Blog[] = [];
  constructor(private blogservice: blogService) { }

 /* ngOnInit(): void {
    this.getArticles();
  }*/

 /* getArticles() {
    this.blogservice.showArticle().subscribe(
      (articles: Blog[]) => {
        this.articles = articles;
      },
      (error) => {
        console.log('Error retrieving articles:', error);
      }
    );

    }*/
  
}
