import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HostListener } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import {MatTabsModule} from '@angular/material/tabs';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // animations: [
  //   trigger('withdraw', [
  //     state('closed', style({
  //       left: -300,
  //     })),
  //     state('open', style({
  //       left: 0,
  //     }))
  //   ])
  // ]
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
  asyncTabs: Observable<ExampleTab[]>;

  constructor(private viewportScroller: ViewportScroller, private elementRef: ElementRef) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 1000);
    });

   }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this));
    if (window.innerWidth == 1200) {
      this.mobileView = true;
      console.log(this.mobileView);

    }
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.screenWidth = width;
    if (width<1200) {
      this.onStateChange = false;
      this.headerStyle = { 'left': '-300px' };
      this.menuToggle = "fa fa-bars";
    } else {
      // this.state = "closed";
      // this.menuToggle = "fa fa-bars";
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

}


export interface ExampleTab {
  label: string;
  content: string;
}