import {Component, Input} from '@angular/core';
import {TrafficLight} from "../enums/TrafficLight";

@Component({
  selector: 'traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.css']
})
export class TrafficLightComponent {
  @Input() activeLight: TrafficLight = TrafficLight.YELLOW;
  @Input() displaySideways: boolean = false;
  protected readonly TrafficLight = TrafficLight;
}
