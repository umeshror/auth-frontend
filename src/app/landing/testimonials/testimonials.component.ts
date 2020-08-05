import {Component, OnInit, Input} from '@angular/core';
import {NguCarousel, NguCarouselConfig} from '@ngu/carousel';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  public carouselOptions: NguCarouselConfig;
  public testimonials = [{
    logo: 'assets/images/profiles/mock-logo-4.png',
    photo: 'assets/images/profiles/face-1.jpg',
    text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit modi voluptas vero iusto fuga quos totam eius,
    atis magnam tempora doloribus ducimus dolorem culpa animi beatae tenetur! Sapiente, quia tempora."`,
    title: 'Jhone Doe',
    subtitle: 'Software Engineer'
  }, {
    logo: 'assets/images/profiles/mock-logo-2.png',
    photo: 'assets/images/profiles/face-2.jpg',
    text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit modi voluptas vero iusto fuga quos totam eius,
    atis magnam tempora doloribus ducimus dolorem culpa animi beatae tenetur! Sapiente, quia tempora."`,
    title: 'Jhone Doe',
    subtitle: 'Software Engineer'
  }, {
    logo: 'assets/images/profiles/mock-logo-3.png',
    photo: 'assets/images/profiles/face-3.jpg',
    text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit modi voluptas vero iusto fuga quos totam eius,
    atis magnam tempora doloribus ducimus dolorem culpa animi beatae tenetur! Sapiente, quia tempora."`,
    title: 'Jhone Doe',
    subtitle: 'Software Engineer'
  }, {
    logo: 'assets/images/profiles/mock-logo-1.png',
    photo: 'assets/images/profiles/face-4.jpg',
    text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit modi voluptas vero iusto fuga quos totam eius,
    atis magnam tempora doloribus ducimus dolorem culpa animi beatae tenetur! Sapiente, quia tempora."`,
    title: 'Jhone Doe',
    subtitle: 'Software Engineer'
  }];

  constructor() {
  }

  ngOnInit(): void {
    this.carouselOptions = {
      grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
      slide: 2,
      speed: 400,
      interval: {timing: 4000},
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    };
  }

}
