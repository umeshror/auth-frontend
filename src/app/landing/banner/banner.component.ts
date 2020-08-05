import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../accounts/login';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }


  ngOnInit(): void {
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent,
      {
        height: 'auto'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
