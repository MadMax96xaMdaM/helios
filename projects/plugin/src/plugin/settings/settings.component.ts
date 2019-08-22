import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { ProvidersComponent } from './providers/providers.component';
import { CloudAccountListComponent } from './cloud-account/cloud-account-list/cloud-account-list.component';
import { SettingsService } from '../services/settings.service';
import { Settings } from '../entities/settings';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(private translate: TranslateService, private modalCtrl: ModalController, private settingsService: SettingsService) {
  }

  async ngOnInit() {
    this.settings = await this.settingsService.get();
  }

  async openProviders() {
    const modal = await this.modalCtrl.create({
      component: ProvidersComponent
    });

    modal.present();
  }

  async openCloudAccount() {
    const modal = await this.modalCtrl.create({
      component: CloudAccountListComponent
    });

    modal.present();
  }

  changeDefaultPlayButtonAction(value) {
    this.settings.defaultPlayButtonAction = value;

    this.settingsService.set(this.settings);
  }
}
