import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { RegisterService } from './register.service';
import { ActivatedRoute, Router } from '@angular/router'
import { IMovie } from '../movies/movie';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
  successMessage = '';
  validatingForm: FormGroup;
  passMessage: string;
  showLike: boolean = false;
  searchText = '';

  errorMessage = '';

  movies: IMovie[];
  curMovie: IMovie;
  editState: boolean = false;

  private validationMessages = {
    required: 'Please enter your password.',
  };

  constructor(private fb: FormBuilder,
    private service: RegisterService,
    private router: Router,
    private a_route: ActivatedRoute,
    private db: AngularFirestore) {}


  ngOnInit() {
    this.validatingForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


    this.service.getAllMovies().subscribe(movies => {
      this.movies = movies;
    })

  }

  gotoDetails(id){
    this.router.navigate(['/movie', id]);
  }

  setMessage(c: AbstractControl): void {
    this.passMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

  toggleLike(): void {
    this.showLike = !this.showLike; 
  }

  register() {
    console.log(this.validatingForm.value);

    if (this.validatingForm.valid) {
      this.service.submitRegister(this.validatingForm.value)
        .subscribe(
          data => this.successMessage = 'Registration Successfuly',
          error => this.successMessage = 'Some errors'
        );
    }
  }

  moveToLogin() {
    this.router.navigate(['../login'], { relativeTo: this.a_route });
  }

  gotoFav() {
    this.router.navigate(['../favorite'], { relativeTo: this.a_route });
  }

  get username() {
    return this.validatingForm.get('username');
  }

  get email() {
    return this.validatingForm.get('email');
  }

  get password() {
    return this.validatingForm.get('password');
  }
}
