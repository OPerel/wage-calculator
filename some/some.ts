import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer';

let browser: Browser, page: Page;

const selectOne = async (selectEl: ElementHandle, value: string): Promise<void> => {
  await selectEl.select(value);
}

// const expectSelectText = (text: string): Promise<boolean> => {

// }

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  page.goto('http://localhost:3333');

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
});

describe('basic elements and initial state', () => {
  it('should have a title', async () => {
    await page.waitForSelector('ion-title');
  });
  
  it('should have the submit button disabled', async () => {
    await page.waitForSelector('ion-button[disabled]');
    const btn1 = await page.evaluate(() => document.querySelector('ion-button[disabled]') !== null);

    expect(btn1).toBe(true);
  });

  // it('', async () => {});
});

describe('fill in form', () => {
  it('select first value in each select', async () => {
    const collegeSelector = await page.$('#select-college');
    await selectOne(collegeSelector, 'HIT 13');
    
    const positionSelector = await page.$('#select-position');
    await selectOne(positionSelector, 'מתרגל');

    const rankSelector = await page.$('#select-rank');
    await selectOne(rankSelector, 'דרגה 1');
    
    const senioritySelector = await page.$('#select-seniority');
    await selectOne(senioritySelector, '0');

    await (await page.$('#input-hours1')).type('2');

    const btnEnabled = await page.evaluate(() => document.querySelector('ion-button[disabled]') === null);
    expect(btnEnabled).toBe(true);
    // const positionSelector = await page.$('#select-position');
    // await selectOne(positionSelector, 'מתרגל');
    // expect(await collegeSelector.evaluate(el => el.shadowRoot.querySelector('div[part="text"]').textContent)).toBe('HIT 13');
  });
});

afterAll(async () => {
  await browser.close();
})