import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Ensure the DOM is fully loaded
    setTimeout(() => { // Use setTimeout to wait for the full load of SVG
      const labelPoints = document.querySelectorAll('#label_points circle');
      labelPoints.forEach(circle => {
        circle.addEventListener('click', function() {
          const locationName = circle.getAttribute('class');
          alert(locationName);
        });
      });
    }, 0);
  }

}
