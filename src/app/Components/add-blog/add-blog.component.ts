import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../../Core/Models/categorie';
import { blogService } from 'src/app/Service/blog-service';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})


export class AddBlogComponent {
  postForm!: FormGroup;
  categories = Object.values(Categorie);

  constructor(private fb: FormBuilder,private blogservice:blogService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
      publishDate: ['', Validators.required],
      categorie: ['', Validators.required],
      comment: [''],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      // Process the form data
      let article = this.postForm.value;
      console.log(this.postForm.value);
      this.blogservice.addArticle(article).subscribe();
      
    } else {
      // Form validation failed
      console.error('Form is invalid');
    }
  }
}
