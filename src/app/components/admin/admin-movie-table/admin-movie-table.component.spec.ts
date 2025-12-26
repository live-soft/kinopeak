import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieTableComponent } from './admin-movie-table.component';

describe('AdminMovieTableComponent', () => {
    let component: AdminMovieTableComponent;
    let fixture: ComponentFixture<AdminMovieTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminMovieTableComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminMovieTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
