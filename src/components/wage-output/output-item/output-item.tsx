import { Component, h, Prop } from '@stencil/core';

const currencyObj = {
  style: 'currency',
  currency: 'ILS',
};

@Component({
  tag: 'output-item',
})
export class OutputItem {
  @Prop() label: string;
  @Prop() sum: number;

  render() {
    return (
      <ion-item>
        <ion-label style={{ whiteSpace: 'initial', marginLeft: '2%' }}>
          {this.label}
        </ion-label>
        <span>{this.sum.toLocaleString('he-IL', currencyObj)}</span>
      </ion-item>
    );
  }
}
