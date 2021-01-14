import { Component, h, State } from '@stencil/core';

import colleges from '../../assets/data/colleges';
import ranks from '../../assets/data/wageByRank';
import wageBySeniority from '../../assets/data/wageBySeniority';
import { getPresentWage, getFutureWageByWeeks, getFutureWage, getEmployerPensionPayments } from '../../utils/calculate';
import { note, seniorityMessage } from '../../assets/data/text';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  hoursInput: HTMLInputElement;

  @State() college: string;
  @State() position: string;
  @State() rank: string;
  @State() seniority: number;
  @State() hours: number;
  @State() formIsValid: boolean;

  @State() presentWage: number;
  @State() futureWageByWeeks: number;
  @State() futureWage: number;
  @State() pensionPayments: number;

  handleInputFocus() {
    const isValid = !!this.rank && !!this.college && !!this.hours && !!this.seniority && !!this.position;
    this.formIsValid = isValid;
  }

  handleSubmit() {
    const { weeks, futureWeeks } = colleges.find(c => c.name === this.college);
    const { hourlyWage } = ranks.find(r => r.name === this.rank);
    const teach = this.position === 'teach';
    this.presentWage = getPresentWage(weeks, hourlyWage, this.hours, teach);

    if (futureWeeks) {
      this.futureWageByWeeks = getFutureWageByWeeks(futureWeeks, hourlyWage, this.hours, teach);
    } else {
      this.futureWageByWeeks = undefined;
    }

    const seniorityWage = wageBySeniority[this.rank][this.seniority];
    this.futureWage = getFutureWage(seniorityWage, this.hours, teach);

    if (this.futureWageByWeeks) {
      if (this.futureWageByWeeks > this.futureWage) {
        this.futureWage = this.futureWageByWeeks;
      }
    } else {
      if (this.presentWage > this.futureWage) {
        this.futureWage = this.presentWage;
      }
    }

    this.pensionPayments = getEmployerPensionPayments(this.futureWage);
  }

  componentDidLoad() {
    document.getElementById('hours').addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.hoursInput.blur();
      }
    });

    const footer = document.getElementsByTagName('footer')[0];

    window.addEventListener('ionKeyboardDidShow', () => {
      footer.classList.add('hide');
    });
    
    window.addEventListener('ionKeyboardDidHide', () => {
      footer.classList.remove('hide');
    });
  }

  render() {
    console.log(this.presentWage, this.futureWageByWeeks, this.futureWage, this.pensionPayments)
    return (
      <ion-app>
        <header>
          <ion-title>איגוד הסגל האקדמי במכללות הציבוריות</ion-title>
          <img src="https://cafe.themarker.com/media/t/146/754/7/file_0_big.jpg?1267870768" width="100" height="50"/>
        </header>

        <ion-content>
          <main>
            <div class="content">
              <h2>מחשבון שכר נוכחי ועתידי</h2>
              <form>

                <ion-item>
                  <ion-label>בחר מכללה</ion-label>
                  <ion-select value={this.college} onIonChange={e => {this.college = e.detail.value; this.handleInputFocus()}}>
                    {colleges.map(({ name, label }) => (
                      <ion-select-option value={name}>{label}</ion-select-option>
                    ))}
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>בחר תפקיד</ion-label>
                  <ion-select value={this.position} onIonChange={e => {this.position = e.detail.value; this.handleInputFocus()}}>
                    <ion-select-option value="teach">מתרגל</ion-select-option>
                    <ion-select-option value="prof">מרצה</ion-select-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>בחר דירוג</ion-label>
                  <ion-select value={this.rank} onIonChange={e => {this.rank = e.detail.value; this.handleInputFocus()}}>
                    {ranks.map(({ name, label }) => (
                      <ion-select-option value={name}>{label}</ion-select-option>
                    ))}
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>בחר ותק</ion-label>
                  <ion-select
                    value={this.seniority}
                    onIonChange={e => {this.seniority = e.detail.value; this.handleInputFocus()}}
                    interfaceOptions={{ message: seniorityMessage }}
                  >
                    {this.rank === 'b' ? (
                      Array.from(Array(26)).map((_, idx) => (
                        <ion-select-option>{idx}</ion-select-option>
                      ))
                    ) : (
                      Array.from(Array(16)).map((_, idx) => (
                        <ion-select-option>{idx}</ion-select-option>
                      ))
                    )}
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>הכנס מספר שעות</ion-label>
                  <ion-input
                    id="hours"
                    inputmode="numeric"
                    enterkeyhint="done"
                    value={this.hours}
                    onIonChange={e => {this.hours = Number(e.detail.value); this.handleInputFocus()}} 
                    ref={(el: HTMLIonInputElement) => el.getInputElement().then(res => this.hoursInput = res)}
                  />
                </ion-item>

                <ion-button onClick={() => this.handleSubmit()} disabled={!this.formIsValid}>
                  חשב שכר נוכחי ועתידי
                </ion-button>

              </form>

              {!!this.presentWage && (
                <wage-output
                  presentWage={this.presentWage}
                  futureWageByWeeks={this.futureWageByWeeks}
                  futureWage={this.futureWage}
                  pensionPayments={this.pensionPayments}
                />
              )}

            </div>

            <p class="note">* {note}</p>
          
          </main>

        </ion-content>

        <footer dir="ltr">
          <p>
            <a href="https://workers.org.il/" target="_blank" rel="noopener">
              Koach LaOvdim
            </a>
            &nbsp;
            <span>- Democratic Workers’ Organization &#169; {new Date().getFullYear()},</span>
            &nbsp;
            <span>Developed by</span>
            &nbsp;
            <a href="https://github.com/OPerel" target="_blank" rel="noopener">
              Ori Perelman
            </a>
          </p>
        </footer>
      </ion-app>
    );
  }
}
