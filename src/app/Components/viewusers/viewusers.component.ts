import { Component } from '@angular/core';
import {UserServicesService} from "../../Core/Services/UserServices/user-services.service";
import {UserModuleModule} from "../../Core/Modules/user-module/user-module.module";


@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent {
    users: UserModuleModule[] = [];
  constructor(private userService: UserServicesService) { }

  ngOnInit(): void {
    this.loadUsers(); // Chargement des utilisateurs au démarrage du composant
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users; // Assigner les utilisateurs récupérés à la propriété users
        console.log(this.users)
      },
      error => {
        console.error('Erreur lors du chargement des utilisateurs :', error);
      }
    );
  }


  deleteUser(user: UserModuleModule) {
    if (user.idUser !== undefined) {
      this.userService.deleteUser(user.idUser).subscribe(
          () => {
            // Filtrer l'utilisateur supprimé de la liste des utilisateurs affichés
            this.users = this.users.filter(u => u !== user);
          },
          error => {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
          }
      );
    } else {
      console.error('L\'identifiant de l\'utilisateur est indéfini.');
    }
  }
}
