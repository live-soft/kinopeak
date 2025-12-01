import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenreTableComponent } from './admin-genre-table.component';

describe('AdminGenreTableComponent', () => {
    let component: AdminGenreTableComponent;
    let fixture: ComponentFixture<AdminGenreTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminGenreTableComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminGenreTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
