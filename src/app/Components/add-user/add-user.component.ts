import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserServicesService} from "../../Core/Services/UserServices/user-services.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm!: FormGroup;



  constructor(private fb: FormBuilder, private userService: UserServicesService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
     // inscriptionDate: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required], // Champ de sélection du rôle
      immatriculationNumber: ['', Validators.required],
      sectorOfActivity: ['', Validators.required], // Champ de sélection du secteur d'activité
      levelOfStudies: ['', Validators.required],
      domainOfStudies: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let userData = this.userForm.value;
      this.userService.createUser(userData).subscribe(
        response => {
          console.log('User created with succes :', response);
          this.userForm.reset();
        },
        error => {
          console.error('ERROR :', error);
        }
      );
    } else {

      console.error('FormInvalid');
    }
  }

}
