import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() hero: Hero;
  @Input() cardSize: string;
  @Input() hasAdvantage: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
