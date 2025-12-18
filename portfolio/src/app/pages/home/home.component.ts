import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showAbout = false;

  @ViewChild('aboutSection') aboutSection!: ElementRef;

  constructor(private router: Router) {}

  /* ==========================
     BOTÓN SOBRE MÍ
  ========================== */
  toggleAbout(): void {
  this.showAbout = !this.showAbout;

  if (this.showAbout) {
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.smoothScrollTo(this.aboutSection.nativeElement, 1100);
      }, 200);
    });
  }
}

  /* ==========================
     BOTÓN PROYECTOS (HOME)
     → misma navegación que navbar
  ========================== */
  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  /* ==========================
     SCROLL SUAVE
  ========================== */
  smoothScrollTo(target: HTMLElement, duration: number) {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const distance = end - start;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, start + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
}
