import { newE2EPage } from '@stencil/core/testing';

describe('xbelake-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xbelake-ambulance-wl-app></xbelake-ambulance-wl-app>');

    const element = await page.find('xbelake-ambulance-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
