import { newE2EPage } from '@stencil/core/testing';

describe('xbelake-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xbelake-ambulance-wl-list></xbelake-ambulance-wl-list>');

    const element = await page.find('xbelake-ambulance-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
