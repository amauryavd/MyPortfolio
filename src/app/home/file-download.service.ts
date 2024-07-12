import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { dev } from '../../environemts/environment';
import { prod } from '../../environemts/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }

  setBaseHref() {
    const baseHref = this.document.getElementsByTagName('base')[0];
    baseHref.setAttribute('href', prod.baseHref);
    console.log(baseHref);
  }
}
