describe('Tela Inicial', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('deve exibir o botão com o texto "Gerar dieta"', async () => {
    await expect(element(by.text('Gerar dieta'))).toBeVisible();
  });
});
