//Import Component form the angular core package
import { Component } from '@angular/core';

//Importt the Image interface
import { Image } from './image.interface';

@Component( {
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
} )


//Carousel Component itself
export class CarouselComponent {
    //images data to be bound to the template
    public images = IMAGES;
}

//IMAGES array implementing Image interface
var IMAGES: Image[] = [
    { "title": "Patton", "url": "http://wolna-polska.pl/wp-content/uploads/2014/12/a28.jpg" },
    { "title": "Eisenhower", "url": "https://fthmb.tqn.com/-iPOZ5lTnUG6Y9dHryCI8lUGHDI=/768x0/filters:no_upscale()/about/dd-eisenhower-large-56a61ba75f9b58b7d0dff3c1.jpg" },
    { "title": "Anders", "url": "https://ocdn.eu/pulscms-transforms/1/lHbktkpTURBXy8zYjdmNTgxMGQzMmQ3NTgwOTJmYjU5ODgzMjA2NjljOC5qcGeSlQMAzQS1zROwzQsTkwXNAyDNAcI" },
    { "title": "Sosabowski", "url": "http://77.spds.w.interiowo.pl/sosabowski/2.jpg" },
    { "title": "Rommel", "url": "https://artofwar.pl/wp-content/uploads/photo-gallery/Erwin_Rommel3.jpeg" }
];