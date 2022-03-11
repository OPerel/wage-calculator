import { Component, h, State, Listen } from '@stencil/core';

import { disclaimer, extraNote, saNote } from '../../assets/data/text';
import { Result } from '../../interfaces';
import { RootLabels } from '../../utils/labels';

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
  @State() college: string;

  @Listen('submitForm')
  submitFormHandler(e: CustomEvent<Result>) {
    const {
      presentWage,
      presentWageAsSa,
      futureWageByWeeks,
      futureWage,
      pensionPayments,
    } = e.detail;

    this.presentWage = presentWage;
    this.presentWageAsSa = presentWageAsSa;
    this.futureWageByWeeks = futureWageByWeeks;
    this.futureWage = futureWage;
    this.pensionPayments = pensionPayments;
  }

  @Listen('chooseCollege')
  chooseCollegeHandler(e: CustomEvent<string>) {
    this.college = e.detail;
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
          <ion-title>{RootLabels.HeaderTitle}</ion-title>
          <img
            style={{ backgroundColor: 'white' }}
            src="https://workers.org.il/wp-content/uploads/2018/05/workers-logo-80h.png"
            alt="logo"
            width="100"
            height="50"
          />
        </header>

        <ion-content>
          <ion-refresher
            slot="fixed"
            onIonRefresh={() => window.location.reload()}
          >
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>

          <main class="content">
            <h2>{RootLabels.PageTitle}</h2>

            <app-form />

            {(!!this.presentWage || !!this.presentWageAsSa) && (
              <wage-output
                presentWage={this.presentWage}
                presentWageAsSa={this.presentWageAsSa}
                futureWageByWeeks={this.futureWageByWeeks}
                futureWage={this.futureWage}
                pensionPayments={this.pensionPayments}
                college={this.college}
              />
            )}

            <div class="note">
              {['hit15', 'hit168', 'ahv', 'hds', 'spr'].includes(
                this.college,
              ) && <p>* {extraNote}</p>}
              <p>* {disclaimer}</p>
              <p>* {saNote}</p>
            </div>
          </main>
          <app-footer />
        </ion-content>
      </ion-app>
    );
  }
}
