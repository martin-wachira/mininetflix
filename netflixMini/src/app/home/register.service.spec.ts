import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';

describe('RegisterService', () => {

  let service = RegisterService

  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: RegisterService = TestBed.get(RegisterService);
    expect(service).toBeTruthy();
  });

  it('')
});
