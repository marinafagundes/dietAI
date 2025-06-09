describe('Fluxo Completo - Geração da dieta', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve concluir o formulário e exibir a dieta gerada', async () => {
    await element(by.text('Gerar dieta')).tap();
    // Passo 1
    await element(by.id('name')).typeText('Maria');
    await element(by.id('weight')).typeText('65');
    await element(by.id('height')).typeText('1.65');
    await element(by.id('age')).typeText('28');
    if (device.getPlatform() === 'android') await device.pressBack();
    await element(by.text('Avançar')).tap();         
    await element(by.text('Avançar')).tap();        

    // Passo 2
    await element(by.id('genderSelector')).tap();    
    await element(by.text('Feminino')).tap(); 
    await element(by.id('activityLevelSelector')).tap(); 
    await element(by.text('Moderadamente ativo (exercícios 3 a 5 vezes na semana)')).tap();                           
    await element(by.id('goalSelector')).tap();      
    await element(by.text('Emagrecer')).tap();     
    await element(by.text('Avançar')).tap();       

     

    // Resultado
    await expect(element(by.text('Minha dieta'))).toBeVisible();
    await expect(element(by.text('Refeições:'))).toBeVisible(); 
  });
});

describe('Fluxo Completo - Geração da dieta', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve concluir o formulário e exibir a dieta de Maria', async () => {
    await element(by.text('Gerar dieta')).tap();
    // Passo 1
    await element(by.id('name')).typeText('Maria');
    await element(by.id('weight')).typeText('65');
    await element(by.id('height')).typeText('1.65');
    await element(by.id('age')).typeText('28');
    if (device.getPlatform() === 'android') await device.pressBack();
    await element(by.text('Avançar')).tap();         
    await element(by.text('Avançar')).tap();        

    // Passo 2
    await element(by.id('genderSelector')).tap();    
    await element(by.text('Feminino')).tap(); 
    await element(by.id('activityLevelSelector')).tap(); 
    await element(by.text('Moderadamente ativo (exercícios 3 a 5 vezes na semana)')).tap();                           
    await element(by.id('goalSelector')).tap();      
    await element(by.text('Emagrecer')).tap();     
    await element(by.text('Avançar')).tap();       

     

    // Resultado
    await expect(element(by.text('Minha dieta'))).toBeVisible();
    await expect(element(by.text('Nome: Maria'))).toBeVisible(); 
  });
});

describe('Fluxo Completo - Geração da dieta', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve concluir o formulário e exibir a dieta para emagrecer', async () => {
    await element(by.text('Gerar dieta')).tap();
    // Passo 1
    await element(by.id('name')).typeText('Maria');
    await element(by.id('weight')).typeText('65');
    await element(by.id('height')).typeText('1.65');
    await element(by.id('age')).typeText('28');
    if (device.getPlatform() === 'android') await device.pressBack();
    await element(by.text('Avançar')).tap();         
    await element(by.text('Avançar')).tap();        

    // Passo 2
    await element(by.id('genderSelector')).tap();    
    await element(by.text('Feminino')).tap(); 
    await element(by.id('activityLevelSelector')).tap(); 
    await element(by.text('Moderadamente ativo (exercícios 3 a 5 vezes na semana)')).tap();                           
    await element(by.id('goalSelector')).tap();      
    await element(by.text('Emagrecer')).tap();     
    await element(by.text('Avançar')).tap();       

     

    // Resultado
    await expect(element(by.text('Minha dieta'))).toBeVisible();
    await expect(element(by.text('Foco: emagrecer'))).toBeVisible(); 
  });
});
