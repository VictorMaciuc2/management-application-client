import { Component } from '@angular/core';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'management-application-client';
  constructor(private service: TestService) { 
    service.testCall().subscribe(result => {
      console.log(result);
    })
  }
}
