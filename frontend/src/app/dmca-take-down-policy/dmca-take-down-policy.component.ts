import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { SecureService } from '../secure.service';

@Component({
  selector: 'app-dmca-take-down-policy',
  templateUrl: './dmca-take-down-policy.component.html',
  styleUrls: ['./dmca-take-down-policy.component.css']
})
export class DmcaTakeDownPolicyComponent implements OnInit {
  dmca: string;
  takedown: string;

  constructor(private secureService: SecureService, private location: Location) { }

  ngOnInit() {
    this.secureService.getDmcaTakeDownPoliciy().subscribe(data => {
      if (!data.error) {
        this.dmca = data.dmca;
        this.takedown = data.takeDown;
      } else console.log(data.error);
    });
  }

  goBack() {
    this.location.back();
  }

}
