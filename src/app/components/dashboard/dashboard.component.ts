import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public data: any;

  public cars: any;

  public unknowns = 0;
  public renaults = 0;
  public vws = 0;
  public fords = 0;
  public fiats = 0;
  public gms = 0;
  public audis = 0;

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

  public showPieChart() {
    this.data = {
      labels: [ 'Unknown', 'Renault', 'Volkswagen', 'Ford', 'Fiat', 'GM', 'Audi' ],
      datasets: [
          {
              data: [this.unknowns, this.renaults, this.vws, this.fords, this.fiats, this.gms, this.audis],
              backgroundColor: [
                  '#6abd4a',
                  '#7abfae',
                  '#bda5d4',
                  '#d9c17c',
                  '#ebb8b0',
                  '#80cc45',
                  '#57cfb9'
              ],
              hoverBackgroundColor: [
                  '#2d5c1c',
                  '#548a7c',
                  '#8e6bb0',
                  '#ad9758',
                  '#e68070',
                  '#53872a',
                  '#3c9e8c'
              ],
          }],
      };
  }

}
