import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title = 'MediConnect360asdfdsa';

  carrusel = [
    'https://bnz07pap001files.storage.live.com/y4mRlDgW1VScHvjJWCpGxrzC3qkiYpPQLb3Z1ND-lWPM6hutU4IxBcsg_ZdhGzTgINXvWd-Iho-9zwbipCGyNjXBGTnKFhoxqh23ZxxxKp20Nt26dGAgr5x9Oy-aA5qsxBHbisA1bQ5vGybzR1epzznOOrDWJaqLJiHl1njys2JnCn1RZ7kfYlN0qpXhUQcbOzWOvMw0vufR4DPXQ9pvij28NQ8UY_Q2IZRr10l-x2N5U4?encodeFailures=1&width=1120&height=478',
    'https://bnz07pap001files.storage.live.com/y4mpo4VUKEGVfTQxzzXh9wtJCLPiL852LZqkwP7AFhit8p83KBdGTqwccJrqXXH7VivOR-H11jyN_wg1nxH14j7tstQnAV99x98gxzvX3vbK8ykKo-TLeHJeFXnAeT5laOYgKC18Vu_6Zi5SQXqxvq3F1WtNaLM_MdwmE011-BqKH1GS2L9UHr-drepJG69wZYb0snPWWY4Swf-E9Dkd7hf70dmhWYVjfsR4JKoVRF5tJk?encodeFailures=1&width=1450&height=621',
    'https://bnz07pap001files.storage.live.com/y4moZZ_fVo5lxdkKLdLMGZzlGSrl2nMzLbKwnCxhNkApxFeSnahA3tMZM6UcMmdWEat9QIXY78wswfYR9Wp8o8hdrFLMU3dg7d_UtqDgi7FDY4LPq_iMAgG2AXnTVtfRPYSURJZjar9AQpupSQakRGj_HCGLxVXqV3dkI17l9NAKl8kHzFs5oKvLQ7eOJ91kNhLfStwPAZ3UfoZOubZxWsqAAf8re0q0Zr8ukwiqIJ_w6E?encodeFailures=1&width=1346&height=897',
  ];


  servicios = [
    'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',

  ]


  currentSlide = 0;
  interval: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.interval); // Limpiar el intervalo cuando el componente se destruye
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambiar cada 5 segundos
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carrusel.length; // Avanzar el slide
  }
}
