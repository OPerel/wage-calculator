import { Component, h, Prop } from '@stencil/core';

const currencyObj = {
  style: 'currency',
  currency: 'ILS'
}

@Component({
  tag: 'wage-output',
  styleUrl: 'wage-output.css',
})
export class WageOutput {
  @Prop() presentWage: number;
  @Prop() presentWageAsSa: number;
  @Prop() futureWageByWeeks: number;
  @Prop() futureWage: number;
  @Prop() pensionPayments: number;

  render() {
    return (
      <div>
        {this.presentWageAsSa ? (
          <ion-item>
            <ion-label>שכר סמסטריאלי נוכחי כס"ע</ion-label>
            <h4>
              {this.presentWageAsSa.toLocaleString('he-IL', currencyObj)}
            </h4>
          </ion-item>
        ) : (
          <ion-item>
            <ion-label>שכר סמסטריאלי נוכחי כממ"ח</ion-label>
            <h4>
              {this.presentWage.toLocaleString('he-IL', currencyObj)}
            </h4>
          </ion-item>
        )}

        {this.futureWageByWeeks && (
          <ion-item>
            <ion-label>שכר סמסטריאלי עתידי כממ"ח</ion-label>
            <h4>
              {this.futureWageByWeeks.toLocaleString('he-IL', currencyObj)}
            </h4>
          </ion-item>
        )}

        <ion-item>
          <ion-label>שכר סמסטריאלי עתידי כס"ע</ion-label>
          <h4>
            {this.futureWage.toLocaleString('he-IL', currencyObj)}
          </h4>
        </ion-item>

        <ion-item>
          <ion-label>גובה קרן השתלמות הפרשות מעסיק</ion-label>
          <h4>
            {this.pensionPayments.toLocaleString('he-IL', currencyObj)}
          </h4>
        </ion-item>
      </div>
    )
  }
}