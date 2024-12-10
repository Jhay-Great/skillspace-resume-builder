import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountriesData, Country } from '@src/app/core/interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountriesData[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map(
        (countries) =>
          countries
            .map((country) => ({
              name: country.name?.common || 'Unknown',
              flag: country.flags?.svg || '',
            }))
            .sort((a, b) => a.name.localeCompare(b.name)) // Sorting in ascending order by name
      )
    );
  }
}
