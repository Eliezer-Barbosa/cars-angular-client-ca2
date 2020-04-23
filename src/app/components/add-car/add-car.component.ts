declare var require: any;

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { CarService } from 'src/app/services/car.service';

const Coloraze = require('coloraze');

const coloraze = new Coloraze();

// tslint:disable-next-line: interface-name
interface Maker {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  public makers: SelectItem[];
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
        {label: 'Select Maker', value: null},
        {label: 'Volkswagen', value: {id: 1, name: 'Volkswagen', code: 'VW'}},
        {label: 'Ford', value: {id: 2, name: 'Ford', code: 'FORD'}},
        {label: 'Fiat', value: {id: 3, name: 'Fiat', code: 'FIAT'}},
        {label: 'GM', value: {id: 4, name: 'GM', code: 'GM'}},
        {label: 'Audi', value: {id: 5, name: 'Audi', code: 'AUDI'}},
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
      make: this.car.make,
      year: this.car.year,
      color: this.getColorName(this.car.color),
      price: this.car.price,
      available: this.car.available,
    };

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
