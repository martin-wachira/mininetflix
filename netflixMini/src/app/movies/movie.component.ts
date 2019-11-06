import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './../home/register.service';
import { Component, OnInit } from '@angular/core';
import { IMovie } from './movie';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: IMovie;

  constructor(private service: RegisterService, private a_route: ActivatedRoute) {}

  ngOnInit() {
    let param = this.a_route.snapshot.paramMap.get('id');
    if (param){
      const id = param;
      this.getMovie(id);
    }
  }

  getMovie(id: string) {
    this.service.getMovie(id).subscribe({
      next: movie => this.movie = movie,
    });
  }

}
