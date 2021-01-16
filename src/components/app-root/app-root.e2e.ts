import { newE2EPage } from '@stencil/core/testing';

describe('app-root', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/' });

    const element = await page.find('app-root');
    expect(element).toHaveClass('hydrated');
  });

  it('renders an ion-app', async () => {
    const page = await newE2EPage({ url: '/' });

    const element = await page.find('app-root > ion-app');
    expect(element).toHaveClass('hydrated');
  });
});

describe('basics', () => {
  let page;
  
  beforeEach(async () => {
    page = await newE2EPage({ url: '/' });
  });

  it('should have a title', async () => {
    const title = await page.find('ion-title');
    expect(title).toEqualText('איגוד הסגל האקדמי במכללות הציבוריות');
  });

  it('should have a secondary title', async () => {
    const title = await page.find('.content > h2');
    expect(title).toEqualText('מחשבון שכר נוכחי ועתידי');
  });
});

describe('business logic', () => {
  let page;

  beforeEach(async () => {
    page = await newE2EPage({ url: '/' });
  });

  // it('should have all inputs empty', async () => {
  //   const inputs = await page.find('ion-input');
  //   const v = await inputs.getProperty('value')
  //   expect(v).toBe('');
  // })

  it('should have submit button disabled initially', async () => {
    const submitButton = await page.find('ion-button');
    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should select first college', async () => {
    await page.find('#select-college >>> select').press();
    expect(await page.find('.alert-head')).toEqualText('בחר מכללה')
  });
});
