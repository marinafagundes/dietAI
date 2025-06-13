describe('Resultado - Dados corretos refletem na tela final', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve exibir o nome preenchido no formulário na tela de resultado', async () => {
    const nome = 'Fernanda';

    await element(by.text('Gerar dieta')).tap();

    // Passo 1
    await element(by.id('name')).typeText(nome);
    await element(by.id('weight')).typeText('60');
    await element(by.id('height')).typeText('1.65');
    await element(by.id('age')).typeText('27');
    if (device.getPlatform() === 'android') await device.pressBack();
    await element(by.text('Avançar')).tap();         
    await element(by.text('Avançar')).tap();        

    // Passo 2
    await element(by.id('genderSelector')).tap();    
    await element(by.text('Feminino')).tap(); 
    await element(by.id('activityLevelSelector')).tap(); 
    await element(by.text('Levemente ativo (exercícios 1 a 3 vezes na semana)')).tap();                           
    await element(by.id('goalSelector')).tap();      
    await element(by.text('Emagrecer')).tap();     
    await element(by.text('Avançar')).tap();       

    // Verificação na tela de resultado
    await expect(element(by.text(`Nome: ${nome}`))).toBeVisible(); 
  });
});
