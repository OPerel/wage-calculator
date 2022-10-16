/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Result } from "./interfaces";
export namespace Components {
    interface AppFooter {
    }
    interface AppForm {
    }
    interface AppRoot {
    }
    interface OutputItem {
        "label": string;
        "sum": number;
    }
    interface PrevSemsDialog {
        "beforeSemA": boolean;
    }
    interface WageOutput {
        "college": string;
        "futureWage": number;
        "futureWageByWeeks": number;
        "pensionPayments": number;
        "presentWage": number | undefined;
        "presentWageAsSa": number | undefined;
        "remainingHoursMmh": number | undefined;
        "remainingHoursSa": number | undefined;
    }
}
declare global {
    interface HTMLAppFooterElement extends Components.AppFooter, HTMLStencilElement {
    }
    var HTMLAppFooterElement: {
        prototype: HTMLAppFooterElement;
        new (): HTMLAppFooterElement;
    };
    interface HTMLAppFormElement extends Components.AppForm, HTMLStencilElement {
    }
    var HTMLAppFormElement: {
        prototype: HTMLAppFormElement;
        new (): HTMLAppFormElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLOutputItemElement extends Components.OutputItem, HTMLStencilElement {
    }
    var HTMLOutputItemElement: {
        prototype: HTMLOutputItemElement;
        new (): HTMLOutputItemElement;
    };
    interface HTMLPrevSemsDialogElement extends Components.PrevSemsDialog, HTMLStencilElement {
    }
    var HTMLPrevSemsDialogElement: {
        prototype: HTMLPrevSemsDialogElement;
        new (): HTMLPrevSemsDialogElement;
    };
    interface HTMLWageOutputElement extends Components.WageOutput, HTMLStencilElement {
    }
    var HTMLWageOutputElement: {
        prototype: HTMLWageOutputElement;
        new (): HTMLWageOutputElement;
    };
    interface HTMLElementTagNameMap {
        "app-footer": HTMLAppFooterElement;
        "app-form": HTMLAppFormElement;
        "app-root": HTMLAppRootElement;
        "output-item": HTMLOutputItemElement;
        "prev-sems-dialog": HTMLPrevSemsDialogElement;
        "wage-output": HTMLWageOutputElement;
    }
}
declare namespace LocalJSX {
    interface AppFooter {
    }
    interface AppForm {
        "onChooseCollege"?: (event: CustomEvent<string>) => void;
        "onSubmitForm"?: (event: CustomEvent<Result>) => void;
    }
    interface AppRoot {
    }
    interface OutputItem {
        "label"?: string;
        "sum"?: number;
    }
    interface PrevSemsDialog {
        "beforeSemA"?: boolean;
    }
    interface WageOutput {
        "college"?: string;
        "futureWage"?: number;
        "futureWageByWeeks"?: number;
        "pensionPayments"?: number;
        "presentWage"?: number | undefined;
        "presentWageAsSa"?: number | undefined;
        "remainingHoursMmh"?: number | undefined;
        "remainingHoursSa"?: number | undefined;
    }
    interface IntrinsicElements {
        "app-footer": AppFooter;
        "app-form": AppForm;
        "app-root": AppRoot;
        "output-item": OutputItem;
        "prev-sems-dialog": PrevSemsDialog;
        "wage-output": WageOutput;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-footer": LocalJSX.AppFooter & JSXBase.HTMLAttributes<HTMLAppFooterElement>;
            "app-form": LocalJSX.AppForm & JSXBase.HTMLAttributes<HTMLAppFormElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "output-item": LocalJSX.OutputItem & JSXBase.HTMLAttributes<HTMLOutputItemElement>;
            "prev-sems-dialog": LocalJSX.PrevSemsDialog & JSXBase.HTMLAttributes<HTMLPrevSemsDialogElement>;
            "wage-output": LocalJSX.WageOutput & JSXBase.HTMLAttributes<HTMLWageOutputElement>;
        }
    }
}
