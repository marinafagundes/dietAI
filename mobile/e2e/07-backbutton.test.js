describe('Navegação - Cancelar no meio do formulário', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve permitir cancelar no passo 2 e voltar à tela inicial', async () => {
    await element(by.text('Gerar dieta')).tap();

    await element(by.id('name')).typeText('Lucas');
    await element(by.id('weight')).typeText('85');
    await element(by.id('height')).typeText('1.80');
    await element(by.id('age')).typeText('35');
    if (device.getPlatform() === 'android') await device.pressBack();

    await element(by.text('Avançar')).tap();
    await element(by.text('Avançar')).tap();

    await element(by.id('backButton')).tap(); // Volta para passo anterior
    await element(by.id('backButton')).tap(); // Volta para início

    await expect(element(by.text('Gerar dieta'))).toBeVisible();
  });
});