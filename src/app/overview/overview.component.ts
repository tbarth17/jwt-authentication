import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../shared/user-api.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

    constructor(private userApiService: UserApiService) { }

    ngOnInit() {
        console.log('OverviewComponent fired');
    }

    fetchUser () {
        this.userApiService.getUser()
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        console.log('user data', data);
    }

}
