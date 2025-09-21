import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  slides = [
    {img: "../../assets/images/mib-bed-bug-banner.jpg"},
    {img: "../../assets/images/bed-bug-hotel-treatment-london.jpg"},
    {img: "../../assets/images/OIP.jpeg"},
  ];
  toastr = inject(ToastrService);
  slideConfig = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000
};
  trackByImg(index: number, slide: any) {
    return slide.img;
  }
  
  slickInit(e: any) {
    console.log('slick initialized');
  }
  
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  
  afterChange(e: any) {
    console.log('afterChange');
  }
  
  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
