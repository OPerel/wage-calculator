import { Component, h, Prop } from '@stencil/core';
import { Output } from '../../utils/labels';

const { SemPay, AsMmh, AsSa, Future, Present, Pension } = Output;

@Component({
  tag: 'wage-output',
  styleUrl: 'wage-output.css',
})
export class WageOutput {
  @Prop() presentWageAsMamah: number | undefined;
  @Prop() presentWageAsSa: number | undefined;
  @Prop() futureWageAsMamah: number;
  @Prop() futureWageAsSa: number;
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
            sum={this.presentWageAsMamah}
          />
        )}

        <output-item
          label={`${SemPay} ${Future} ${AsMmh}${addDoubleAstrixIfNeeded(
            this.college,
          )}`}
          sum={this.futureWageAsMamah}
        />

        <output-item
          label={`${SemPay} ${Future} ${AsSa}${addDoubleAstrixIfNeeded(
            this.college,
          )}`}
          sum={this.futureWageAsSa}
        />

        <output-item label={Pension} sum={this.pensionPayments} />
      </div>
    );
  }
}

function addDoubleAstrixIfNeeded(college) {
  return ['hit15', 'hit168', 'ahv', 'hds', 'spr'].includes(college)
    ? ' **'
    : '';
}
