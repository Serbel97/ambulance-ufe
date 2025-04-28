import {Component, Event, EventEmitter, h, Host, Prop, State} from '@stencil/core';
import {
  AmbulanceConditionsApi,
  AmbulanceWaitingListApi,
  Condition,
  Configuration,
  WaitingListEntry
} from '../../api/ambulance-wl';

@Component({
  tag: 'xbelake-ambulance-wl-editor',
  styleUrl: 'xbelake-ambulance-wl-editor.css',
  shadow: true,
})
export class XbelakeAmbulanceWlEditor {
  @Prop() entryId: string;
  @Prop() ambulanceId: string;
  @Prop() apiBase: string;

  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;

  @State() private duration = 15
  @State() entry: WaitingListEntry;
  @State() conditions: Condition[];
  @State() errorMessage: string;
  @State() isValid: boolean;
  @State() dataLoading: boolean = true; // New state for loading

  private formElement: HTMLFormElement;

  async componentWillLoad() {
    await this.getWaitingEntryAsync();
    this.getConditions();
    this.dataLoading = false;
  }

  private async getWaitingEntryAsync(): Promise<WaitingListEntry> {
    if (this.entryId === "@new") {
      this.isValid = false;
      this.entry = {
        id: "@new",
        patientId: "",
        waitingSince: new Date(Date.now()),
        estimatedDurationMinutes: 15
      };
      this.entry.estimatedStart = await this.assumedEntryDateAsync();
      return this.entry;
    }
    if (!this.entryId) {
      this.isValid = false;
      return undefined
    }
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new AmbulanceWaitingListApi(configuration);

      const response = await waitingListApi.getWaitingListEntryRaw({
        ambulanceId: this.ambulanceId,
        entryId: this.entryId
      });

      if (response.raw.status < 299) {
        this.entry = await response.value();
        this.isValid = true;
      } else {
        this.errorMessage = `Cannot retrieve list of waiting patients: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return undefined;
  }

  private async assumedEntryDateAsync(): Promise<Date> {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new AmbulanceWaitingListApi(configuration);
      const response = await waitingListApi.getWaitingListEntriesRaw({ambulanceId: this.ambulanceId})
      if (response.raw.status > 299) {
        return new Date();
      }
      const lastPatientOut = (await response.value())
        .map((_: WaitingListEntry) =>
          _.estimatedStart.getTime()
          + _.estimatedDurationMinutes * 60 * 1000
        )
        .reduce((acc: number, value: number) => Math.max(acc, value), 0);
      return new Date(Math.max(Date.now(), lastPatientOut));
    } catch (err: any) {
      return new Date();
    }
  }

  private async getConditions(): Promise<Condition[]> {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const conditionsApi = new AmbulanceConditionsApi(configuration);

      const response = await conditionsApi.getConditionsRaw({ambulanceId: this.ambulanceId})
      if (response.raw.status < 299) {
        this.conditions = await response.value();
      }
    } catch (err: any) {
      // no strong dependency on conditions
    }
    // always have some fallback condition
    return this.conditions || [{
      code: "fallback",
      value: "Neurčený dôvod návštevy",
      typicalDurationMinutes: 15,
    }];
  }

  private handleSliderInput(event: Event) {
    this.duration = +(event.target as HTMLInputElement).value;
  }

  render() {
    if (this.errorMessage) {
      return (
        <Host>
          <div class="error">{this.errorMessage}</div>
        </Host>
      )
    }

    return (
      <Host>
        {this.dataLoading ? (
          <div class="loading">Načítavam údaje...</div>
        ) : (
          <div>
            <div class="editor-header">
              <h2>{this.entryId === "@new" ? "Nový pacient" : "Úprava pacienta"}</h2>
            </div>
            {/* Render the form fields */}
            <form ref={el => this.formElement = el}>
              <md-filled-text-field label="Meno a Priezvisko"
                                    required value={this.entry?.name}
                                    oninput={(ev: InputEvent) => {
                                      if (this.entry) {
                                        this.entry.name = this.handleInputEvent(ev)
                                      }
                                    }}>
                <md-icon slot="leading-icon">person</md-icon>
              </md-filled-text-field>

              <md-filled-text-field label="Registračné číslo pacienta"
                required value={this.entry?.patientId}
                oninput={(ev: InputEvent) => {
                  if (this.entry) {
                    this.entry.patientId = this.handleInputEvent(ev)
                  }
                }}>

                <md-icon slot="leading-icon">fingerprint</md-icon>
              </md-filled-text-field>

              <md-filled-text-field disabled label="Čakáte od"
                                    value={new Date(this.entry?.waitingSince || Date.now()).toLocaleTimeString()}>
                <md-icon slot="leading-icon">watch_later</md-icon>
              </md-filled-text-field>
              <md-filled-text-field disabled
                                    value={new Date(this.entry?.estimatedStart || Date.now()).toLocaleTimeString()}>
                label="Predpokladaný čas vyšetrenia"
                <md-icon slot="leading-icon">login</md-icon>
              </md-filled-text-field>

              {this.renderConditions()}

            </form>

            <div class="duration-slider">
              <div>
                <span class="label">Predpokladaná doba trvania: </span>
                <span class="label duration-value">{this.duration}</span>
                <span class="label"> minút</span>
              </div>
              <md-slider
                min="2" max="45" value={this.entry?.estimatedDurationMinutes || 15} ticks labeled
                oninput={(ev: InputEvent) => {
                  if (this.entry) {
                    this.entry.estimatedDurationMinutes
                      = Number.parseInt(this.handleInputEvent(ev))
                  }
                  this.handleSliderInput(ev)
                }}></md-slider>
            </div>

            <md-divider></md-divider>
            <div class="actions">
              <md-filled-tonal-button id="delete" disabled={!this.entry || this.entry?.id === "@new"}
                                      onClick={() => this.deleteEntry()}>
                <md-icon slot="icon">delete</md-icon>
                Zmazať
              </md-filled-tonal-button>
              <span class="stretch-fill"></span>
              <md-outlined-button id="cancel" onClick={() => this.editorClosed.emit("cancel")}>
                Zrušiť
              </md-outlined-button>
              <md-filled-button id="confirm" disabled={!this.isValid} onClick={() => this.updateEntry()}>
                <md-icon slot="icon">save</md-icon>
                Uložiť
              </md-filled-button>
            </div>

            {this.errorMessage && (
              <div class="error">{this.errorMessage}</div>
            )}
          </div>
        )}
      </Host>
    );
  }

  private renderConditions() {
    let conditions = this.conditions || [];
    // we want to have this.entry`s condition in the selection list
    if (this.entry?.condition) {
      const index = conditions.findIndex(condition => condition.code === this.entry.condition.code)
      if (index < 0) {
        conditions = [this.entry.condition, ...conditions]
      }
    }
    return (
      <md-filled-select label="Dôvod návštevy"
                        display-text={this.entry?.condition?.value}
                        oninput={(ev: InputEvent) => this.handleCondition(ev)}>
        <md-icon slot="leading-icon">sick</md-icon>
        {this.entry?.condition?.reference ?
          <md-icon slot="trailing-icon" class="link"
                   onclick={() => window.open(this.entry.condition.reference, "_blank")}>
            open_in_new
          </md-icon>
          : undefined
        }
        {conditions.map(condition => {
          return (
            <md-select-option
              value={condition.code}
              selected={condition.code === this.entry?.condition?.code}>
              <div slot="headline">{condition.value}</div>
            </md-select-option>
          )
        })}
      </md-filled-select>
    );
  }

  private handleCondition(ev: InputEvent) {
    if (this.entry) {
      const code = this.handleInputEvent(ev)
      const condition = this.conditions.find(condition => condition.code === code);
      this.entry.condition = Object.assign({}, condition);
      this.entry.estimatedDurationMinutes = condition.typicalDurationMinutes;
      this.duration = condition.typicalDurationMinutes;
    }
  }

  private handleInputEvent(ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    // check validity of elements
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
      const element = this.formElement.children[i]
      if ("reportValidity" in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.isValid &&= valid;
      }
    }
    return target.value
  }

  private async updateEntry() {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new AmbulanceWaitingListApi(configuration);

      const response = this.entryId == "@new" ?
        await waitingListApi.createWaitingListEntryRaw({ambulanceId: this.ambulanceId, waitingListEntry: this.entry}) :
        await waitingListApi.updateWaitingListEntryRaw({
          ambulanceId: this.ambulanceId,
          entryId: this.entryId,
          waitingListEntry: this.entry
        });
      if (response.raw.status < 299) {
        this.editorClosed.emit("store")
      } else {
        this.errorMessage = `Cannot store entry: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot store entry: ${err.message || "unknown"}`
    }
  }

  private async deleteEntry() {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new AmbulanceWaitingListApi(configuration);

      const response = await waitingListApi.deleteWaitingListEntryRaw({
        ambulanceId: this.ambulanceId,
        entryId: this.entryId
      });
      if (response.raw.status < 299) {
        this.editorClosed.emit("delete")
      } else {
        this.errorMessage = `Cannot delete entry: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot delete entry: ${err.message || "unknown"}`
    }
  }
}
