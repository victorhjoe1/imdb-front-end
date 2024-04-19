import { TestBed } from '@angular/core/testing';

import { FilmesServiceService } from './filmes-service.service';

describe('FilmesServiceService', () => {
  let service: FilmesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
