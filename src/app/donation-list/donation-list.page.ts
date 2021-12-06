import { Component, OnInit } from "@angular/core";
import { DonateService } from "../donate/donate.service";

@Component({
  selector: "app-donation-list",
  templateUrl: "./donation-list.page.html",
  styleUrls: ["./donation-list.page.scss"],
})
export class DonationListPage implements OnInit {
  donations: any[];

  constructor(private firestore: DonateService) {
    this.donations = [];
  }

  ngOnInit() {
    this.loadDonations();
  }

  loadDonations() {
    return this.firestore.getCollection("donations").subscribe((data) => {
      this.donations = data.sort(function (b, a) {
        return a.amount - b.amount;
      });
    });
  }
}
