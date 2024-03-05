import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../../Core/Models/categorie';
import { blogService } from 'src/app/Service/blog-service';
import { Blog } from 'src/app/Core/Models/blog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  searchForm: FormGroup;

  articles: Blog[] = [];
  filteredArticles: Blog[] = [];
  options = ['...', 'Delete Article', 'Update Article', 'Report Article'];
  selectedOption = this.options[0];
  selectedArticle: Blog | null = null;

  constructor(private formBuilder : FormBuilder,private blogservice: blogService,) {
    this.searchForm = this.formBuilder.group({
      title: [''],
      Categorie: ['']
    });
   }
   
  ngOnInit(): void {
    this.getData()
    this.searchArticles()
  }
  getData() {
  this.blogservice.getArticles().subscribe(articles => {
    this.articles = articles;
    console.log("refreshing");
    this.searchArticles()
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
          if (this.selectedArticle) {
            const updatedArticle: Blog = { ...this.selectedArticle, idBlog: id };
            this.blogservice.updateArticle(updatedArticle).subscribe(
              (response) => {
                console.log('Article updated successfully:', response);
              },
              (error) => {
                console.error('Failed to update article:', error);
              }
            );
          }
          break;
    }
  }

  deleteArticle(id:number) {
    console.log("uuuu")
    this.blogservice.deleteArticle(id).subscribe() 
    setTimeout(()=>(this.getData()),1000)
  }

  updateArticle() {
    // Logic to update the article
  }

   getImageUrl(imageName: string): string {
    return "https://gdvrodbdggjncgbhmooj.supabase.co/storage/v1/object/public/images/"+imageName;
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


  searchArticles(): void {
    const title = this.searchForm.get('title')?.value.trim().toLowerCase();
    const category = this.searchForm.get('categorie')?.value.trim().toLowerCase(); 
    console.log('title:', title);
    console.log('categorie:', Categorie);
    // Filter articles based on search criteria
    this.filteredArticles = this.articles.filter(article => {
      const matchesTitle = !title || article.title.toLowerCase().includes(title);
      const matchesCategory = !category || article.categorie.toLowerCase() === category;
      return matchesTitle && matchesCategory;
    });
  }
  
  


}
