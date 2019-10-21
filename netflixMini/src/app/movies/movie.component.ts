import { MovieService } from './movie.service';
import { Component, OnInit } from '@angular/core';
import { IMovie } from './movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  Id: number;
  movieTitle: string = "";
  author: string = "";
  director: string = "";
  // awards: number = null;
  // language: string = "";
  // genre: string = "";
  // plot: string= "";
  // releaseDate: string = "";
  // description: string = ""; 
  // rating: number = null;
  // imageUrl: string = "";

  movies: IMovie[] = [];

  constructor(private service: MovieService) { }


  ngOnInit() {
  }

}
