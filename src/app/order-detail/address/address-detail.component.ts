import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/models/address';

@Component({
	selector: 'app-address-detail',
	templateUrl: './address-detail.component.html',
	styleUrls: ['./address-detail.component.scss'],
})
export class AddressDetailComponent implements OnInit {

	@Input() address: Address;

	constructor() { }

	ngOnInit(): void { }

}
