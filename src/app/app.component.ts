import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {TrafficLight} from "./enums/TrafficLight";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private redLightSub: Subscription | undefined;
  private yellowLightSub: Subscription | undefined;
  private greenLightSub: Subscription | undefined;


  public xTrafficLightsSignal: TrafficLight = TrafficLight.RED;
  public yTrafficLightsSignal: TrafficLight = TrafficLight.GREEN;

  public ngOnInit(): void {
    this.beginRedToYellowTimer();
  }

  private beginRedToYellowTimer(): void {
    this.yellowLightSub?.unsubscribe();
    this.redLightSub = interval(5000).subscribe(() => {
      this.xTrafficLightsSignal = TrafficLight.YELLOW;
      this.yTrafficLightsSignal = TrafficLight.YELLOW;
      this.beginYellowToGreenTimer();
    });
  }

  private beginYellowToGreenTimer(): void {
    this.redLightSub?.unsubscribe();
    this.yellowLightSub = interval(2000).subscribe(() => {
      this.xTrafficLightsSignal = TrafficLight.GREEN;
      this.yTrafficLightsSignal = TrafficLight.RED;
      this.beginGreenToYellowTimer();
    });
  }

  private beginGreenToYellowTimer(): void {
    this.yellowLightSub?.unsubscribe();
    this.greenLightSub = interval(5000).subscribe(() => {
      this.xTrafficLightsSignal = TrafficLight.YELLOW;
      this.yTrafficLightsSignal = TrafficLight.YELLOW;
      this.beginYellowToRedTimer();
    })
  }

  private beginYellowToRedTimer(): void {
    this.greenLightSub?.unsubscribe();
    this.yellowLightSub = interval(2000).subscribe(() => {
      this.xTrafficLightsSignal = TrafficLight.RED;
      this.yTrafficLightsSignal = TrafficLight.GREEN;
      this.beginRedToYellowTimer();
    });
  }
}
