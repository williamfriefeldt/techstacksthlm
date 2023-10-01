import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchTermService {
  private _searchTerms: string[] = [];

  public get searchTerms(): string[] {
    return this._searchTerms;
  }

  public set searchTerms(searchTerm: string[]) {
    this._searchTerms = searchTerm;
  }
}
