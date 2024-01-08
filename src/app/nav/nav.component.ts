import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isHiddenDropdown = 'hidden'
  isHiddenMenu = 'hidden'
  isHiddenDoubleDropdown = 'hidden'

  constructor(public authService: AuthService, public router: Router){}

  async signOut(){
    try{
      this.authService.logout();
      await this.router.navigate(['/login']);
    } catch(err){
      console.error(err);
    }
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
