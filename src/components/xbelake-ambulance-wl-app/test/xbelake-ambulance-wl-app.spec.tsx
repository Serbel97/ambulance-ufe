import {newSpecPage} from '@stencil/core/testing';
import {XbelakeAmbulanceWlApp} from '../xbelake-ambulance-wl-app';

describe('xbelake-ambulance-wl-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [XbelakeAmbulanceWlApp],
      html: `<xbelake-ambulance-wl-app base-path="/"></xbelake-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("xbelake-ambulance-wl-editor");

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
