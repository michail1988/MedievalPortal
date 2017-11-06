import { Component, OnInit } from '@angular/core';
import { News } from "app/models/news";
import { NewsService } from "app/services/news.service";

@Component( {
    selector: 'news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
} )
export class NewsComponent implements OnInit {

    //The time to show the next photo
    private NextPhotoInterval: number = 2000;
    //Looping or not
    private noLoopSlides: boolean = false;
    //Photos
    private slides: Array<any> = [];

    news: News[];

    constructor(private newsService: NewsService) {
        this.addNewSlide();
    }

    private addNewSlide() {
        this.slides.push(
            { image: '/assets/cars/car1.jpg', text: 'BMW 1', description: 'Pierwszy samochodzik' },
            { image: '/assets/cars/car2.jpg', text: 'BMW 2', description: 'Drugi samochodzik' },
            { image: '/assets/cars/car3.jpg', text: 'BMW 3', description: 'Trzeci samochodzik' },
            { image: '/assets/cars/car4.jpg', text: 'BMW 4', description: 'Czwarty samochodzik' },
            { image: '/assets/cars/car5.jpg', text: 'BMW 5', description: 'Inny opis, inny temat' },
            { image: '/assets/cars/car6.jpg', text: 'BMW 6', description: 'Opis, naglowek' }
        );
    }

    private removeLastSlide() {
        this.slides.pop();
    }

    ngOnInit() {
        this.loadNews()
    }

    loadNews() {
        this.newsService.getNews()
            .subscribe(
            n => this.news = n, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

}
