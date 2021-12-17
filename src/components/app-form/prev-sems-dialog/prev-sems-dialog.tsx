import { Component, h, Element, State } from '@stencil/core';
import { Watch } from '@ionic/core/dist/types/stencil-public-runtime';

interface Questions {
  [key: string]: number | null
}

const
  q1 = 'שעות סמסטר ב תש"פ',
  q2 = 'שעות סמסטר א תש"פ',
  q3 = 'שעות סמסטר ב תשע"ט',
  q4 = 'שעות סמסטר א תשע"ט';

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
      <from class="content">
        <ion-toolbar>
          <ion-title>
            הכנס\י שעות של 4 סמס' אחרונים
          </ion-title>
        </ion-toolbar>
        {
          Object.keys(questions).map((key) => {
            return (
              <ion-item>
                <ion-label slot="start">{key}</ion-label>
                <ion-input
                  inputmode="numeric"
                  enterkeyhint="done"
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
        <ion-button
          onClick={() => this.handleSubmit()}
          disabled={!this.valid}
        >
          הכנס
        </ion-button>
        <ion-button
          onClick={() => this.close()}
        >
          סגור
        </ion-button>
      </from>
    )
  }
}
