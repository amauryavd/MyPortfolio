import { HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileDownloadService } from './home/file-download.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MyPortfolio';

  constructor(private fileDownloadService: FileDownloadService){}

  ngOnInit() {
    this.fileDownloadService.setBaseHref();
  }
}
