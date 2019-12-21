import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { visual } from 'src/environments/environment';


@Component({
  selector: 'app-visualization-web',
  templateUrl: './visualization-web.component.html',
  styleUrls: ['./visualization-web.component.css']
})
export class VisualizationWebComponent implements OnInit {

  url: string;

  constructor() { }

  ngOnInit() {
    this.url = visual.url;
  }

}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
