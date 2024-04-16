import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { initSupabase } from 'src/app/utils/supabase';

@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.component.html',
  styleUrls: ['./addrequest.component.css']
})
export class AddrequestComponent {
  myForm: FormGroup;
  supabase: SupabaseClient = createClient(initSupabase.supabaseUrl, initSupabase.supabaseKey);
  private fileupload: File = {} as File;

  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.myForm = this.formBuilder.group({
      requestTitle: ['', [Validators.required, Validators.minLength(5)]],
      requestContent: ['', [Validators.required, Validators.minLength(15)]],
      location: ['', Validators.required],
      cv: ['', Validators.required],
      requestField: [ '', Validators.required ], 
      otherField: [''], 
    });
  }

  // onFileChanged = (event :any) => {
  //   console.log("here")
  //    const file = event.target.files[0];
  //    this.fileupload = file;
  //    this.uploadFile(file);
  //  }
   async uploadFile(file: File) {
     const { data, error } = await this.supabase.storage.from('resumes').upload(`${Date.now()}_${file.name}`, file, { cacheControl: '3600', upsert: false });
   
     console.log('Upload Data:', data);
     console.error('Upload Error:', error);
   
     if (error) {
       console.error(error);
       return;
     } else {
       return data.path;
     }
   }
 

  async onSubmit() {
   
    if ( this.myForm.valid) {



      let formData = this.myForm.value;
      let filename = await this.uploadFile(this.fileupload);
      formData.cv = filename;
      console.log(formData)
      // this.blogservice.addArticle(article).subscribe();
      // this.router.navigate(['/blog']);
      
    // } else {
    //   // Form validation failed
    //   console.error('Form is invalid');
    // }
    


      // let formData = this.myForm.value;
      //   this.uploadFile(this.fileupload)
      // .then((filename: string | undefined) => {
      //   if (filename) {
      //     formData.cv = filename;
      //     // Continue with any additional logic using the updated formData
      //   } else {
      //     console.error('File upload failed.');
      //   }
      // })
      // .catch(error => {
      //   console.error('Error during file upload:', error);
      // });


      formData.postingDate = new Date();
      // Add the "Other" field value to the requestField array
      if (formData.otherField) {
        formData.requestField.push(formData.otherField);
      }

      // Directly use the array as a comma-separated string
      formData.requestField = formData.requestField.join(',');


      this.http.post('http://localhost:8089/ForumManagement/request/add-request', formData)
        .subscribe(response => {
          console.log('Response from server:', response);
          this.showSuccessSnackbar();
        });
    } else {
      console.error('Form data is undefined.');
    }
      
  }


  showOtherField: boolean = false;
  toggleOtherField(): void {
    this.showOtherField = !this.showOtherField;
    if (!this.showOtherField) {
      this.myForm.get('otherField')!.setValue('');
    }
  }

  showSuccessSnackbar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Request added successfully!', 'X', {
      duration: 4000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/requests']);
    });
  }

  onFileChanged = (event :any) => {
    console.log("here")
    const file = event.target.files[0];
    this.fileupload = file;
    //this.uploadFile(file);
  }

  // async AddCV(cv: ReqCV)
  // {
  //   const {data , error} = await this.supabase
  //     .from<ReqCV>('cv')
  //     .insert(cv)
  //   return{data , error};

  // }

 
}
