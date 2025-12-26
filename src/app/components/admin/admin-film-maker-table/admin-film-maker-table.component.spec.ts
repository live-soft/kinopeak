import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmMakerTableComponent } from './admin-film-maker-table.component';

describe('AdminFilmMakerTableComponent', () => {
    let component: AdminFilmMakerTableComponent;
    let fixture: ComponentFixture<AdminFilmMakerTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminFilmMakerTableComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminFilmMakerTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
