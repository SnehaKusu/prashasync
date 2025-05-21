import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'prashasync-landing';
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @ViewChildren('videoElement') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit() {
    // 🔹 Fade-in section scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    // 🔹 Reliable autoplay for all videos
    this.videoRefs.forEach((videoRef) => {
      const video = videoRef.nativeElement;

      // Force mute in case browser resets it
      video.muted = true;

      const attemptPlay = () => {
        video.play().then(() => {
          console.log('Autoplay success:', video.src);
        }).catch((err) => {
          console.warn('Autoplay blocked:', err);
        });
      };

      // Use canplaythrough to trigger when fully buffered
      video.addEventListener('canplaythrough', attemptPlay);

      // Retry if canplaythrough doesn't fire (backup)
      setTimeout(() => {
        if (video.paused) attemptPlay();
      }, 1500);
    });
  }
}
