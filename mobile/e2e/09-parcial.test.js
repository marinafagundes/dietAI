describe('Validação - Preenchimento parcial no passo 1', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve preencher apenas 2 dos 4 campos e ver 2 mensagens Required', async () => {
    await element(by.text('Gerar dieta')).tap();

    await element(by.id('name')).typeText('Teste');
    await element(by.id('age')).typeText('20');
    if (device.getPlatform() === 'android') await device.pressBack();

    await element(by.text('Avançar')).tap();
    await element(by.text('Avançar')).tap();

    await expect(element(by.text('Required')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Required')).atIndex(1)).toBeVisible();
  });
});