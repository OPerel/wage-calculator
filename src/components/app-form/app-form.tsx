import { Component, h, State, Event, EventEmitter } from '@stencil/core';

import { seniorityMessage } from '../../assets/data/text';
import colleges from '../../assets/data/colleges';
import ranks from '../../assets/data/wageByRank';

import { CheckboxChangeEventDetail, modalController, OverlayEventDetail } from '@ionic/core';

import handleCalcLogic from '../../utils/handleCalcLogic';
import { Result } from '../../interfaces';
import { FormLabels } from '../../utils/labels';

@Component({
  tag: 'app-form',
  styleUrl: 'app-form.css',
})
export class AppRoot {
  hoursInput: HTMLInputElement;
  hoursInput2: HTMLInputElement;

  @State() existingTeacher: boolean = false;
  @State() maxPrevHours: number;
  @State() college: string;
  @State() preDealSa: boolean;
  @State() position: string[];
  @State() multiPosition: boolean;
  @State() rank: string;
  @State() preDealSeniority: number;
  @State() seniority: number;
  @State() hours: number;
  @State() hours2: number;
  @State() recentHours: number[] = [];
  @State() formIsValid: boolean;

  @Event() submitForm: EventEmitter<Result>;
  @Event() chooseCollege: EventEmitter<string>;

  handleSubmit() {
    const state = {
      maxPrevHours: this.maxPrevHours,
      college: this.college,
      preDealSa: this.preDealSa,
      position: this.position,
      multiPosition: this.multiPosition,
      rank: this.rank,
      preDealSeniority: this.preDealSeniority,
      seniority: this.seniority,
      hours: this.hours,
      hours2: this.hours2
    };

    const result = handleCalcLogic(state);
    result.college = this.college;
    this.submitForm.emit(result);
  }

  private async openModal() {
    const modal: HTMLIonModalElement = await modalController.create({
      component: 'prev-sems-dialog'
    });

    await modal.present();

    modal.onDidDismiss()
      .then(async (detail: OverlayEventDetail) => {
        this.maxPrevHours = detail.data;
        if (!detail.data) {
          this.existingTeacher = false;
        }
      })
  }

  handleExistingCheckbox = (e: CustomEvent<CheckboxChangeEventDetail>) => {
    this.existingTeacher = e.detail.checked;
    if (this.existingTeacher) {
      this.openModal();
    } else {
      this.maxPrevHours = undefined;
    }
  }

  componentDidLoad() {
    document.getElementById('hours1').addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.hoursInput.blur();
      }
    });
  }

  componentWillUpdate() {
    if (this.position && this.position.length === 2) {
      this.multiPosition = true;
    } else {
      this.multiPosition = false;
      this.hours2 = undefined;
    }

    const isValid =
      !!this.rank &&
      !!this.college &&
      !!this.hours &&
      !!this.seniority &&
      !!this.position &&
      (this.multiPosition ? !!this.hours2 : true) &&
      (this.preDealSa ? !!this.preDealSeniority : true);

    this.formIsValid = isValid;
  }

  componentDidUpdate() {
    if (this.multiPosition) {
      document.getElementById('hours2').addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          this.hoursInput2.blur();
        }
      });
    }
  }

  render() {
    return (
      <form>

        <ion-item>
          <ion-label class="my-label">{FormLabels.HasPrevSems}</ion-label>
          <ion-checkbox checked={this.existingTeacher} onIonChange={this.handleExistingCheckbox} />
        </ion-item>

        <ion-item>
          <ion-label>{FormLabels.ChooseCollege}</ion-label>
          <ion-select value={this.college} onIonChange={e => {
            this.college = e.detail.value;
            this.chooseCollege.emit(this.college)}
          }>
            {colleges.map(({ name, label }) => (
              <ion-select-option value={name}>{label}</ion-select-option>
            ))}
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>{FormLabels.ChooseDeal} {this.existingTeacher && FormLabels.BeforeDeal}</ion-label>
          <ion-select
            value={this.preDealSa}
            onIonChange={e => {this.preDealSa = e.detail.value}}
          >
            <ion-select-option value={false}>{FormLabels.Mmh}</ion-select-option>
            <ion-select-option value={true}>{FormLabels.Sa}</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>{FormLabels.ChoosePosition}</ion-label>
          <ion-select
            multiple
            value={this.position}
            onIonChange={e => {this.position = e.detail.value}}
          >
            <ion-select-option value="teach">{FormLabels.Teacher}</ion-select-option>
            <ion-select-option value="prof">{FormLabels.Professor}</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>{FormLabels.ChooseRank}</ion-label>
          <ion-select value={this.rank} onIonChange={e => {this.rank = e.detail.value}}>
            {ranks.map(({ name, label }) => (
              <ion-select-option value={name}>{label}</ion-select-option>
            ))}
          </ion-select>
        </ion-item>

        <div>
          <ion-item>
            <ion-label>{FormLabels.ChooseSeniority}</ion-label>
            <ion-select
              value={this.seniority}
              onIonChange={e => {this.seniority = e.detail.value}}
              interfaceOptions={{ message: seniorityMessage }}
              >
              {this.rank === 'b' ? (
                Array.from(Array(26)).map((_, idx) => (
                  <ion-select-option>{idx}</ion-select-option>
                ))
              ) : (
                Array.from(Array(16)).map((_, idx) => (
                  <ion-select-option>{idx}</ion-select-option>
                ))
              )}
            </ion-select>
          </ion-item>
          {this.preDealSa && (
            <ion-item>
              <ion-label>{FormLabels.ChooseCurrentSeniority}</ion-label>
              <ion-select
                value={this.preDealSeniority}
                onIonChange={e => {this.preDealSeniority = e.detail.value}}
                interfaceOptions={{}}
              >
                {this.rank === 'b' ? (
                  Array.from(Array(26)).map((_, idx) => (
                    <ion-select-option>{idx}</ion-select-option>
                  ))
                ) : (
                  Array.from(Array(16)).map((_, idx) => (
                    <ion-select-option>{idx}</ion-select-option>
                  ))
                )}
              </ion-select>
            </ion-item>
          )}
        </div>

        <ion-item>
          <ion-label>{FormLabels.EnterHours} {this.multiPosition && FormLabels.Teacher}</ion-label>
          <ion-input
            id="hours1"
            inputmode="numeric"
            enterkeyhint="done"
            value={this.hours}
            onIonChange={e => {this.hours = Number(e.detail.value)}}
            ref={(el: HTMLIonInputElement) => el.getInputElement().then(res => this.hoursInput = res)}
          />
        </ion-item>

        {this.multiPosition && (
          <ion-item>
            <ion-label>{`${FormLabels.EnterHours} ${FormLabels.Professor}`}</ion-label>
            <ion-input
              id="hours2"
              type="number"
              inputmode="numeric"
              enterkeyhint="done"
              value={this.hours2}
              onIonChange={e => {this.hours2 = Number(e.detail.value)}}
              ref={(el: HTMLIonInputElement) => {
                if (this.multiPosition) {
                  el.getInputElement().then(res => this.hoursInput2 = res);
                }
              }}
            />
          </ion-item>
        )}

        {this.maxPrevHours && <p>* {FormLabels.BonusHours} <b>{this.maxPrevHours}</b></p>}

        <ion-button
          onClick={() => this.handleSubmit()}
          disabled={!this.formIsValid}
        >
          {FormLabels.SubmitButton}
        </ion-button>

      </form>
    )
  }
}
