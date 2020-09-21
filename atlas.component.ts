import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { HermesService } from '../../../shared-ng/services/services';
import {} from 'googlemaps';

@Component({
  selector: 'atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.css']
})
export class AtlasComponent implements OnInit {

  bgLink = 'https://aswwu.com/media/images/background/background.jpg';
  bgLinkChanged = 'url(' + this.bgLink + ')';

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  atlasEmployees: { role: string, username: string, photoURL: string, full_name: string }[] = [
    {"role": "Manager","username": "Brian.Paredes", "photoURL": "/profiles/1920/1840-2024509.jpg", "full_name": "Brian Andrew Paredes"},
    {"role": "Assistant Manger","username": "Hunter.Giesbrecht", "photoURL": "profiles/1819/03160-2038751.jpg", "full_name": "Hunter Giesbrecht"},
    {"role": "Marketing Coordinator","username":"Charmaine.Tan","photoURL": "profiles/1920/1249-2049290.jpg", "full_name": "Charmaine Tan"},
    {"role": "Beverage Specialist", "username":"Annalise.Harvey", "photoURL":"profiles/1819/01002-2022270.jpg", "full_name":"Annalise Harvey"},
    {"role": "Barista", "username": "Andrew.Nascimento", "photoURL": "profiles/1819/02776-2052796.jpg", "full_name": "Andrew Nascimento"},
    {"role": "Barista", "username": "Breanna.Scully", "photoURL": "profiles/1920/1129-2034359.jpg", "full_name": "Breanna Scully"},
    {"role": "Barista", "username": "Brooklyn.Anderson", "photoURL": "profiles/1819/00966-2044615.jpg", "full_name": "Brooklyn Anderson"},
    {"role": "Barista", "username": "Gregory.Birge", "photoURL": "/profiles/1920/2262-2019445.jpg", "full_name": "Gregory Birge"},
    {"role": "Barista", "username": "Jonathan.Gillespie", "photoURL": "profiles/1819/02220-2054485.jpg", "full_name": "Jonathan Gillespie"},
    {"role": "Barista", "username": "Ryan.Rojas", "photoURL": "profiles/1718/00358-2036350.jpg", "full_name": "Ryan Rojas"},
    {"role": "Barista", "username": "Zachary.Macomber", "photoURL":"/profiles/1920/966-2048546.jpg", "full_name":"Zachary Macomber"},
    {"role": "Barista", "username": "Zack.Hoffer", "photoURL": "/profiles/1920/1739-2037147.jpg", "full_name": "Zack Hoffer"}
  ];

  constructor(private hermesService: HermesService, private elementRef: ElementRef) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    // hides header and sub nav bar
    hermesService.sendShowHeader(false);
    hermesService.sendShowSubNav(true);
   }

  initMap() {
    let atlas = {lat: 46.049530, lng: -118.388233};
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: atlas,
      disableDefaultUI: true,
      scrollwheel:false,
      zoomControl: true,
      styles: [
        {
          featureType: 'all',
          stylers: [
            {hue: "#ae8648"},
            {saturation: 70},
            {lightness: 0},
            {gamma: 1}
          ]
        },{
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            { visibility: 'off' }
          ]
        }
      ]
    });

    let image = {
      url: './media/coffeeMarker.png',
      anchor: new google.maps.Point(20,40),
      origin: new google.maps.Point(0, 0),
      size: new google.maps.Size(128, 128),
      scaledSize: new google.maps.Size(40,40)
    };
    let infowindow = new google.maps.InfoWindow({
      content: "<a href='https://www.google.com/maps/dir//46.049527,-118.3882132/' target='_blank'>Get Directions</a>",
      pixelOffset: new google.maps.Size(-44,0)
    });
    let marker = new google.maps.Marker({
      position: atlas,
      map: map,
      icon: image
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

  ngOnInit():void {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }
}
