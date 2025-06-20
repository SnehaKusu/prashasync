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
import { RouterModule } from '@angular/router';

export function playerFactory() {
  return player;
}

@Component({
  selector: 'app-root',
  standalone: true,
 imports: [RouterModule,
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

    const bubble = document.getElementById('breatheBubble');
  if (bubble) {
    let isInhale = true;
    setInterval(() => {
      bubble.textContent = isInhale ? 'Exhale' : 'Inhale';
      isInhale = !isInhale;
    }, 4000); // Match the 4s keyframe animation
  }
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
    // First: Send via EmailJS
    emailjs.sendForm(
      'service_o3tp2by',
      'template_tgv2b4y',
      form,
      '7-Jbcszrv5roVsRpG'
    ).then(
      () => {
        alert('Message sent via Email!');

        const sheetdbURL = 'https://sheetdb.io/api/v1/ad24whchbvl07';
      const formData = new FormData(form);
      const data = {
        data: {
          name: formData.get('user_name'),
          email: formData.get('user_email'),
          phone: formData.get('user_phone'),
          message: formData.get('message'),
        }
      };

      fetch(sheetdbURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(() => {
        console.log('Stored in Google Sheets via SheetDB');
      }).catch((error) => {
        console.error('SheetDB Error:', error);
      });

    }, (error) => {
      console.error('EmailJS error:', error);
      alert('Failed to send message. Try again later.');
    });
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