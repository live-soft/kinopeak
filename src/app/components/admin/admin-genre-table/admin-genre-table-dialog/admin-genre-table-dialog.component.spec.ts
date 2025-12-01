import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenreTableDialogComponent } from './admin-genre-table-dialog.component';

describe('AdminGenreTableDialogComponent', () => {
    let component: AdminGenreTableDialogComponent;
    let fixture: ComponentFixture<AdminGenreTableDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminGenreTableDialogComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminGenreTableDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
