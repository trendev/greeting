import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-dialog-select-eth-network',
  templateUrl: './dialog-select-eth-network.component.html',
  styleUrls: ['./dialog-select-eth-network.component.sass']
})
export class DialogSelectEthNetworkComponent implements OnInit {

  network: string | undefined;
  networks: string[] = [];

  constructor(public dialogRef: MatDialogRef<DialogSelectEthNetworkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { networks: string[] }) {
    this.networks = this.data.networks;
  }

  ngOnInit(): void {
  }
}
