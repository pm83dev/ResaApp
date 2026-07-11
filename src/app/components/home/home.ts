import { Component, OnInit } from '@angular/core';
import { ResaApiService } from '../../service/resaApi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  public title: string = 'ResaFrontend';

  constructor(public resaApiService: ResaApiService) {}

  ngOnInit(): void {
    this.resaApiService.loadQuote();
  }
}

