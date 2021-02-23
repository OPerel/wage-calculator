import { Component, h, State } from '@stencil/core';

import colleges from '../../assets/data/colleges';
import ranks from '../../assets/data/wageByRank';
import { disclaimer, seniorityMessage } from '../../assets/data/text';

import handleCalcLogic from '../../utils/handleCalcLogic';

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
    const state = {
      college: this.college,
      preDealSa: this.preDealSa,
      position: this.position,
      multiPosition: this.multiPosition,
      rank: this.rank,
      preDealSeniority: this.preDealSeniority,
      seniority: this.seniority,
      hours: this.hours,
      hours2: this.hours2
    };
    
    const {
      presentWage,
      presentWageAsSa,
      futureWageByWeeks,
      futureWage,
      pensionPayments
    } = handleCalcLogic(state);

    this.presentWage = presentWage;
    this.presentWageAsSa = presentWageAsSa;
    this.futureWageByWeeks = futureWageByWeeks;
    this.futureWage = futureWage;
    this.pensionPayments = pensionPayments;
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
      (this.multiPosition ? !!this.hours2 : true) &&
      (this.preDealSa ? !!this.preDealSeniority : true);

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
                      interfaceOptions={{}}
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

            {(!!this.presentWage || !!this.presentWageAsSa) && (
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

        <app-footer />
      </ion-app>
    );
  }
}
