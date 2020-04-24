declare var require: any;

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { stringify } from 'querystring';
import { CarService } from 'src/app/services/car.service';

const Coloraze = require('coloraze');

const coloraze = new Coloraze();

// tslint:disable-next-line: interface-name
interface Maker {
  name: string;
}

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  public makers: Maker[];
  public selectedMaker: Maker;

  public car = {
    name: '',
    make: '',
    year: '',
    color: '',
    price: '',
    available: true,
  };
  public submitted = false;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) {

      this.makers = [
        {name: 'Unknown'},
        {name: 'Renault'},
        {name: 'Volkswagen' },
        {name: 'Ford'},
        {name: 'Fiat'},
        {name: 'GM'},
        {name: 'Audi'},
      ];

     }

  public ngOnInit() {
   // console.log(coloraze.name('#fdd5b1')); // Light apricot
  }

  public getColorName(color) {
    return coloraze.name(color);
  }

  public saveCar() {
    const data = {
      name: this.car.name,
      make: stringify(this.selectedMaker),
      year: this.car.year,
      color: this.car.color,
      price: this.car.price,
      available: this.car.available,
    };
    data.make = data.make.slice(5, 20);
    data.color === null || data.color === '' ? data.color = 'Black' : data.color = this.getColorName(data.color);

    this.carService.create(data)
      .subscribe(
        (response) => {
          console.log(response);
          this.submitted = true;
          this.messageService.add( {severity: 'success', summary: `${data.name}`, detail: 'has been added succesfully'} );
          this.router.navigate(['/cars']);
        },
        (error) => {
          console.log(error);
          console.log('color: ' + data.color);
          this.messageService.add( {severity: 'error', summary: 'Some fiels are empty', detail: error.error.message} );
        });
  }

  public newCar() {
    this.submitted = false;
    this.car = {
      name: '',
      make: '',
      year: '',
      color: '',
      price: '',
      available: false,
    };
  }
}
