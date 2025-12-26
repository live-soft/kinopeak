import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmMakerTableDialogComponent } from './admin-film-maker-table-dialog.component';

describe('AdminFilmMakerTableDialogComponent', () => {
    let component: AdminFilmMakerTableDialogComponent;
    let fixture: ComponentFixture<AdminFilmMakerTableDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminFilmMakerTableDialogComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminFilmMakerTableDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
