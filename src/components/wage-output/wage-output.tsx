import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'wage-output',
  styleUrl: 'wage-output.css',
})
export class WageOutput {
  @Prop() presentWage: number | undefined;
  @Prop() presentWageAsSa: number | undefined;
  @Prop() futureWageByWeeks: number;
  @Prop() futureWage: number;
  @Prop() pensionPayments: number;

  render() {
    return (
      <div>
        {this.presentWageAsSa ? (
          <output-item label={`שכר סמסטריאלי נוכחי כס"ע`} sum={this.presentWageAsSa} />
        ) : (
          <output-item label={`שכר סמסטריאלי נוכחי כממ"ח`} sum={this.presentWage} />
        )}

        <output-item label={`שכר סמסטריאלי עתידי כממ"ח`} sum={this.futureWageByWeeks} />

        <output-item label={`שכר סמסטריאלי עתידי כס"ע`} sum={this.futureWage} />

        <output-item label={`גובה קרן השתלמות לס"ע הפרשות מעסיק`} sum={this.pensionPayments} />
      </div>
    )
  }
}
