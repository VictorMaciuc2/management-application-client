import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClientModal } from 'src/app/modals/client-modal/client-modal';
import { DeleteConfirmationModal } from 'src/app/modals/delete-confirmation/delete-confirmation';
import { ClientsService } from 'src/app/services/clients.service';
import {Client} from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public dataSource;
  public clients: Client[] = [];
  public filterSearch: string;
  public displayedColumns: string[] = ['name', 'description', 'edit', 'delete'];
  constructor(public clientsService: ClientsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientsService.getClients().subscribe(clients => {
      this.clients = clients;
      this.dataSource = new MatTableDataSource(this.clients);
    });
  }

  onFilterChanged() {
    this.dataSource = new MatTableDataSource(this.clients.filter(client => client.name.includes(this.filterSearch)));
  }

  deleteClient(client) {
    let dialogRef = this.dialog.open(DeleteConfirmationModal);

    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.clientsService.delete(client.id).subscribe(_ => {
          this.clients = this.clients.filter(d => d.id != client.id);
          this.dataSource = new MatTableDataSource(this.clients);
        })
      }
    });
  }

  editClient(client: Client) {
    let dialogRef = this.dialog.open(ClientModal, {
      data: {
        client: {...client}
      }
    });

    dialogRef.afterClosed().subscribe(client => {
      this.clientsService.update(client).subscribe(_ => {
        var indexOfclient = this.clients.indexOf(this.clients.find(d => d.id == client.id));
        this.clients[indexOfclient] = client;
        this.dataSource = new MatTableDataSource(this.clients);
      });
    });
  }

  saveClient() {
    let dialogRef = this.dialog.open(ClientModal, {
      data: {
        client: new Client()
      }
    });

    dialogRef.afterClosed().subscribe(client => {
      this.clientsService.save(client).subscribe(savedclient => {
        this.clients.push(savedclient);
        this.dataSource = new MatTableDataSource(this.clients);
      });
    });
  }

}
