import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/Core/Models/blog';
import { blogService } from 'src/app/Service/blog-service';
import { supabase } from 'src/app/utils/supabase';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  id? :number;
  article?: Blog;
  constructor(private blogservice: blogService,private route:ActivatedRoute) { }




  ngOnInit(): void {
    this.id = Number( this.route.snapshot.paramMap.get("id"));
  
    this.blogservice.getArticleById(this.id).subscribe(article => {
      console.log('Article:', article);
      this.article = article;
    });
  }
  
 


   getImageUrl(imageName: string) {
    
    return "https://gdvrodbdggjncgbhmooj.supabase.co/storage/v1/object/public/images/"+imageName;
   
    /*
    try {
      const {data} = await supabase.storage
        .from('images')
        .getPublicUrl(imageName);
      const imageUrl = data.publicUrl;
      return "https://gdvrodbdggjncgbhmooj.supabase.co/storage/v1/object/public/images/"+imageName;
    } catch (error) {
      console.error('Failed to get image URL:', error);
      throw new Error('Failed to get image URL');
    }
  }*/
}

}


