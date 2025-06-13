describe('Segurança - Input muito grande', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve lidar com entrada extremamente longa sem crashar', async () => {
    const longText = 'a'.repeat(1000);
    await element(by.text('Gerar dieta')).tap();
    await element(by.id('name')).typeText(longText);
    await element(by.id('weight')).typeText('80');
    await element(by.id('height')).typeText('1.75');
    await element(by.id('age')).typeText('30');
    if (device.getPlatform() === 'android') await device.pressBack();
    await element(by.text('Avançar')).tap();
    await element(by.text('Avançar')).tap();

    await expect(element(by.text('Sexo:'))).toBeVisible();
  });
});
