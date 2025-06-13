describe('Acessibilidade - Inputs com testID e rótulos visíveis', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve verificar que todos os campos possuem testIDs e rótulos visíveis', async () => {
    await element(by.text('Gerar dieta')).tap();

    await expect(element(by.id('name'))).toBeVisible();
    await expect(element(by.text('Nome:'))).toBeVisible();

    await expect(element(by.id('weight'))).toBeVisible();
    await expect(element(by.text('Seu peso atual:'))).toBeVisible();

    await expect(element(by.id('height'))).toBeVisible();
    await expect(element(by.text('Sua altura atual:'))).toBeVisible();

    await expect(element(by.id('age'))).toBeVisible();
    await expect(element(by.text('Sua idade atual:'))).toBeVisible();
  });
});

