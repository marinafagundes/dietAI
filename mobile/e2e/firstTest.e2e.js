const { device, expect, element, by } = require('detox');

describe('App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('deve mostrar o texto inicial', async () => {
    await expect(element(by.text('Olá'))).toBeVisible();
  });
});