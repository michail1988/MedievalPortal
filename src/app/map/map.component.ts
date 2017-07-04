import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
} )

//https://www.gps-coordinates.net/
export class MapComponent implements OnInit {

    title: string = 'Uniwersytet historyczny';
    lat: number = 51.11270829999999;
    lng: number = 17.035688499999992;

    constructor() { }

    ngOnInit() {
    }

}
