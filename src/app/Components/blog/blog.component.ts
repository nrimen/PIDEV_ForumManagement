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
export class BlogComponent implements OnInit {

  private supabaseUrl = 'https://oawpdobopjoqcofbjedi.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hd3Bkb2JvcGpvcWNvZmJqZWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDE5MjEsImV4cCI6MjAyMzc3NzkyMX0.vJKpeDZyvPaeQvslK8VxXdlUfaciqFsET3TsRkC76js';
  articles: Blog[] = [];
  options = ['...', 'Delete Article', 'Update Article', 'Report Article'];
  selectedOption = this.options[0];
  selectedArticle: Blog | null = null;
  constructor(private blogservice: blogService) { }

  ngOnInit(): void {
    this.blogservice.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

  onSelectOption(id: number) {
    console.log(this.selectedOption)
    switch (this.selectedOption) {
      case 'Delete Article':
        if (this.selectedArticle) {
          this.blogservice.deleteArticle(id).subscribe() 
        }
        break;
      case 'Update Article':
        this.updateArticle();
        break;
      default:
        // Handle the default case or do nothing
        break;
    }
  }

  deleteArticle() {
    // Logic to delete the article
  }

  updateArticle() {
    // Logic to update the article
  }

  displayImage(supabaseUrl: string) {
    const imgElement = document.createElement('img');
    imgElement.src = supabaseUrl;
    document.body.appendChild(imgElement);
  }
}