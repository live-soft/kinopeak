import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Interfaces
import { ICountry } from '@interfaces/common.interface';
import { IRole } from '@interfaces/role.interface';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    private http = inject(HttpClient);

    public getCountries() {
        return this.http.get<any>('https://countriesnow.space/api/v0.1/countries/info?returns=iso2')
            .pipe(
                map(res => res.data as ICountry[])
            );
    }

    public getRoles() {
        return this.http.get<any>(`http://localhost:3000/roles`)
            .pipe(
                map(res => res as IRole[])
            );
    }
}
