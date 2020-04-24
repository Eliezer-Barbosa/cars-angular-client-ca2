import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent implements OnInit {

  public cars: any;
  public currentCar = null;
  public currentIndex = -1;
  public name = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute) {}

  public ngOnInit() {
    this.retrieveCars();
  }

  public retrieveCars() {
    this.carService.getAll()
      .subscribe(
        (data) => {
          this.cars = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        });
  }

  public refreshList() {
    this.retrieveCars();
    this.currentCar = null;
    this.currentIndex = -1;
  }

  public setActiveCar(car, index) {
    this.currentCar = car;
    this.currentIndex = index;
  }

  public removeAllCars() {
    this.carService.deleteAll()
      .subscribe(
        (response) => {
          console.log(response);
          this.retrieveCars();
        },
        (error) => {
          console.log(error);
        });
  }

  public searchName() {
    this.carService.findByName(this.name)
      .subscribe(
        (data) => {
          this.cars = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        });
  }
}
