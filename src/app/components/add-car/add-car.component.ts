import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  public car = {
    name: '',
    make: '',
    available: true,
  };
  public submitted = false;

  constructor(private carService: CarService) { }

  public ngOnInit() {
  }

  public saveCar() {
    const data = {
      name: this.car.name,
      make: this.car.make,
      available: this.car.available
    };

    this.carService.create(data)
      .subscribe(
        (response) => {
          console.log(response);
          this.submitted = true;
        },
        (error) => {
          console.log(error);
        });
  }

  public newCar() {
    this.submitted = false;
    this.car = {
      name: '',
      make: '',
      available: false,
    };
  }

}
