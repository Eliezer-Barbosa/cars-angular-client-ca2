import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  public currentCar = null;
  public message = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router) { }

  public ngOnInit() {
    this.message = '';
    this.getCar(this.route.snapshot.paramMap.get('id'));
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
      make: this.currentCar.make,
      available: status,
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
          this.message = 'The car was updated successfully!';
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
          this.router.navigate(['/cars']);
        },
        (error) => {
          console.log(error);
        });
  }
}
