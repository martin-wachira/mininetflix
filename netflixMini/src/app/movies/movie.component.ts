import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './../home/register.service';
import { MovieService } from './movie.service';
import { Component, OnInit } from '@angular/core';
import { IMovie } from './movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: IMovie;
  // movieDetails: any;

  constructor(private service: RegisterService, private a_route: ActivatedRoute, private router: Router) { }


  ngOnInit() {

    let param = this.a_route.snapshot.paramMap.get('documentId');
    if (param){
      const documentId = +param;
      this.getMovie(documentId);
    }
    
  }

  getMovie(documentId: number) {
    this.service.getMovie(documentId).subscribe({
      next: movie => this.movie = movie
      // error: err => this.errorMessage = err
    });
  }


}
