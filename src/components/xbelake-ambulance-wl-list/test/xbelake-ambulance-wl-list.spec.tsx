import { newSpecPage } from '@stencil/core/testing';
import { XbelakeAmbulanceWlList } from '../xbelake-ambulance-wl-list';

describe('xbelake-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XbelakeAmbulanceWlList],
      html: `<xbelake-ambulance-wl-list></xbelake-ambulance-wl-list>`,
    });

    const wlList = page.rootInstance as XbelakeAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients); 
  });
});
