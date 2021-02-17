import { Component, h, State } from '@stencil/core';

import colleges from '../../assets/data/colleges';
import ranks from '../../assets/data/wageByRank';
import wageBySeniority from '../../assets/data/wageBySeniority';
import { getPresentWage, getFutureWage, getEmployerPensionPayments } from '../../utils/calculate';
import { disclaimer, seniorityMessage } from '../../assets/data/text';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  hoursInput: HTMLInputElement;
  hoursInput2: HTMLInputElement;

  @State() college: string;
  @State() preDealSa: boolean;
  @State() position: string[];
  @State() multiPosition: boolean;
  @State() rank: string;
  @State() preDealSeniority: number;
  @State() seniority: number;
  @State() hours: number;
  @State() hours2: number;
  @State() formIsValid: boolean;

  @State() presentWage: number;
  @State() presentWageAsSa: number;
  @State() futureWageByWeeks: number;
  @State() futureWage: number;
  @State() pensionPayments: number;

  handleSubmit() {
    const { weeks, futureWeeks } = colleges.find(c => c.name === this.college);
    const { hourlyWage } = ranks.find(r => r.name === this.rank);
    const seniorityWage = wageBySeniority[this.rank][this.seniority];

    // if user is EITHER a teacher OR a professor
    if (!this.multiPosition) {
      const teach = this.position[0] === 'teach';

      this.presentWage = getPresentWage(weeks, hourlyWage, this.hours, teach);

      if (this.preDealSa) {
        this.presentWageAsSa = getFutureWage(seniorityWage, this.hours, teach, this.preDealSa, this.college);
      } else {
        this.presentWageAsSa = undefined;
      }

      if (futureWeeks) {
        this.futureWageByWeeks = getPresentWage(futureWeeks, hourlyWage, this.hours, teach);
      } else {
        this.futureWageByWeeks = undefined;
      }

      this.futureWage = getFutureWage(seniorityWage, this.hours, teach);

    // if user is BOTH a teacher AND a professor
    } else {
      this.presentWage = getPresentWage(weeks, hourlyWage, this.hours, true) +
        getPresentWage(weeks, hourlyWage, this.hours2, false);

      if (this.preDealSa) {
        this.presentWageAsSa = getFutureWage(seniorityWage, this.hours, true, this.preDealSa, this.college) +
          getFutureWage(seniorityWage, this.hours, false, this.preDealSa, this.college);
      } else {
        this.presentWageAsSa = undefined;
      }

      if (futureWeeks) {
        this.futureWageByWeeks = getPresentWage(futureWeeks, hourlyWage, this.hours, true) +
          getPresentWage(futureWeeks, hourlyWage, this.hours2, false);
      } else {
        this.futureWageByWeeks = undefined;
      }

      this.futureWage = getFutureWage(seniorityWage, this.hours, true) +
        getFutureWage(seniorityWage, this.hours2, false);
    }

    // check if present wage is higher than future wage
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
    document.getElementById('hours1').addEventListener('keypress', (e: KeyboardEvent) => {
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

  componentWillUpdate() {
    if (this.position && this.position.length === 2) {
      this.multiPosition = true;
    } else {
      this.multiPosition = false;
      this.hours2 = undefined;
    }

    const isValid =
      !!this.rank &&
      !!this.college &&
      !!this.hours &&
      !!this.seniority &&
      !!this.position &&
      (this.multiPosition ? !!this.hours2 : true);

    this.formIsValid = isValid;
  }

  componentDidUpdate() {
    if (this.multiPosition) {
      document.getElementById('hours2').addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          this.hoursInput2.blur();
        }
      });
    }
  }

  render() {
    return (
      <ion-app>
        <header>
          <ion-title>איגוד הסגל האקדמי במכללות הציבוריות</ion-title>
          <img
            src="https://cafe.themarker.com/media/t/146/754/7/file_0_big.jpg?1267870768"
            width="100"
            height="50"
          />
        </header>

        <ion-content>
          
          <ion-refresher slot="fixed" onIonRefresh={() => window.location.reload()}>
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>

          <main>
          <div class="content">
            <h2>מחשבון שכר נוכחי ועתידי</h2>
            <form>

              <ion-item>
                <ion-label>בחר/י מכללה</ion-label>
                <ion-select value={this.college} onIonChange={e => {this.college = e.detail.value}}>
                  {colleges.map(({ name, label }) => (
                    <ion-select-option value={name}>{label}</ion-select-option>
                  ))}
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label>בחר/י אופן העסקה לפני ההסכם</ion-label>
                <ion-select
                  value={this.preDealSa}
                  onIonChange={e => {this.preDealSa = e.detail.value}}
                >
                  <ion-select-option value={false}>ממ"ח</ion-select-option>
                  <ion-select-option value={true}>ס"ע</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label>בחר/י תפקיד</ion-label>
                <ion-select
                  multiple
                  value={this.position}
                  onIonChange={e => {this.position = e.detail.value}}
                >
                  <ion-select-option value="teach">מתרגל</ion-select-option>
                  <ion-select-option value="prof">מרצה</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label>בחר/י דירוג</ion-label>
                <ion-select value={this.rank} onIonChange={e => {this.rank = e.detail.value}}>
                  {ranks.map(({ name, label }) => (
                    <ion-select-option value={name}>{label}</ion-select-option>
                  ))}
                </ion-select>
              </ion-item>

              <div>
                {this.preDealSa && (
                  <ion-item>
                    <ion-label>בחר/י ותק לצורך טבלת השכר הנוכחית</ion-label>
                    <ion-select
                      value={this.preDealSeniority}
                      onIonChange={e => {this.preDealSeniority = e.detail.value}}
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
                )}
                <ion-item>
                  <ion-label>בחר/י ותק</ion-label>
                  <ion-select
                    value={this.seniority}
                    onIonChange={e => {this.seniority = e.detail.value}}
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
              </div>

              <ion-item>
                <ion-label>הכנס/י מספר שעות {this.multiPosition && 'מתרגל'}</ion-label>
                <ion-input
                  id="hours1"
                  inputmode="numeric"
                  enterkeyhint="done"
                  value={this.hours}
                  onIonChange={e => {this.hours = Number(e.detail.value)}} 
                  ref={(el: HTMLIonInputElement) => el.getInputElement().then(res => this.hoursInput = res)}
                />
              </ion-item>

              {this.multiPosition && (
                <ion-item>
                  <ion-label>הכנס/י מספר שעות מרצה</ion-label>
                  <ion-input
                    id="hours2"
                    inputmode="numeric"
                    enterkeyhint="done"
                    value={this.hours2}
                    onIonChange={e => {this.hours2 = Number(e.detail.value)}} 
                    ref={(el: HTMLIonInputElement) => {
                      if (this.multiPosition) {
                        el.getInputElement().then(res => this.hoursInput2 = res);
                      }
                    }}
                  />
                </ion-item>
              )}


              <ion-button
                onClick={() => this.handleSubmit()}
                disabled={!this.formIsValid}
              >
                חשב/י שכר נוכחי ועתידי
              </ion-button>

            </form>

            {!!this.presentWage && (
              <wage-output
                presentWage={this.presentWage}
                presentWageAsSa={this.presentWageAsSa}
                futureWageByWeeks={this.futureWageByWeeks}
                futureWage={this.futureWage}
                pensionPayments={this.pensionPayments}
              />
            )}

          </div>

          <p class="note">* {disclaimer}</p>
          
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
            <a href="https://www.oriperelman.com/" target="_blank" rel="noopener">
              Ori Perelman
            </a>
          </p>
        </footer>
      </ion-app>
    );
  }
}
