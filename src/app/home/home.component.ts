import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HostListener } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, Observer } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FileDownloadService } from './file-download.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatButtonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ transition: 'all ease-in', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ transition: 'all ease-out', opacity: 0 }))
      ])
    ]
    )
  ],
})
export class HomeComponent {
  state = "open";
  onStateChange: any;
  activeLinkId: string | null = 'home';
  menuToggle: string = 'fa fa-bars';
  mobileView = false;
  headerStyle: any;
  email: string = "amauryavd443@gmail.com";
  @ViewChild('sections') sections!: ElementRef;
  screenWidth: any;
  contents: IContent[] = [];
  isPopupVisible: boolean = false;
  overlayStyle = {};
  popupStyle = {};
  showObj!: IContent;
  projects: { code: string, name: string, type: string }[];
  menuStyle= {};
  fileUrl = "/../assets/Files";


  constructor(private viewportScroller: ViewportScroller, private elementRef: ElementRef, private fileDownloadService: FileDownloadService) {
    this.contents = [{
      contentId: 1,
      content: "dif",
      contentName: "Data Ingestion Framework",
      contentDetail: "This web application developed for AbbVie and it was used for Data Migration from various source to S3 and other different endpoints.",
      contentTech: "Angular, .NET Core, C#, Web API, SQL, AWS S3",
      // contentContri: "Contributed in front-end development using Angular Ag-grid.",
      contentType: "work"
    },
    {
      contentId: 2,
      content: "ct",
      contentName: "Supply Chain Control Tower",
      contentDetail: "This web application is used to monitor the planning, procurement, supply chain KPIs at single web portal.",
      contentTech: "Angular, .NET Core, C#, Web API, SQL, Redshift",
      // contentContri: "Worked at front-end development and added few pages in application.",
      contentType: "work"
    },
    {
      contentId: 3,
      content: "mdm",
      contentName: "Master Data Management",
      contentDetail: "This web application is used to support global and functional product tiers ( 0 - Not Released, 1 – High Focus, 2 – Mid Focus, 3 – Lower Focus) for Supply Chain, Quality, IME, Science and Technology and 3rd party manufacturers. ",
      contentTech: "Angular, .NET Core, C#, Web API, SQL, Redshift ",
      // contentContri: "Designed and developed front-end of whole application from scratch using Angular Material.",
      contentType: "work"
    },
    {
      contentId: 4,
      content: "emp",
      contentName: "Empower Automation",
      contentDetail: "This read-only web application is used to generate audit logs report for the users.",
      contentTech: ".NET Core MVC, C#",
      // contentContri: "Designed and developed whole application from scratch using .NET Core MVC",
      contentType: "work"
    },
    {
      contentId: 5,
      content: "jwt",
      contentName: "User Authentication and Authorization",
      contentDetail: "This application is used to authenticate and authorize the user using jwt token to access their personal data. ",
      contentTech: "Angular, .NET Core, Dapper for requests",
      // contentContri: "",
      contentType: "personal"
    },
    {
      contentId: 6,
      content: "port",
      contentName: "Portfolio",
      contentDetail: "This is a read-only single page application which shows my overall work based experience",
      contentTech: "Angular",
      // contentContri: "",
      contentType: "personal"
    }
    ];

    this.projects = this.contents.map(obj => ({ code: obj.content, name: obj.contentName, type: obj.contentType }));
    console.log(this.projects);

  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this));
    if (window.innerWidth == 1200) {
      this.mobileView = true;
    }
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.screenWidth = width;
    if (width < 1200) {
      this.onStateChange = false;
      this.headerStyle = { 'left': '-300px' };
      this.menuToggle = "fa fa-bars";
      this.menuStyle = {'visibility': 'visible'}
    } else {
      // this.state = "closed";
      // this.menuToggle = "fa fa-bars";
      this.menuStyle = {'visibility': 'hidden'}
      this.headerStyle = { 'left': 0 };
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty("overflow-y", "scroll", "important");
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  downloadPdf(){
    // window.open("/../assets/Files/Adarh_Maurya_Resume_2024.pdf", "_blank")
    const fileUrl = '/../assets/Files/Adarh_Maurya_Resume_2024.pdf'; // Adjust the path as needed
    this.fileDownloadService.downloadFile(fileUrl).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Adarh_Maurya_Resume_2024.pdf'; // Filename to save as
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error: any) => {
        console.error('Download error:', error);
      }
    );
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    this.activeLinkId = elementId;
    this.onStateChange = false;
    this.state = "closed";
    this.menuToggle = "fa fa-bars";
    this.screenWidth < 1200 ? this.headerStyle = { 'left': '-300px' } : this.headerStyle = { 'left': '0' };
    this.elementRef.nativeElement.ownerDocument.body.style.setProperty("overflow-y", "scroll", "important");
  }


  onScroll(event: any) {
    const scrollPosition = this.viewportScroller.getScrollPosition();
    const sectionElements = this.sections.nativeElement.children;

    let foundActive = false;

    for (let i = 0; i < sectionElements.length; i++) {
      const section = sectionElements[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition[1] >= sectionTop && scrollPosition[1] < sectionBottom) {
        this.activeLinkId = section.id;
        foundActive = true;
        break;
      }
    }

    // If no section is active, and user has scrolled to top, set 'Home' as active
    if (!foundActive && scrollPosition[1] === 0) {
      this.activeLinkId = 'home';
    }

  }

  changeState() {
    this.onStateChange = !this.onStateChange;
    if (this.onStateChange) {
      this.state = "open";
      this.menuToggle = "fa-solid fa-xmark";
      this.headerStyle = { 'left': 0 };
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty("overflow-y", "hidden", "important");
    } else {
      this.state = "closed";
      this.menuToggle = "fa fa-bars";
      this.headerStyle = { 'left': '-300px' };
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty("overflow-y", "scroll", "important");
    }
  }

  openPopup(ele: string) {
    this.isPopupVisible = true;
    this.overlayStyle = { "display": "block" };
    this.popupStyle = { "display": "block" };
    this.elementRef.nativeElement.ownerDocument.body.style.setProperty("overflow-y", "hidden", "important");

    this.contents.forEach((element: any) => {
      if (element.content === ele) {
        this.showObj = element
      }
    });
    console.log(this.showObj);
    // this.showObj = [];
  }

  closePopup() {
    this.isPopupVisible = false;
    this.overlayStyle = { "display": "none" };
    this.popupStyle = { "display": "none" };
    this.elementRef.nativeElement.ownerDocument.body.style.setProperty("overflow-y", "scroll", "important");
  }
}


export interface IContent {
  contentId: number;
  content: string;
  contentName: string;
  contentDetail: string;
  contentTech: string;
  // contentContri: string;
  contentType: string;
}
