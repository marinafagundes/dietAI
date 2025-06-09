describe('Formulário - Passo 3', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve selecionar o nível de atividade física e gerar a dieta', async () => {
    await element(by.text('Gerar dieta')).tap();

    // Preenche passo 1
    await element(by.id('name')).typeText('João');
    await element(by.id('weight')).typeText('80');
    await element(by.id('height')).typeText('1.75');
    await element(by.id('age')).typeText('30');
    if (device.getPlatform() === 'android') await device.pressBack();
    await element(by.text('Avançar')).tap();
    await element(by.text('Avançar')).tap();

    await element(by.id('genderSelector')).tap();    // abre o select do gênero
    await element(by.text('Masculino')).tap();       // seleciona 'Masculino'

    await element(by.id('activityLevelSelector')).tap();
    await element(by.text('Moderadamente ativo (exercícios 3 a 5 vezes na semana)')).tap();

    await element(by.id('goalSelector')).tap();      // abre o select do objetivo
    await element(by.text('Hipertrofia')).tap();    // seleciona 'Ganhar Massa'

    await element(by.text('Avançar')).tap();

    // Verifica se chegou à tela de resultado
    await expect(element(by.text('Minha dieta'))).toBeVisible();
  });
});

describe('Formulário - Passo 3', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('deve exibir 3 mensagens "Required" quando os campos estão vazios', async () => {
    await element(by.text('Gerar dieta')).tap();

    // Preenche passo 1
    await element(by.id('name')).typeText('João');
    await element(by.id('weight')).typeText('80');
    await element(by.id('height')).typeText('1.75');
    await element(by.id('age')).typeText('30');
    if (device.getPlatform() === 'android') await device.pressBack();
    await element(by.text('Avançar')).tap();
    await element(by.text('Avançar')).tap();

    await element(by.text('Avançar')).tap();

    // Espera cada mensagem "Required" aparecer (índices 0 a 3)
    await expect(element(by.text('Required')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Required')).atIndex(1)).toBeVisible();
    await expect(element(by.text('Required')).atIndex(2)).toBeVisible();
  });
});

