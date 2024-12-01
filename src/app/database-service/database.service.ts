import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user';
import { Job } from 'src/models/job';
import { Address } from 'src/models/address';
import { Room } from 'src/models/room';
import { Window } from 'src/models/window';
import { Organization } from 'src/models/organization';
import { Order } from 'src/models/order';
import { AddressDBO } from 'src/models/dbo/address.dbo';
import { switchMap } from 'rxjs/operators';
import { JobDBO } from 'src/models/dbo/job.dbo';
import { OrganizationDBO } from 'src/models/dbo/organization.dbo';
import { RoomDBO } from 'src/models/dbo/room.dbo';
import { UserDBO } from 'src/models/dbo/user.dbo';
import { WindowDBO } from 'src/models/dbo/window.dbo';
import { OrderDBO } from 'src/models/dbo/order.dbo';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	public static domain = 'http://painless-prep.us-east-2.elasticbeanstalk.com';

	constructor(private client: HttpClient) { }

	private formUrl(model: string, ...parameters: any[]): string {
		return `${DatabaseService.domain}/api/${model}/${parameters.join('/')}`;
	}

	// Login
	login(emailAddress: string, password: string): Observable<any> {
		const url = this.formUrl('login');
		return this.client.post<any>(url, { email: emailAddress, password });
	}

	validateToken(): Observable<boolean> {
		const url = this.formUrl('login/validate');
		return this.client.post<any>(url, {});
	}

	// Checking Duplicate Email
	checkDuplicateEmail(email: any): Observable<any> {
		const url = this.formUrl('user/duplicate', email);
		return this.client.get<any>(url);
	}

	createOrder(order: Order, userId: number): Observable<Order> {
		const url = this.formUrl('order', userId);
		const dbo = this.client.post<OrderDBO>(url, order);
		return dbo.pipe(
			switchMap(inner => of(Order.fromDBO(inner)))
		);
	}

	getOrder(orderId: number): Observable<Order> {
		const url = this.formUrl('order', orderId);
		const dbo = this.client.get<OrderDBO>(url);
		return dbo.pipe(
			switchMap(inner => of(Order.fromDBO(inner)))
		);
	}

	getOrderHistory(userId: number, start: number = 0, count: number = 25): Observable<Order[]> {
		const url = this.formUrl('order/history', userId, start, count);
		const dbo = this.client.get<OrderDBO[]>(url);
		return dbo.pipe(
			switchMap((inner) => of(inner.map(o => Order.fromDBO(o))))
		);
	}

	getAddress(addressId: number): Observable<Address> {
		const url = this.formUrl('address', addressId);
		const dbo = this.client.get<AddressDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Address.fromDBO(inner)))
		);
	}

	createAddress(address: Address): Observable<Address> {
		const url = this.formUrl('address');
		const dbo = this.client.post<AddressDBO>(url, address);
		return dbo.pipe(
			switchMap((inner) => of(Address.fromDBO(inner)))
		);
	}

	updateAddress(address: Address): Observable<Address> {
		const url = this.formUrl('address');
		const dbo = this.client.put<AddressDBO>(url, address);
		return dbo.pipe(
			switchMap((inner) => of(Address.fromDBO(inner)))
		);
	}

	deleteAddress(addressId: number): Observable<Address> {
		const url = this.formUrl('address', addressId);
		const dbo = this.client.delete<AddressDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Address.fromDBO(inner)))
		);
	}

	getAllJobs(userId: number): Observable<Job[]> {
		const url = this.formUrl('job/all', userId);
		const dbo = this.client.get<JobDBO[]>(url);
		return dbo.pipe(
			switchMap((inner) => of(inner.map(j => Job.fromDBO(j))))
		);
	}

	getJob(jobId: number): Observable<Job> {
		const url = this.formUrl('job', jobId);
		const dbo = this.client.get<JobDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Job.fromDBO(inner)))
		);
	}

	createJob(job: Job): Observable<Job> {
		const url = this.formUrl('job');
		const dbo = this.client.post<JobDBO>(url, job);
		return dbo.pipe(
			switchMap((inner) => of(Job.fromDBO(inner)))
		);
	}

	updateJob(job: Job): Observable<Job> {
		const url = this.formUrl('job');
		const dbo = this.client.put<JobDBO>(url, job);
		return dbo.pipe(
			switchMap((inner) => of(Job.fromDBO(inner)))
		);
	}

	deleteJob(jobId: number): Observable<void> {
		const url = this.formUrl('job', jobId);
		return this.client.delete<void>(url);
	}

	getOrganization(organizationId: number): Observable<Organization> {
		const url = this.formUrl('organization', organizationId);
		const dbo = this.client.get<OrganizationDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Organization.fromDBO(inner)))
		);
	}

	createOrganization(organization: Organization): Observable<Organization> {
		const url = this.formUrl('organization');
		const dbo = this.client.post<OrganizationDBO>(url, organization);
		return dbo.pipe(
			switchMap((inner) => of(Organization.fromDBO(inner)))
		);
	}

	updateOrganization(organization: Organization): Observable<Organization> {
		const url = this.formUrl('organization');
		const dbo = this.client.put<OrganizationDBO>(url, organization);
		return dbo.pipe(
			switchMap((inner) => of(Organization.fromDBO(inner)))
		);
	}

	deleteOrganization(organizationId: number): Observable<Organization> {
		const url = this.formUrl('organization', organizationId);
		const dbo = this.client.delete<OrganizationDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Organization.fromDBO(inner)))
		);
	}

	getRoom(roomId: number): Observable<Room> {
		const url = this.formUrl('room', roomId);
		const dbo = this.client.get<RoomDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Room.fromDBO(inner)))
		);
	}

	createRoom(room: Room): Observable<Room> {
		const url = this.formUrl('room');
		const dbo = this.client.post<RoomDBO>(url, room);
		return dbo.pipe(
			switchMap((inner) => of(Room.fromDBO(inner)))
		);
	}

	updateRoom(room: Room): Observable<Room> {
		const url = this.formUrl('room');
		const dbo = this.client.put<RoomDBO>(url, room);
		return dbo.pipe(
			switchMap((inner) => of(Room.fromDBO(inner)))
		);
	}

	deleteRoom(roomId: number): Observable<Room> {
		const url = this.formUrl('room', roomId);
		const dbo = this.client.delete<RoomDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Room.fromDBO(inner)))
		);
	}

	getUser(userId: number): Observable<User> {
		const url = this.formUrl('user', userId);
		const dbo = this.client.get<UserDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(User.fromDBO(inner)))
		);
	}

	createUser(user: User): Observable<void> {
		const url = this.formUrl('user');
		return this.client.post<void>(url, user);
	}

	updateUser(user: User): Observable<User> {
		const url = this.formUrl('user');
		const dbo = this.client.put<UserDBO>(url, user);
		return dbo.pipe(
			switchMap((inner) => of(User.fromDBO(inner)))
		);
	}

	deleteUser(userId: number): Observable<User> {
		const url = this.formUrl('user', userId);
		const dbo = this.client.delete<UserDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(User.fromDBO(inner)))
		);
	}

	getWindow(windowId: number): Observable<Window> {
		const url = this.formUrl('window', windowId);
		const dbo = this.client.get<WindowDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Window.fromDBO(inner)))
		);
	}

	createWindow(window: Window): Observable<Window> {
		const url = this.formUrl('window');
		const dbo = this.client.post<WindowDBO>(url, window);
		return dbo.pipe(
			switchMap((inner) => of(Window.fromDBO(inner)))
		);
	}

	updateWindow(window: Window): Observable<Window> {
		const url = this.formUrl('window');
		const dbo = this.client.put<WindowDBO>(url, window);
		return dbo.pipe(
			switchMap((inner) => of(Window.fromDBO(inner)))
		);
	}

	deleteWindow(windowId: number): Observable<Window> {
		const url = this.formUrl('window', windowId);
		const dbo = this.client.delete<WindowDBO>(url);
		return dbo.pipe(
			switchMap((inner) => of(Window.fromDBO(inner)))
		);
	}
}
