import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HostListener } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, Observer } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatButtonModule],
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


  constructor(private viewportScroller: ViewportScroller, private elementRef: ElementRef) {
    this.contents = [{
      contentId: 1,
      content: "dif",
      contentName: "Data Ingestion Framework",
      contentDetail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      contentType: "work"
    },
    {
      contentId: 2,
      content: "ct",
      contentName: "Supply Chain Control Tower",
      contentDetail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      contentType: "work"
    },
    {
      contentId: 3,
      content: "mdm",
      contentName: "MDM",
      contentDetail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      contentType: "work"
    },
    {
      contentId: 3,
      content: "mdm",
      contentName: "MDM",
      contentDetail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      contentType: "work"
    },
    {
      contentId: 3,
      content: "mdm",
      contentName: "MDM",
      contentDetail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      contentType: "personal"
    },
    {
      contentId: 3,
      content: "mdm",
      contentName: "MDM",
      contentDetail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      contentType: "work"
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
  contentType: string;
}
