import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'wage-output',
  styleUrl: 'wage-output.css',
})
export class WageOutput {
  @Prop() presentWage: number;
  @Prop() futureWageByWeeks: number;
  @Prop({ mutable: true }) futureWage: number;
  @Prop() pensionPayments: number;

  componentWillRender() {
    if (this.futureWageByWeeks) {
      if (this.futureWageByWeeks > this.futureWage) {
        this.futureWage = this.futureWageByWeeks;
      }
    } else {
      if (this.presentWage > this.futureWage) {
        this.futureWage = this.presentWage;
      }
    }
  }

  render() {
    return (
      <div>
        <ion-item>
          <ion-label>שכר סמסטריאלי נוכחי כממ"ח</ion-label>
          <h4>
            {this.presentWage}
          </h4>
        </ion-item>

        {this.futureWageByWeeks && (
          <ion-item>
            <ion-label>שכר סמסטריאלי עתידי כממ"ח</ion-label>
            <h4>
              {this.futureWageByWeeks}
            </h4>
          </ion-item>
        )}

        <ion-item>
          <ion-label>שכר סמסטריאלי עתידי כס"ע</ion-label>
          <h4>
            {this.futureWage}
          </h4>
        </ion-item>

        <ion-item>
          <ion-label>גובה קרן השתלמות הפרשות מעסיק</ion-label>
          <h4>
            {this.pensionPayments}
          </h4>
        </ion-item>
      </div>
    )
  }
}