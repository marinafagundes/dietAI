describe('Acessibilidade de botões', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('deve garantir que todos os botões visíveis estejam acessíveis por texto', async () => {
    const botoes = ['Gerar dieta', 'Avançar', 'Voltar', 'Avançar'];

    for (const texto of botoes) {
      const botao = element(by.text(texto));
      await expect(botao).toBeVisible();
    }
  });
});