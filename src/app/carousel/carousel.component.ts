import { Component, OnDestroy, Input } from '@angular/core';

//Importt the Image interface
import { Image } from './image.interface';
import { SlideComponent } from "app/slide/slide.component";

export enum Direction { UNKNOWN, NEXT, PREV }

@Component( {
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
} )

//Carousel Component itself
export class CarouselComponent implements OnDestroy {

    @Input() public noWrap: boolean;
    @Input() public noPause: boolean;
    @Input() public noTransition: boolean;

    @Input() public get interval(): number {
        return this._interval;
    }

    public set interval( value: number ) {
        this._interval = value;
        this.restartTimer();
    }

    private slides: Array<SlideComponent> = [];
    private currentInterval: any;
    private isPlaying: boolean;
    private destroyed: boolean = false;
    private currentSlide: SlideComponent;
    private _interval: number;

    public ngOnDestroy() {
        this.destroyed = true;
    }

    public select( nextSlide: SlideComponent, direction: Direction = Direction.UNKNOWN ) {
        let nextIndex = nextSlide.index;
        if ( direction === Direction.UNKNOWN ) {
            direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
        }

        // Prevent this user-triggered transition from occurring if there is already one in progress
        if ( nextSlide && nextSlide !== this.currentSlide ) {
            this.goNext( nextSlide, direction );
        }
    }

    private goNext( slide: SlideComponent, direction: Direction ) {
        if ( this.destroyed ) {
            return;
        }

        slide.direction = direction;
        slide.active = true;

        if ( this.currentSlide ) {
            this.currentSlide.direction = direction;
            this.currentSlide.active = false;
        }

        this.currentSlide = slide;

        // every time you change slides, reset the timer
        this.restartTimer();
    }

    private getSlideByIndex( index: number ) {
        let len = this.slides.length;
        for ( let i = 0; i < len; ++i ) {
            if ( this.slides[i].index === index ) {
                return this.slides[i];
            }
        }
    }

    private getCurrentIndex() {
        return !this.currentSlide ? 0 : this.currentSlide.index;
    }

    private next() {
        let newIndex = ( this.getCurrentIndex() + 1 ) % this.slides.length;

        if ( newIndex === 0 && this.noWrap ) {
            this.pause();
            return;
        }

        return this.select( this.getSlideByIndex( newIndex ), Direction.NEXT );
    }

    private prev() {
        let newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;

        if ( this.noWrap && newIndex === this.slides.length - 1 ) {
            this.pause();
            return;
        }

        return this.select( this.getSlideByIndex( newIndex ), Direction.PREV );
    }

    private restartTimer() {
        this.resetTimer();
        let interval = +this.interval;
        if ( !isNaN( interval ) && interval > 0 ) {
            this.currentInterval = setInterval(() => {
                let nInterval = +this.interval;
                if ( this.isPlaying && !isNaN( this.interval ) && nInterval > 0 && this.slides.length ) {
                    this.next();
                } else {
                    this.pause();
                }
            }, interval );
        }
    }

    private resetTimer() {
        if ( this.currentInterval ) {
            clearInterval( this.currentInterval );
            this.currentInterval = null;
        }
    }

    public play() {
        if ( !this.isPlaying ) {
            this.isPlaying = true;
            this.restartTimer();
        }
    }

    public pause() {
        if ( !this.noPause ) {
            this.isPlaying = false;
            this.resetTimer();
        }
    }

    public addSlide( slide: SlideComponent ) {
        slide.index = this.slides.length;
        this.slides.push( slide );
        if ( this.slides.length === 1 || slide.active ) {
            this.select( this.slides[this.slides.length - 1] );
            if ( this.slides.length === 1 ) {
                this.play();
            }
        } else {
            slide.active = false;
        }
    }

    public removeSlide( slide: SlideComponent ) {
        this.slides.splice( slide.index, 1 );

        if ( this.slides.length === 0 ) {
            this.currentSlide = null;
            return;
        }

        for ( let i = 0; i < this.slides.length; i++ ) {
            this.slides[i].index = i;
        }
    }


    //images data to be bound to the template
    public images = IMAGES;

}


//IMAGES array implementing Image interface
var IMAGES: Image[] = [
    { "title": "Patton", "url": "http://wolna-polska.pl/wp-content/uploads/2014/12/a28.jpg", "description": "George Smith Patton Junior (ur. 11 listopada 1885 w San Gabriel, zm. 21 grudnia 1945 w Heidelbergu w Niemczech) – amerykański generał okresu II wojny światowej.Był postacią bardzo kontrowersyjną, budził skrajne uczucia zarówno u swoich podwładnych, jak i u przełożonych. Wśród swoich żołnierzy znany był jako Old blood and guts. Znakomity kawalerzysta i szermierz (napisał m.in. instrukcję szermierczą dla kawalerii amerykańskiej), namiętnie grywał w polo. Opowiadał o swoich bardzo realistycznych wizjach wcześniejszych wcieleń. Wierzył w reinkarnację, uważał się m.in. za wcielenie kartagińskiego żołnierza, rzymskiego legionisty, napoleońskiego generała i wielu innych postaci." },
    { "title": "Eisenhower", "url": "https://fthmb.tqn.com/-iPOZ5lTnUG6Y9dHryCI8lUGHDI=/768x0/filters:no_upscale()/about/dd-eisenhower-large-56a61ba75f9b58b7d0dff3c1.jpg", "description": "ps. Ike (ur. 14 października 1890 w Denison, zm. 28 marca 1969 w Waszyngtonie) – amerykański dowódca wojskowy, generał armii United States Army, uczestnik II wojny światowej, Naczelny Dowódca Alianckich Ekspedycyjnych Sił Zbrojnych (1943–1945), polityk, 34. prezydent Stanów Zjednoczonych (1953–1961)." },
    { "title": "Anders", "url": "https://ocdn.eu/pulscms-transforms/1/lHbktkpTURBXy8zYjdmNTgxMGQzMmQ3NTgwOTJmYjU5ODgzMjA2NjljOC5qcGeSlQMAzQS1zROwzQsTkwXNAyDNAcI", "description": "(ur. 11 sierpnia 1892 w Błoniu, zm. 12 maja 1970 w Londynie) – generał dywizji Polskich Sił Zbrojnych, Naczelny Wódz Polskich Sił Zbrojnych w latach 1944–1945 i 1946–1954[potrzebny przypis], następca prezydenta RP na uchodźstwie w latach 1950–1954, w 1954 mianowany przez władze emigracyjne generałem broni." },
    { "title": "Sosabowski", "url": "http://77.spds.w.interiowo.pl/sosabowski/2.jpg", "description": "Stanisław Franciszek Sosabowski (ur. 8 maja 1892 w Stanisławowie, zm. 25 września 1967 w Londynie) – działacz niepodległościowy, członek ruchu strzeleckiego i skautingu, uczestnik I wojny światowej w szeregach armii austro-węgierskiej, pułkownik dyplomowany piechoty Wojska Polskiego, 15 czerwca 1944 roku mianowany generałem brygady, organizator i dowódca 1 Samodzielnej Brygady Spadochronowej, z którą walczył w bitwie o Arnhem." },
    { "title": "Rommel", "url": "https://artofwar.pl/wp-content/uploads/photo-gallery/Erwin_Rommel3.jpeg", "description": "Erwin Rommel był najmłodszym niemieckim feldmarszałkiem (Generalfeldmarschall) podczas II wojny światowej. Dowodził Afrika Korps – niemieckim korpusem ekspedycyjnym w Afryce. Dzięki swoim znakomitym posunięciom i taktyce szybkiego przemieszczania wojsk stał się żywą legendą wśród żołnierzy niemieckich, ale przede wszystkim wśród aliantów. Ze względu na przebiegłość nazwany Lisem Pustyni (niem. Wüstenfuchs). Pod koniec wojny (1944) został skierowany do Francji jako dowódca Grupy Armii B, z zadaniem poprawienia umocnień w Normandii, w obliczu spodziewanej alianckiej inwazji. Miał syna, który przeżył wojnę." }
];