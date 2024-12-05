import { Confirmation } from 'primeng/api';

export interface ExtendedConfirmation extends Confirmation {
  acceptSeverity?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'help'
    | 'danger'
    | 'contrast'
    ;
  rejectSeverity?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'help'
    | 'danger'
    | 'contrast';
}
