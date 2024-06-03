import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../Services/loader.service';
import IUser from '../Models/User.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isHiddenDropdown = 'hidden'
  isHiddenMenu = 'hidden'
  isHiddenDoubleDropdown = 'hidden'

  user: IUser | null = null;

  constructor(public authService: AuthService, public router: Router, public loaderService: LoaderService){}
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

  signOut(){
    this.loaderService.showLoader();
    this.authService.logout().subscribe({
      next: async (res) => {
        console.log('Successfully signed out');
        await this.router.navigate(['/login']);
        this.loaderService.hideLoader();
      },
      error: (err) => {
        console.log(err);
        this.loaderService.hideLoader();
      }
    });
  }

  toggleDropdown(){
    this.isHiddenDropdown ? this.isHiddenDropdown = '' : this.isHiddenDropdown = 'hidden';
  }

  toggleMenu(){
    this.isHiddenMenu ? this.isHiddenMenu = '' : this.isHiddenMenu = 'hidden';
  }

  toggleDoubleDropdown(){
    this.isHiddenDoubleDropdown ? this.isHiddenDoubleDropdown = '' : this.isHiddenDoubleDropdown = 'hidden';
  }
}
