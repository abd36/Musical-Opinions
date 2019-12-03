import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { SecureService } from '../secure.service';

@Component({
  selector: 'app-security-privacy-policy',
  templateUrl: './security-privacy-policy.component.html',
  styleUrls: ['./security-privacy-policy.component.css']
})
export class SecurityPrivacyPolicyComponent implements OnInit {
  security: string;
  privacy: string;

  constructor(private secureService: SecureService, private location: Location) { }

  ngOnInit() {
    this.secureService.getSecurityPrivacyPolicy().subscribe(data => {
      if (!data.error) {
        this.security = data.security;
        this.privacy = data.privacy;
      } else console.log(data.error);
    });
  }

  goBack() {
    this.location.back();
  }

}
