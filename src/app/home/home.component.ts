import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  activeLinkId: string | null = 'home';
  @ViewChild('sections') sections!: ElementRef;

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    this.activeLinkId = elementId;
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

}
