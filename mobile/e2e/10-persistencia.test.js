describe('Persistência - Dados salvos ao voltar passos', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve manter os dados preenchidos ao voltar do passo 2 para o passo 1', async () => {
    await element(by.text('Gerar dieta')).tap();

    await element(by.id('name')).typeText('Bruna');
    await element(by.id('weight')).typeText('60');
    await element(by.id('height')).typeText('1.65');
    await element(by.id('age')).typeText('25');
    if (device.getPlatform() === 'android') await device.pressBack();

    await element(by.text('Avançar')).tap();
    await element(by.text('Avançar')).tap(); 

    await element(by.id('backButton')).tap();

    // Verifica que os dados permanecem
    await expect(element(by.id('name'))).toHaveText('Bruna');
    await expect(element(by.id('weight'))).toHaveText('60');
    await expect(element(by.id('height'))).toHaveText('1.65');
    await expect(element(by.id('age'))).toHaveText('25');
  });
});
