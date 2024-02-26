import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../../Core/Models/categorie';
import { blogService } from 'src/app/Service/blog-service';
import { Blog } from 'src/app/Core/Models/blog';
import { supabase } from 'src/app/utils/supabase';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


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

  deleteArticle(id:number) {
    console.log("uuuu")
    this.blogservice.deleteArticle(id).subscribe() 
  }

  updateArticle() {
    // Logic to update the article
  }

   getImageUrl(imageName: string): string {
    return "https://oawpdobopjoqcofbjedi.supabase.co/storage/v1/object/public/images/"+imageName;
    /*
    try {
      const {data} = await supabase.storage
        .from('images')
        .getPublicUrl(imageName);
      const imageUrl = data.publicUrl;
      return "https://oawpdobopjoqcofbjedi.supabase.co/storage/v1/object/public/images/"+imageName;
    } catch (error) {
      console.error('Failed to get image URL:', error);
      throw new Error('Failed to get image URL');
    }*/
  }



}
