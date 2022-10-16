import { Component, h, Prop } from '@stencil/core';
import { Output } from '../../utils/labels';

const { SemPay, AsMmh, AsSa, Future, Present, Pension, RemainingHours } =
  Output;

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
  @Prop() remainingHoursMmh: number | undefined;
  @Prop() remainingHoursSa: number | undefined;
  @Prop() college: string;

  render() {
    return (
      <div>
        {this.presentWageAsSa ? (
          <output-item
            label={`${SemPay} ${Present} ${AsSa}`}
            sum={this.presentWageAsSa}
          />
        ) : (
          <output-item
            label={`${SemPay} ${Present} ${AsMmh}`}
            sum={this.presentWage}
          />
        )}

        <output-item
          label={`${SemPay} ${Future} ${AsMmh}${addDoubleAstrixIfNeeded(
            this.college,
          )}`}
          sum={this.futureWageByWeeks}
        />

        <output-item
          label={`${SemPay} ${Future} ${AsSa}${addDoubleAstrixIfNeeded(
            this.college,
          )}`}
          sum={this.futureWage}
        />

        <output-item label={Pension} sum={this.pensionPayments} />

        {addDoubleAstrixIfNeeded(this.college) &&
          this.remainingHoursSa &&
          this.remainingHoursMmh && [
            <output-item
              label={`${RemainingHours} כממ"ח הן`}
              sum={this.remainingHoursMmh}
            />,
            <output-item
              label={`${RemainingHours} כס"ע הן`}
              sum={this.remainingHoursSa}
            />,
          ]}
      </div>
    );
  }
}

function addDoubleAstrixIfNeeded(college) {
  return ['hit15', 'hit168', 'ahv', 'hds', 'spr'].includes(college)
    ? ' **'
    : '';
}
