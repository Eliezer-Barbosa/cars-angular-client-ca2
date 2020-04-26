import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // tslint:disable-next-line: object-literal-sort-keys
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public data: any;
  public options: any;

  public cars: any;

  public audis = 0;
  public bmws = 0;
  public chevs = 0;
  public ferraris = 0;
  public fiats = 0;
  public fords = 0;
  public hondas = 0;
  public mercedes = 0;
  public porsches = 0;
  public renaults = 0;
  public vws = 0;

  constructor(private carService: CarService) {
   }

  public ngOnInit() {
    this.retrieveCars();
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
            if (element.make === 'Audi') {
              this.audis++;
            }
            if (element.make === 'BMW') {
              this.bmws++;
            }
            if (element.make === 'Chevrolet') {
              this.chevs++;
            }
            if (element.make === 'Ferrari') {
              this.ferraris++;
            }
            if (element.make === 'Fiat') {
              this.fiats++;
            }
            if (element.make === 'Ford') {
              this.fords++;
            }
            if (element.make === 'Honda') {
              this.hondas++;
            }
            if (element.make === 'Mercedes Benz') {
              this.mercedes++;
            }
            if (element.make === 'Porsche') {
              this.porsches++;
            }
            if (element.make === 'Renault') {
              this.renaults++;
            }
            if (element.make === 'Volkswagen') {
              this.vws++;
            }

          });

          this.showPieChart();
          this.showBarChart();

        },
        (error) => {
          console.log(error);
        });
  }

  public showPieChart() {
    Chart.defaults.global.defaultFontColor = 'white';

    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
            precision: 0,
          },
        }],
      },
    },

    this.data = {
      labels: [
        'Audi', 'BMW', 'Chevrolet', 'Ferrari',
        'Fiat', 'Ford', 'Honda', 'Mercedes Benz',
        'Porsche', 'Renault', 'Volkswagen',
      ],
      // tslint:disable-next-line: object-literal-sort-keys
      datasets: [
          {
              data: [
                this.audis,
                this.bmws, this.chevs,
                this.ferraris, this.fiats, this.fords,
                this.hondas, this.mercedes,
                this.porsches, this.renaults, this.vws,
              ],
              // tslint:disable-next-line: object-literal-sort-keys
              backgroundColor: [
                  '#85898c',
                  '#7abfae',
                  '#bda5d4',
                  '#d9c17c',
                  '#ebb8b0',
                  '#80cc45',
                  '#57cfb9',
                  '#e691e0',
                  '#7575d9',
                  '#d46e3f',
                  '#d1bc43',
                  '#68d43d',
              ],
              hoverBackgroundColor: [
                  '#4e5357',
                  '#548a7c',
                  '#8e6bb0',
                  '#ad9758',
                  '#e68070',
                  '#53872a',
                  '#3c9e8c',
                  '#804f7c',
                  '#31316e',
                  '#804022',
                  '#877929',
                  '#3d8022',
              ],
          }],
      };
  }

  public showBarChart() {
    Chart.defaults.global.defaultFontColor = 'white';

    this.data = {
      labels: [
        'Audi',
        'BMW', 'Chevrolet', 'Ferrari',
        'Fiat', 'Ford', 'Honda',
        'Mercedes Benz',
        'Porsche', 'Renault',
        'Volkswagen',
      ],
      // tslint:disable-next-line: object-literal-sort-keys
      datasets: [
          {
            data: [
              this.audis,
              this.bmws, this.chevs,
              this.ferraris, this.fiats, this.fords,
              this.mercedes, this.porsches,
              this.renaults, this.vws,
            ],
              // tslint:disable-next-line: object-literal-sort-keys
              backgroundColor: [
                '#85898c',
                '#7abfae',
                '#bda5d4',
                '#d9c17c',
                '#ebb8b0',
                '#80cc45',
                '#57cfb9',
                '#e691e0',
                '#7575d9',
                '#d46e3f',
                '#d1bc43',
                '#68d43d',
              ],
              hoverBackgroundColor: [
                '#4e5357',
                '#548a7c',
                '#8e6bb0',
                '#ad9758',
                '#e68070',
                '#53872a',
                '#3c9e8c',
                '#804f7c',
                '#31316e',
                '#804022',
                '#877929',
                '#3d8022',
              ],
          }],
      };
  }

}
