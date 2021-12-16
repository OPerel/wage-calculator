import { Component, h, Prop } from '@stencil/core';

const currencyObj = {
  style: 'currency',
  currency: 'ILS'
}

@Component({
  tag: 'output-item'
})
export class OutputItem {
  @Prop() label: string;
  @Prop() sum: number;

  render() {
    return (
      <ion-item>
        <ion-label>{this.label}</ion-label>
        <h4>
          {this.sum.toLocaleString('he-IL', currencyObj)}
        </h4>
      </ion-item>
    )
  }
}
