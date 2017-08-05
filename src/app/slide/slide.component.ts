import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { Direction, CarouselComponent } from "app/carousel/carousel.component";


@Component( {
    selector: 'slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.css']
} )
export class SlideComponent implements OnInit, OnDestroy {
    @Input() public index: number;
    @Input() public direction: Direction;

    @HostBinding( 'class.active' )
    @Input() public active: boolean;

    @HostBinding( 'class.item' )
    @HostBinding( 'class.carousel-item' )
    private addClass: boolean = true;

    constructor( private carousel: CarouselComponent ) {
    }

    public ngOnInit() {
        this.carousel.addSlide( this );
    }

    public ngOnDestroy() {
        this.carousel.removeSlide( this );
    }

}
