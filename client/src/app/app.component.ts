// Every Angular Component needs the angular root component
import { Component } from '@angular/core';

// This is the decorator
@Component({
  // selector defines by what name the component is called
  selector: 'app-root',
  // this is the template/html file of our component
  templateUrl: './app.component.html',
  // this is the style/css file of our component
  styleUrls: ['./app.component.css']
})

// Everything you export here is going to be available
// in the rest of the component.
export class AppComponent {
  title = 'client';
}
