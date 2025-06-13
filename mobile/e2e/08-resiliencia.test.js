describe('Resiliência - Minimizar e restaurar o app durante preenchimento', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve manter os dados ao minimizar e restaurar o app', async () => {
    await element(by.text('Gerar dieta')).tap();

    await element(by.id('name')).typeText('Carlos');
    await element(by.id('weight')).typeText('75');
    await element(by.id('height')).typeText('1.78');
    await element(by.id('age')).typeText('34');

    if (device.getPlatform() === 'android') await device.pressBack();

    // Minimiza o app por 2 segundos
    await device.sendToHome();
    await new Promise(res => setTimeout(res, 2000));
    await device.launchApp({ newInstance: false }); // Restaura o app

    // Verifica se os dados ainda estão presentes
    await expect(element(by.id('name'))).toHaveText('Carlos');
    await expect(element(by.id('weight'))).toHaveText('75');
    await expect(element(by.id('height'))).toHaveText('1.78');
    await expect(element(by.id('age'))).toHaveText('34');
  });
});