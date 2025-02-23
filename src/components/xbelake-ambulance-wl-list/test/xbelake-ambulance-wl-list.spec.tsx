import { newSpecPage } from '@stencil/core/testing';
import { XbelakeAmbulanceWlList } from '../xbelake-ambulance-wl-list';

describe('xbelake-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XbelakeAmbulanceWlList],
      html: `<xbelake-ambulance-wl-list></xbelake-ambulance-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <xbelake-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xbelake-ambulance-wl-list>
    `);
  });
});
