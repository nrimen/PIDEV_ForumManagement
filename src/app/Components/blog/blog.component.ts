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
  private supabase :any
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

  deleteArticle(id:number) {
    console.log("uuuu")
    this.blogservice.deleteArticle(id).subscribe() 
  }

  updateArticle() {
    // Logic to update the article
  }

  async getImageUrl(imageName: string): Promise<string> {
    try {
      const {data} = await this.supabase.storage
        .from('images')
        .getPublicUrl(imageName);
      const imageUrl = data.publicUrl;
      return imageUrl;
    } catch (error) {
      console.error('Failed to get image URL:', error);
      throw new Error('Failed to get image URL');
    }
  }



}
