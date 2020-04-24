import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent implements OnInit {

  data: any;

  public unknowns = 0;
  public renaults = 0;
  public vws = 0;
  public fords = 0;
  public fiats = 0;
  public gms = 0;
  public audis = 0;

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

  public showPieChart() {
    this.data = {
      labels: [ 'Unknown', 'Renault', 'Volkswagen', 'Ford', 'Fiat', 'GM', 'Audi' ],
      datasets: [
          {
              data: [this.unknowns, this.renaults, this.vws, this.fords, this.fiats, this.gms, this.audis],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "red",
                  "blue",
                  "yellow",
                  "brown"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "red",
                  "blue",
                  "yellow",
                  "brown"
              ]
          }]
      };
  }

  public retrieveCars() {
    this.carService.getAll()
      .subscribe(
        (data) => {
          this.cars = data;
          console.log(data);
          console.log('cars total: ' + this.cars.length);
          this.cars.forEach((element) => {
            console.log(element.make);
            if (element.make === 'Unknown') {
              this.unknowns++;
            }
            if (element.make === 'Renault') {
              this.renaults++;
            }
            if (element.make === 'Volkswagen') {
              this.vws++;
            }
            if (element.make === 'Ford') {
              this.fords++;
            }
            if (element.make === 'Fiat') {
              this.fiats++;
            }
            if (element.make === 'GM') {
              this.gms++;
            }
            if (element.make === 'Audi') {
              this.audis++;
            }
          });
          console.log('NUMBERS');
          console.log('unknowns: ' + this.unknowns);
          console.log('renaults: ' + this.renaults);
          console.log('volkswagens: ' + this.vws);
          console.log('fords: ' + this.fords);
          console.log('fiats: ' + this.fiats);
          console.log('GMs: ' + this.gms);
          console.log('audis: ' + this.audis);

          this.showPieChart();
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
