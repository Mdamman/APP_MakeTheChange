import { Component, Input, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "main-slider",
  templateUrl: "./main-slider.component.html",
  styleUrls: ["./main-slider.component.scss"],
})
export class MainSliderComponent implements OnInit {
  @Input() data: Array<any>;
  public slideOpts: object;

  constructor(private navCtrl: NavController) {
    this.slideOpts = {
      effect: "cube",
    };
  }

  ngOnInit() {}

  openTournament() {
    // this.navCtrl.navigateForward(["tournament"]);
  }
}
