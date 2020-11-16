import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
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
