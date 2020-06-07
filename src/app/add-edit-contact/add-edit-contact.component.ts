import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IContact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss']
})
export class AddEditContactComponent implements OnInit, OnChanges {
  public contactModel: IContact = {};
  @Input() id: number = 0;
  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.id > 0){
      this.contactService.getContact(this.id).subscribe((res: IContact) => {
        this.contactModel = res;
      })
    }
  }

  public getContactData(): IContact {
    this.contactModel.id = this.id;
    return this.contactModel;
  }
}
