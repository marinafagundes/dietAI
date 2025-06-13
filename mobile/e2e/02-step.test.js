describe('Formulário - Passo 1', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve preencher os campos do formulário inicial e avançar', async () => {
    // Navega para o formulário
    await element(by.text('Gerar dieta')).tap();

    // Verifica e preenche os campos
    await expect(element(by.text('Nome:'))).toBeVisible();
    await element(by.id('name')).typeText('João');
    await element(by.id('weight')).typeText('80');
    await element(by.id('height')).typeText('1.75');
    await element(by.id('age')).typeText('30');

    if (device.getPlatform() === 'android') {
      await device.pressBack(); // fecha o teclado
    }

    await element(by.text('Avançar')).tap();

    await element(by.text('Avançar')).tap();

    // Verifica que chegou à próxima tela
    await expect(element(by.text('Sexo:'))).toBeVisible();
  });
});

describe('Validação - Passo 1', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve exibir 4 mensagens "Required" quando os campos estão vazios', async () => {
    await element(by.text('Gerar dieta')).tap();
    await element(by.text('Avançar')).tap();

    // Espera cada mensagem "Required" aparecer (índices 0 a 3)
    await expect(element(by.text('Required')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Required')).atIndex(1)).toBeVisible();
    await expect(element(by.text('Required')).atIndex(2)).toBeVisible();
    await expect(element(by.text('Required')).atIndex(3)).toBeVisible();
  });
});

describe('Navegação - Cancelar ou Voltar', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve retornar à tela inicial ao cancelar o formulário', async () => {
    await element(by.text('Gerar dieta')).tap();

    await element(by.id('name')).typeText('Teste');
    
    if (device.getPlatform() === 'ios') {
      await element(by.id('name')).tapReturnKey(); 
    }

    await element(by.id('backButton')).tap();

    await expect(element(by.text('Gerar dieta'))).toBeVisible(); 
  });
});

