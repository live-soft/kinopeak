import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieTableDialogComponent } from './admin-movie-table-dialog.component';

describe('AdminMovieTableDialogComponent', () => {
    let component: AdminMovieTableDialogComponent;
    let fixture: ComponentFixture<AdminMovieTableDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminMovieTableDialogComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminMovieTableDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
