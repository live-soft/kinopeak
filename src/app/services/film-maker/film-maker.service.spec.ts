import { TestBed } from '@angular/core/testing';

import { FilmMakerService } from './film-maker.service';

describe('FilmMakerService', () => {
    let service: FilmMakerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FilmMakerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
