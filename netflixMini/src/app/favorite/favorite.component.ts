import { Component, OnInit } from '@angular/core';
import { IMovie } from '../movies/movie';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  searchText='';
  movies: IMovie[];

  constructor() { }


  ngOnInit() { }

}
