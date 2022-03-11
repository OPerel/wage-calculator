import { Component, h, Element, State, Prop } from '@stencil/core';
import { Watch } from '@ionic/core/dist/types/stencil-public-runtime';
import { Dialog } from '../../../utils/labels';

interface Questions {
  [key: string]: number | null;
}

const { q1, q2, q3, q4, q, Title, SemATitle, Submit, Close } = Dialog;

@Component({
  tag: 'prev-sems-dialog',
})
export class PrevSems {
  @Element() el: HTMLElement;
  @State() answers: Questions = {};
  @State() valid: boolean = false;
  @Prop() beforeSemA: boolean;
  @Watch('answers')
  onFormChange() {
    const length = this.beforeSemA ? 4 : 1;
    if (Object.keys(this.answers).length === length) {
      this.valid = true;
    }
  }

  handleInput(key: string, value: number) {
    this.answers = {
      ...this.answers,
      [key]: value,
    };
  }

  async handleSubmit() {
    const vals = Object.values(this.answers);
    const max = Math.max(...vals);
    await this.close(max);
  }

  async close(data?: number) {
    await (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss(data);
  }

  getQuestions() {
    return this.beforeSemA
      ? {
          [q1]: null,
          [q2]: null,
          [q3]: null,
          [q4]: null,
        }
      : {
          [q]: null,
        };
  }

  render() {
    return (
      <ion-page>
        <header>
          <ion-title>{this.beforeSemA ? Title : SemATitle}</ion-title>
        </header>
        <from class="content">
          {Object.keys(this.getQuestions()).map((key, idx) => {
            return (
              <ion-item class="dialog-item">
                <ion-label slot="start">{key}</ion-label>
                <ion-input
                  inputmode="numeric"
                  enterkeyhint={idx === 3 ? 'done' : 'next'}
                  value={this.answers[key]}
                  onIonChange={e =>
                    this.handleInput(key, Number(e.detail.value))
                  }
                />
              </ion-item>
            );
          })}
        </from>

        <div class="ion-padding">
          <ion-button
            onClick={() => this.handleSubmit()}
            disabled={!this.valid}
          >
            {Submit}
          </ion-button>
          <ion-button onClick={() => this.close()} color="secondary">
            {Close}
          </ion-button>
        </div>
      </ion-page>
    );
  }
}
