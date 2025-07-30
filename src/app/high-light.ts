import { Directive , ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLight {

  constructor(private el : ElementRef) { }
  @HostListener('mouseenter') onMouseEnter(){
    this.el.nativeElement.style.backgroundColor = " yellow ";
  }
  @HostListener("mouseleave") onMouseLeave ()
  {
    this.el.nativeElement.style.backgroundColor ='';
  }

}
