import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
  isExpanded = this.isSmallScreen ? false: true;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

}
