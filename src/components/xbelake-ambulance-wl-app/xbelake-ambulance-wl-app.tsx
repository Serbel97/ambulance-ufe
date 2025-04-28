import {Component, Host, Prop, State, h} from '@stencil/core';

declare global {
  interface Window {
    navigation: any;
  }
}

@Component({
  tag: 'xbelake-ambulance-wl-app',
  styleUrl: 'xbelake-ambulance-wl-app.css',
  shadow: true,
})

export class XbelakeAmbulanceWlApp {
  @State() private isModalOpen = false;
  @State() private modalEntryId = "@new";
  @Prop() basePath: string = "";
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;

  render() {
    console.debug("xbelake-ambulance-wl-app.render()");

    const handleEntryClicked = (ev: CustomEvent<string>) => {
      // Open modal for both new and existing patients
      this.isModalOpen = true;
      this.modalEntryId = ev.detail;
    };

    const handleEditorClosed = (source: string) => {
      // Close the modal
      this.isModalOpen = false;
    };

    return (
      <Host>
        <xbelake-ambulance-wl-list ambulance-id={this.ambulanceId} api-base={this.apiBase}
          onentry-clicked={handleEntryClicked}>
        </xbelake-ambulance-wl-list>

        {this.isModalOpen && (
          <div class="modal-overlay" onClick={() => this.isModalOpen = false}>
            <div class="modal-container" onClick={(e) => e.stopPropagation()}>
              <xbelake-ambulance-wl-editor entry-id={this.modalEntryId}
                ambulance-id={this.ambulanceId} api-base={this.apiBase}
                oneditor-closed={handleEditorClosed}>
              </xbelake-ambulance-wl-editor>
            </div>
          </div>
        )}
      </Host>
    );
  }
}
