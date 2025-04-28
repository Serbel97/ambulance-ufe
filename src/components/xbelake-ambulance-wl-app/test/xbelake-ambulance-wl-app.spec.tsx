import {newSpecPage} from '@stencil/core/testing';
import {XbelakeAmbulanceWlApp} from '../xbelake-ambulance-wl-app';

describe('xbelake-ambulance-wl-app', () => {

  it('renders editor in modal when URL has entry/@new', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [XbelakeAmbulanceWlApp],
      html: `<xbelake-ambulance-wl-app base-path="/"></xbelake-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()

    // Simulate clicking on the "Add" button to open the modal
    const app = page.rootInstance;
    app.isModalOpen = true;
    app.modalEntryId = "@new";
    await page.waitForChanges();

    // Check if the modal contains the editor
    const modalContainer = page.root.shadowRoot.querySelector('.modal-container');
    expect(modalContainer).not.toBeNull();

    const editor = modalContainer.querySelector('xbelake-ambulance-wl-editor');
    expect(editor).not.toBeNull();
    expect(editor.getAttribute('entry-id')).toEqual('@new');
  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [XbelakeAmbulanceWlApp],
      html: `<xbelake-ambulance-wl-app base-path="/ambulance-wl/"></xbelake-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("xbelake-ambulance-wl-list");
  });
});
