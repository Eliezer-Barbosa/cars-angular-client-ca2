declare var require: any;

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  public makers: SelectItem[];
  public selectedMaker: Maker;

  public currentCar = null;
  public message = '';
  public newMaker = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
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
    this.message = '';
    this.getCar(this.route.snapshot.paramMap.get('id'));
  }

  public getColorName(color) {
    return coloraze.name(color);
  }

  public getCar(id) {
    this.carService.get(id)
      .subscribe(
        (data) => {
          this.currentCar = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        });
  }

  public updateAvailable(status) {
    const data = {
      name: this.currentCar.name,
      make: this.selectedMaker.name,
      year: this.currentCar.year,
      color: this.getColorName(this.currentCar.color),
      price: this.currentCar.price,
      available: this.currentCar.available,
    };

    this.carService.update(this.currentCar.id, data)
      .subscribe(
        (response) => {
          this.currentCar.available = status;
          console.log(response);
        },
        (error) => {
          console.log(error);
        });
  }

  public updateCar() {
    this.carService.update(this.currentCar.id, this.currentCar)
      .subscribe(
        (response) => {
          console.log(response);
          console.log('currentCar.make - ' + this.currentCar.make );
          // console.log('selectedMaker.name -' + this.selectedMaker.name);
          this.messageService.add( {severity: 'info', summary: `${this.currentCar.name}`, detail: 'has been updated succesfully'} );
          this.router.navigate(['/cars']);
        },
        (error) => {
          console.log(error);
        });
  }

  public deleteCar() {
      this.carService.delete(this.currentCar.id)
      .subscribe(
      (response) => {
      console.log(response);
      this.messageService.add( {severity: 'warn', summary: `${this.currentCar.name}`, detail: 'has been deleted succesfully'} );
      this.router.navigate(['/cars']);
    },
    (error) => {
      console.log(error);
    });
  }

  public confirmDelete() {
    this.confirmationService.confirm({
        message: `Are you sure you want to delete ${this.currentCar.name}?`,
        accept: () => {
            this.deleteCar();
        },
    });
  }

}
