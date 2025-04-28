import {Component, Event, EventEmitter, Host, Prop, State, h} from '@stencil/core';
import {AmbulanceWaitingListApi, WaitingListEntry, Configuration} from '../../api/ambulance-wl';

@Component({
  tag: 'xbelake-ambulance-wl-list',
  styleUrl: 'xbelake-ambulance-wl-list.css',
  shadow: true,
})

export class XbelakeAmbulanceWlList {
  @Event({eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() errorMessage: string;

  waitingPatients: WaitingListEntry[];

  private async getWaitingPatientsAsync(): Promise<WaitingListEntry[]> {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new AmbulanceWaitingListApi(configuration);
      const response = await waitingListApi.getWaitingListEntriesRaw({ambulanceId: this.ambulanceId})
      if (response.raw.status < 299) {
        return await response.value();
      } else {
        this.errorMessage = `Cannot retrieve list of waiting patients: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.waitingPatients = await this.getWaitingPatientsAsync();
  }

  render() {
    return (
      <Host>
        <div class="list-header">
          <h2>Zoznam čakajúcich pacientov</h2>
          <md-filled-button class="add-button" onclick={() => this.entryClicked.emit("@new")}>
            <md-icon slot="icon">add</md-icon>
            Pridať
          </md-filled-button>
        </div>

        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          :
          <div class="list-container">
            <md-list>
              {this.waitingPatients.map((patient) =>
                <md-list-item onClick={() => this.entryClicked.emit(patient.id)}>
                  <div slot="headline">{patient.name}</div>
                  <div slot="supporting-text">{"Predpokladaný vstup: " + patient.estimatedStart?.toLocaleString()}</div>
                  <md-icon slot="start">person</md-icon>
                </md-list-item>
              )}
            </md-list>
          </div>
        }
      </Host>
    );
  }
}
