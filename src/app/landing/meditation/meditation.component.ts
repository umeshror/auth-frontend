import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.scss']
})
export class MeditationComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
    console.log('ngOnInit');
  }

}

