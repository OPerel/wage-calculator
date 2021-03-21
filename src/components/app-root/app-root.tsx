import { Component, h, State, Listen } from '@stencil/core';

import { disclaimer, saNote } from '../../assets/data/text';
import { Result } from '../../utils/handleCalcLogic';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @State() presentWage: number;
  @State() presentWageAsSa: number;
  @State() futureWageByWeeks: number;
  @State() futureWage: number;
  @State() pensionPayments: number;

  @Listen('submitForm')
  submitFormHandler(e: CustomEvent<Result>) {
    const {
      presentWage,
      presentWageAsSa,
      futureWageByWeeks,
      futureWage,
      pensionPayments
    } = e.detail;

    this.presentWage = presentWage;
    this.presentWageAsSa = presentWageAsSa;
    this.futureWageByWeeks = futureWageByWeeks;
    this.futureWage = futureWage;
    this.pensionPayments = pensionPayments;
  }

  componentDidLoad() {
    const footer = document.getElementsByTagName('footer')[0];

    window.addEventListener('ionKeyboardDidShow', () => {
      footer.classList.add('hide');
    });
    
    window.addEventListener('ionKeyboardDidHide', () => {
      footer.classList.remove('hide');
    });
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

          <main class="content">

            <h2>מחשבון שכר נוכחי ועתידי</h2>
            
            <app-form />

            {(!!this.presentWage || !!this.presentWageAsSa) && (
              <wage-output
                presentWage={this.presentWage}
                presentWageAsSa={this.presentWageAsSa}
                futureWageByWeeks={this.futureWageByWeeks}
                futureWage={this.futureWage}
                pensionPayments={this.pensionPayments}
              />
            )}

            <div class="note">
              <p>* {disclaimer}</p>
              <p>* {saNote}</p>
            </div>

          </main>
          
        </ion-content>

        <app-footer />
      </ion-app>
    );
  }
}
