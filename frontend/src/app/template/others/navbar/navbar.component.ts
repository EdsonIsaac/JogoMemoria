import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: User | null;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
    if (this.authService.isAuthenticated()) {

      let username = this.authService.getCurrentUser().username;

      this.userService.findByUsername(username).subscribe(user => {
        this.user = user;
      });
    }
  }

  logout() {
    this.user = null;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}