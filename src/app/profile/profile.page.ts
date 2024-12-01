import { Component } from '@angular/core';
import { User } from 'src/models/user';
import { Page } from 'src/app/navigator/page';
import { JobService } from 'src/app/job-service/job.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { ProfileService } from '../profile-service/profile.service';

@Component({
	selector: 'app-profile',
	templateUrl: 'profile.page.html',
	styleUrls: ['profile.page.scss']
})
export class ProfilePage {

	user: User;
	units: string;

	constructor(private profileService: ProfileService, private auth: AuthService,
		private navigator: NavigatorService, private jobService: JobService) {
		this.profileService.getUser().subscribe(u => this.user = u);
		this.profileService.getUnits().subscribe(u => this.units = u);
	}

	ionViewWillEnter(): void {
		this.navigator.onAfterNavigate(Page.Profile);
	}

	ionViewWillLeave(): void {
		this.navigator.onBeforeNavigate(Page.Profile, null);
	}

	getUnits(): string {
		return this.units;
	}

	toggleUnits(): void {
		const to = this.units === 'cm' ? 'in' : 'cm';
		this.profileService.setUnits(to).subscribe(u => this.units = u);
	}

	goToManageProfile(): void {
		this.navigator.navigateToPage(Page.ManageProfile);
	}

	goToShipping(): void {
		this.navigator.navigateToPage(Page.Address);
	}

	goToHistory(): void {
		this.navigator.navigateToPage(Page.OrderHistory);
	}

	logout(): void {
		this.auth.logout();
	}
}
