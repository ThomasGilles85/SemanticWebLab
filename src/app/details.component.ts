import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'details-root',
  template: `
          Welcome to the details number {{id}}
        `,
})
export class DetailsComponent {

public id:string;

constructor(
  private route: ActivatedRoute,
  private router: Router,
) {}

  ngOnInit() {

      this.id = this.route.snapshot.params['id'];
}
}



