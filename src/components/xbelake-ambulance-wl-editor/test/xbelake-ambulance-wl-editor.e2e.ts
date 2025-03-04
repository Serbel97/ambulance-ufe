import { newE2EPage } from '@stencil/core/testing';

describe('xbelake-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xbelake-ambulance-wl-editor></xbelake-ambulance-wl-editor>');

    const element = await page.find('xbelake-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
