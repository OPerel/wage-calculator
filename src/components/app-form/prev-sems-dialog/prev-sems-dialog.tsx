import { Component, h, Element, State } from '@stencil/core';
import { Watch } from '@ionic/core/dist/types/stencil-public-runtime';
import { Dialog } from '../../../utils/labels';

interface Questions {
  [key: string]: number | null
}

const { q1, q2 ,q3, q4, Title, Submit, Close } = Dialog;

const questions: Questions = {
  [q1]: null,
  [q2]: null,
  [q3]: null,
  [q4]: null
};

@Component({
  tag: 'prev-sems-dialog'
})
export class PrevSems {
  @Element() el: HTMLElement;
  @State() questions: Questions = {};
  @State() valid: boolean = false;

  @Watch('questions')
  onFormChange() {
    if (Object.keys(this.questions).length === 4) {
      this.valid = true
    }
  }

  async handleSubmit() {
    const vals = Object.values(this.questions);
    const max = Math.max(...vals);
    await (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss(max);
  }

  async close() {
    await (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss();
  }

  render() {
    return (
      <ion-page>
        <header>
          <ion-title>
            {Title}
          </ion-title>
        </header>
        <from class="content">
          {
            Object.keys(questions).map((key, idx) => {
              return (
                <ion-item>
                  <ion-label slot="start">{key}</ion-label>
                  <ion-input
                    inputmode="numeric"
                    enterkeyhint={idx === 3 ? 'done' : 'next'}
                    value={this.questions[key]}
                    onIonChange={e => {
                      this.questions = {
                        ...this.questions,
                        [key]: Number(e.detail.value)
                      }
                    }}
                  />
                </ion-item>
              )
            })
          }
        </from>

        <div class="ion-padding">
          <ion-button
            onClick={() => this.handleSubmit()}
            disabled={!this.valid}
          >
            {Submit}
          </ion-button>
          <ion-button
            onClick={() => this.close()}
            color="secondary"
          >
            {Close}
          </ion-button>
        </div>
      </ion-page>
    )
  }
}
