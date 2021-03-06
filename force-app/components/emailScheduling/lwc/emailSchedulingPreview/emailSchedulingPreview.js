import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import participants from '@salesforce/label/c.EmailConfirmation_RegisteredParticipants';

export default class EmailSchedulingPreview extends LightningElement {
    @api recordId;
    @api period;
    @api emailTemplate;

    @track fields = [];
    @track field;
    @track disabled = true;

    @track showPreview = false;
    @track recipients = [
        {
            fullName: participants,
            email: '1'
        }
    ];

    connectedCallback() {
        switch (this.period) {
            case 'before':
                this.fields = ['Course__c.EmailBeforeContent__c'];
                this.field = 'EmailBeforeContent__c';
                break;
            case 'reminder':
                this.fields = ['Course__c.EmailReminderContent__c'];
                this.field = 'EmailReminderContent__c';
                break;
            case 'after':
                this.fields = ['Course__c.EmailAfterContent__c'];
                this.field = 'EmailAfterContent__c';
                break;
            case 'manual':
                this.fields = ['Course__c.EmailManualContent__c'];
                this.field = 'EmailManualContent__c';
                break;
            default:
                break;
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
    getaccountRecord({ data, error }) {
        if (data) {
            this.disabled = data.fields[this.field].value ? false : true;
        }
    }

    preview() {
        this.showPreview = true;
    }

    previewCancel() {
        this.showPreview = false;
    }
}
