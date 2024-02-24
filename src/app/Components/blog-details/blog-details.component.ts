import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/Core/Models/blog';
import { blogService } from 'src/app/Service/blog-service';

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
      console.log(article)
      this.article = article;
    });
    
  }


}
