import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Role, SectorOfActivity, UserModuleModule} from '../../Core/Modules/user-module/user-module.module';
import { UserServicesService } from '../../Core/Services/UserServices/user-services.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  user: UserModuleModule = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: new Date(),
    inscriptionDate: new Date(),
    address: '',
    role: Role.Exposant,
    immatriculationNumber: '',
    sectorOfActivity: SectorOfActivity.IT,
    levelOfStudies: '',
    domainOfStudies: ''
  };

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserServicesService
  ) { }

  ngOnInit(): void {
    // Récupérer l'identifiant de l'utilisateur depuis l'URL
    const userId = this.route.snapshot.params['id'];

    // Récupérer les informations de l'utilisateur à partir du service
    this.userService.getUserById(userId).subscribe(
        response => {
          this.user = response; // Stockez les informations récupérées dans la propriété user
          this.initializeForm(); // Initialisez le formulaire avec les informations de l'utilisateur
        },
        error => {
          console.error('ERROR :', error);
        }
    );
  }

  initializeForm(): void {
    // Initialisez le formulaire avec les informations de l'utilisateur
    this.userForm = this.fb.group({
      firstName: [this.user.firstName || '', Validators.required],
      lastName: [this.user.lastName || '', Validators.required],
      email: [this.user.email || '', [Validators.required, Validators.email]],
      password: [this.user.password || '', Validators.required],
      birthDate: [this.user.birthDate || '', Validators.required],
      address: [this.user.address || '', Validators.required],
      role: [this.user.role || '', Validators.required],
      immatriculationNumber: [this.user.immatriculationNumber || '', Validators.required],
      sectorOfActivity: [this.user.sectorOfActivity || '', Validators.required],
      levelOfStudies: [this.user.levelOfStudies || '', Validators.required],
      domainOfStudies: [this.user.domainOfStudies || '', Validators.required]

    });

  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      userData.idUser = this.user.idUser; // Assurez-vous d'inclure l'identifiant de l'utilisateur dans les données à mettre à jour

      this.userService.updateUser(userData).subscribe(
          response => {
            console.log('User updated with success:', response);

            this.router.navigate(['/ViewUsers']); // Redirigez vers la liste des utilisateurs après la mise à jour
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
