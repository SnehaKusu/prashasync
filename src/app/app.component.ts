import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // fixed typo: 'styleUrl' ➜ 'styleUrls'
})
export class AppComponent implements AfterViewInit {
  title = 'prashasync-landing';

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Optional: remove once visible
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    // Observe all <section> tags automatically
    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });
  }
}
