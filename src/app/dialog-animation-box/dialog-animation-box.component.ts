import { Component, inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-animation-box',
  templateUrl: './dialog-animation-box.component.html',
  styleUrls: ['./dialog-animation-box.component.scss'],
})
export class DialogAnimationBoxComponent {
  constructor(public dialogRef: MatDialogRef<DialogAnimationBoxComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
