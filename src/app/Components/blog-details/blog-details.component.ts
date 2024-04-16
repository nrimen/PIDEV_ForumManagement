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
  numberOfLikes: number = 0;
  numberOfDislikes: number = 0;
  liked: boolean = false;
  disliked: boolean = false;

  constructor(private blogservice: blogService,private route:ActivatedRoute) { }




  ngOnInit(): void {
    let b = document.querySelector('button');

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


likeButtonClick() {
  if (!this.liked) {
    this.numberOfLikes++;
    this.liked = true;
    this.disliked = false;
  } else {
    this.numberOfLikes--;
    this.liked = false;
  }
}

dislikeButtonClick() {
  if (!this.disliked) {
    this.numberOfDislikes++;
    this.disliked = true;
    this.liked = false;
  } else {
    this.numberOfDislikes--;
    this.disliked = false;
  }
}



}


