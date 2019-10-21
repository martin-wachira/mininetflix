import { Router } from '@angular/router';
import { RegisterService } from './../home/register.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  username = '';
  constructor(private service: RegisterService, private router: Router) {
    this.service.getUserName()
      .subscribe(
        data => {
          this.username = data.toString()
        },
        error => {
          return this.router.navigate(['../login']);
        }
      )
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../register']);
  }
}
