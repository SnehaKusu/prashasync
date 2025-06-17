import {
  Component,
  AfterViewInit,
  ViewChildren,
   ViewChild,
  QueryList,
  ElementRef
} from '@angular/core';

import { LottieComponent } from 'ngx-lottie'; 
import type { AnimationOptions } from 'ngx-lottie';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
import type { AnimationItem } from 'lottie-web';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@Component({
  selector: 'app-root',
  standalone: true,
 imports: [
  LottieComponent,
  FormsModule
],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  title = 'prashasync-landing';
  isMenuOpen = false;
  animationItems: { [key: string]: any } = {};


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // ✅ For autoplaying all <video #videoElement> tags
  @ViewChildren('videoElement') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;
@ViewChild('formElement') formElementRef!: ElementRef<HTMLFormElement>;
@ViewChild('multilingualLottie', { static: false }) multilingualLottieRef!: LottieComponent;

  // ✅ Lottie animation config
multilingualOptions: AnimationOptions = {
  path: 'assets/animations/MULTILUNGUAL03.json',
  renderer: 'svg' as const,  // 🔥 critical fix
  loop: true,
  autoplay: false,

};
aiTherapyOptions: AnimationOptions = {
  path: 'assets/animations/AI-THERAPY01.json',
  renderer: 'svg' as const,
  loop: true,
  autoplay: true
};

hybridOptions: AnimationOptions = {
  path: 'assets/animations/HYBRID02.json',
  renderer: 'svg' as const,
  loop: true,
  autoplay: true
};
gamifiedOptions: AnimationOptions = {
  path: 'assets/animations/GAMIFIED 04.json',
  renderer: 'svg' as const,
  loop: true,
  autoplay: true
};

anonymousOptions: AnimationOptions = {
  path: 'assets/animations/ANONYMOUS05.json',
  renderer: 'svg' as const,
  loop: true,
  autoplay: true
};

support247Options: AnimationOptions = {
  path: 'assets/animations/247 07.json',
  renderer: 'svg' as const,
  loop: true,
  autoplay: true
};
arvrOptions: AnimationOptions = {
  path: 'assets/animations/ARVR08.json',
  renderer: 'svg' as const,
  loop: true,
  autoplay: true
};
recommendationOptions = {
  path: 'assets/animations/RECOMMENDATION06.json',
  renderer: 'svg' as const,
  loop: true,
  autoplay: true
};




  ngAfterViewInit() {
    // 🔹 Section fade-in on scroll
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

    // 🔹 Reliable autoplay for videos
    this.videoRefs.forEach((videoRef) => {
      const video = videoRef.nativeElement;
      video.muted = true;

      const attemptPlay = () => {
        video.play()
          .then(() => console.log('Autoplay success:', video.src))
          .catch((err) => console.warn('Autoplay blocked:', err));
      };

      video.addEventListener('canplaythrough', attemptPlay);

      setTimeout(() => {
        if (video.paused) attemptPlay();
      }, 1500);
    });
  }
sendEmail(): void {
  const form = this.formElementRef?.nativeElement;

  if (form) {
    emailjs.sendForm(
      'service_3ss8axj',
      'template_48wyjzc',
      form,
      'gqvRMFXczcBFMQNUx'
    ).then(
      () => alert('Message sent successfully!'),
      (error) => {
        console.error('EmailJS error:', error);
        alert('Failed to send message. Try again later.');
      }
    );
  } else {
    alert('Form element not found.');
  }
}


handleAnimationCreated(key: string, animation: any): void {
  this.animationItems[key] = animation;
}

playAnimation(key: string): void {
  this.animationItems[key]?.play();
}

stopAnimation(key: string): void {
  this.animationItems[key]?.stop();
}



}