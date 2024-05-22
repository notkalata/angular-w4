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
  private emergencyEndSub: Subscription | undefined;


  public xTrafficLightsSignal: TrafficLight = TrafficLight.RED;
  public yTrafficLightsSignal: TrafficLight = TrafficLight.GREEN;

  public ngOnInit(): void {
    this.beginRedToYellowTimer();
  }

  public emergency(): void {
    this.yellowLightSub?.unsubscribe();
    this.redLightSub?.unsubscribe();
    this.greenLightSub?.unsubscribe();

    this.yTrafficLightsSignal = TrafficLight.YELLOW;
    this.xTrafficLightsSignal = TrafficLight.YELLOW;

    let emergencySignalOffSub = interval(1000).subscribe(() => {
      this.yTrafficLightsSignal = TrafficLight.NONE;
      this.xTrafficLightsSignal = TrafficLight.NONE;
    });

    let emergencySignalOnSub = interval(2000).subscribe(() => {
      this.yTrafficLightsSignal = TrafficLight.YELLOW;
      this.xTrafficLightsSignal = TrafficLight.YELLOW;
    });

    this.emergencyEndSub = interval(10000).subscribe(() => {
      emergencySignalOffSub.unsubscribe();
      emergencySignalOnSub.unsubscribe();
      this.beginRedToYellowTimer();
    })
  }

  public cross(isY: boolean): void {
    const incorrectCrossY = isY && this.yTrafficLightsSignal === TrafficLight.YELLOW;
    const incorrectCrossX = !isY && this.xTrafficLightsSignal === TrafficLight.YELLOW;

    if (incorrectCrossX || incorrectCrossY) {
      alert("Неправилно пресичане!");
    }
  }

  private beginRedToYellowTimer(): void {
    if (this.emergencyEndSub) {
      this.emergencyEndSub.unsubscribe();
    }
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

  protected readonly TrafficLight = TrafficLight;
}
