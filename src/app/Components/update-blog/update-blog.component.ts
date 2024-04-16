import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../Core/Models/categorie';
import { blogService } from 'src/app/Service/blog-service';
import { supabase } from 'src/app/utils/supabase';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {

  private fileupload: File = {} as File;
  postForm!: FormGroup;
  categories = Object.values(Categorie);
  idBlog?: any;

  constructor(
    private fb: FormBuilder,
    private blogservice: blogService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      publishDate: ['', Validators.required],
      categorie: ['', Validators.required],
      comment: [null],
    });

    // Retrieve the blog ID from the route parameters
    this.route.params.subscribe(params => {
      this.idBlog = params['id'];
      // Call a method to fetch the details of the blog post
      this.fetchBlogDetails(this.idBlog);
    });
  }

   fetchBlogDetails(idBlog: string) {
    const blogId = Number(idBlog); // Convert idBlog to a number
  
    // Assuming you have a method in blogService to fetch blog details by ID
    this.blogservice.getArticleById(blogId).subscribe((blogDetails: any) => {
      // Populate the form fields with the existing blog data
      console.log(blogDetails)
      this.postForm.patchValue({
        title: blogDetails.title,
        content: blogDetails.content,
        publishDate: blogDetails.publishDate,
        categorie: blogDetails.categorie,
        // Set other form fields accordingly
      });
    });
  }

  async onSubmit() {
    if (this.postForm.valid) {
      let updatedArticle = this.postForm.value;
      // if (this.fileupload) {
      //   const filename = await this.uploadFile(this.fileupload);
      //   updatedArticle.image = filename;
      // }
      console.log(updatedArticle);
      // Assuming you have a method in blogService to update the article
      this.blogservice.updateArticle(updatedArticle).subscribe();
      this.router.navigate(['/blog']);
    } else {
      console.error('Form is invalid');
    }
  }

  // async uploadFile(file: File) {
  //   const { data, error } = await supabase.storage
  //     .from('images')
  //     .upload(`${Date.now()}_${file.name}`, file, { cacheControl: '3600', upsert: false });
  //   if (error) {
  //     console.error(error);
  //     return;
  //   } else {
  //     return data.path;
  //   }
  // }

  // onFileChanged(event: any) {
  //   const file = event.target.files[0];
  //   this.fileupload = file;
  // }

}