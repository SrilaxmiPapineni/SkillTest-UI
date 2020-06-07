import { Component, OnInit, PipeTransform } from '@angular/core';
import { IContact } from '../models/contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ContactService } from '../services/contact.service';
import { AddEditContactComponent } from '../add-edit-contact/add-edit-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public title: string = 'Add Contact';
  submitType: string = 'Save';
  public contacts$: Observable<IContact[]>;
  public id: number = 0;
  public contacts: Array<IContact> = [];
  filter = new FormControl('');
  constructor(private modalService: NgbModal, private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.getContacts();
  }

  private getContacts(): void {
    this.contactService.getContacts().subscribe((res: Array<IContact>) => {
      this.contacts = res;
      this.contacts$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
    }, (err) => {
      window.alert('Please Contact Admin');
    })
  }
  public editContact(content: any, record: IContact): void {
    this.id = record.id;
    this.title = 'Edit Contact';
    this.submitType = 'Update';
    this.openPopup(content);
  }

  public deleteContact(record: IContact): void {
    const modal = this.modalService.open(ConfirmationComponent, { size: 'sm', centered: true });
    modal.result.then((i: any) => {
      if(i && i == 'Ok'){
        this.contactService.deleteContact(record.id).subscribe(contact => {
          this.getContacts();
        });
      }
    });
  }

  public addNewContact(content: any): void {
    this.id = 0;
    this.title = 'Add Contact';
    this.submitType = 'Save';
    this.openPopup(content);
  }

  private openPopup(content) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  public search(text: string): IContact[] {
    return this.contacts.filter((contact: IContact) => {
      const term = text.toLowerCase();
      return (contact.firstName && contact.firstName.toLowerCase().includes(term))
        || (contact.surName && contact.surName.toLowerCase().includes(term))
        || (contact.tel && contact.tel.toLowerCase().includes(term));
    });
  }

  public saveorUpdateContact(contactController: AddEditContactComponent): void {
    const contactModal = contactController.getContactData();
    if (contactModal.id > 0) {
      this.contactService.updateContact(contactModal).subscribe((res: any) => {
        this.getContacts();
        this.modalService.dismissAll();
      });
    } else {
      this.contactService.createContact(contactModal).subscribe((res: any) => {
        this.getContacts();
        this.modalService.dismissAll();
      });
    }
  }
}
