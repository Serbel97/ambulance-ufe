import { newSpecPage } from '@stencil/core/testing';
import { XbelakeAmbulanceWlEditor } from '../xbelake-ambulance-wl-editor';
  import fetchMock from 'jest-fetch-mock';
  import { Condition, WaitingListEntry } from '../../../api/ambulance-wl';

  describe('xbelake-ambulance-wl-editor', () => {
    const sampleEntry: WaitingListEntry = {
    id: "entry-1",
    patientId: "p-1",
    name: "Juraj Prvý",
    waitingSince: new Date("20240203T12:00"),
    estimatedDurationMinutes: 20,
    condition: {
    value: "Nevoľnosť",
    code: "nausea",
    reference: "https://zdravoteka.sk/priznaky/nevolnost/"
  }
  };

    const sampleConditions: Condition[] = [
  {
    value: "Teploty",
    code: "subfebrilia",
    reference: "https://zdravoteka.sk/priznaky/zvysena-telesna-teplota/",
    typicalDurationMinutes: 20
  },
  {
    value: "Nevoľnosť",
    code: "nausea",
    reference: "https://zdravoteka.sk/priznaky/nevolnost/",
    typicalDurationMinutes: 45
  },
    ];

    let delay = async (milliseconds: number) => await new Promise<void>(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });

    beforeAll(() => {
    fetchMock.enableMocks();
  });

    afterEach(() => {
    fetchMock.resetMocks();
  });

    it('buttons shall be of different type', async () => {
    fetchMock.mockResponses(
    [JSON.stringify(sampleEntry), { status: 200 }],
    [JSON.stringify(sampleConditions), { status: 200 }]
    );

    const page = await newSpecPage({
    components: [XbelakeAmbulanceWlEditor],
    html: `<xbelake-ambulance-wl-editor entry-id="test-entry" ambulance-id="test-ambulance" api-base="http://sample.test/api"></xbelake-ambulance-wl-editor>`,
    });

    await delay(300);
    await page.waitForChanges();

    const items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    // Continue with other assertions...
  });

  it('first text field is patient name', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(sampleEntry), { status: 200 }],
      [JSON.stringify(sampleConditions), { status: 200 }]
    );

    const page = await newSpecPage({
      components: [XbelakeAmbulanceWlEditor],
      html: `<xbelake-ambulance-wl-editor entry-id="test-entry" ambulance-id="test-ambulance" api-base="http://sample.test/api"></xbelake-ambulance-wl-editor>`,
    });

    await delay(300);
    await page.waitForChanges();

    const items: any = await page.root.shadowRoot.querySelectorAll("md-filled-text-field");
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0].getAttribute("value")).toEqual(sampleEntry.name);
  });
});
