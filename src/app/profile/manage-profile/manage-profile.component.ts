import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { User } from 'src/models/user';

@Component({
	selector: 'app-manage-profile',
	templateUrl: './manage-profile.component.html',
	styleUrls: ['./manage-profile.component.scss'],
})
export class ManageProfileComponent implements OnInit {

	user: User;
	edit: boolean;

	constructor(private profileService: ProfileService) {
		this.profileService.getUser().subscribe(u => this.user = u);
	}

	ngOnInit(): void { }

	toggleEdit(): void {
		this.edit = true;
	}

	save(): void {
		// send saved changes to server
		this.edit = false;
	}
}
