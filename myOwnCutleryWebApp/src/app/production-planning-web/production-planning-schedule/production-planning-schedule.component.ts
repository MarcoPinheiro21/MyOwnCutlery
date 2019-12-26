import { Component, OnInit } from '@angular/core';
import { ProductionPlanningScheduleService } from './production-planning-schedule.service';
import { RequestProductionPlan } from 'src/app/models/request-production-plan.model';

@Component({
  selector: 'app-production-planning-schedule',
  templateUrl: './production-planning-schedule.component.html',
  styleUrls: ['./production-planning-schedule.component.css']
})
export class ProductionPlanningScheduleComponent implements OnInit {

  isDateValid = true;
  success = false;
  selectedInitialDate: Date;
  selectedFinalDate: Date;
  request: RequestProductionPlan;
  currentDate: string;
  ppService: ProductionPlanningScheduleService;

  constructor(service: ProductionPlanningScheduleService) {
    this.ppService = service;
   }

  ngOnInit() {
    this.request = {
      finalDate: '',
      initialDate: ''
    };
    const today = new Date();
    this.currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }

  schedule() {
    if (!this.isValidDates()) {
      return;
    }
    this.request.initialDate = this.selectedInitialDate.toString() + 'T00:00:00';
    this.request.finalDate = this.selectedFinalDate.toString() + 'T00:00:00';
    this.ppService.createProductionPlan(this.request).subscribe(it => {},
    error => {
      if (error.error.text === 'Success') {
        this.timerHideAlert();
      }
    });
  }
  isValidDates(): boolean {
    if (!this.selectedInitialDate || (this.selectedInitialDate.toString() > this.selectedFinalDate.toString())) {
      this.isDateValid = false;
      return false;
    }
    return true;
  }

  timerHideAlert() {
    this.success = true;
    setTimeout(() => this.hideAlert(), 5000);
  }

  hideAlert() {
    this.success = false;
  }

}
