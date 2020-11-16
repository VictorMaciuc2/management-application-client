import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  cl: Client[] = [
    { id: 11, name: 'Dr Nice', description: 'a' },
    { id: 12, name: 'Narco', description: 'nu' },
    { id: 13, name: 'Bombasto', description: 'da' },
  ];
  clients: Client[] = this.cl;
  constructor() { }

  ngOnInit(): void {
  }

}
