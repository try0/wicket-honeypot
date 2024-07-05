
/**
 * HoneypotBehavior's option.
 * 
 * jp.try0.wicket.honeypot.behavior.HoneypotBehaviorConfig
 */
export interface HoneypotBehaviorConfig {
    delay: number;
    autocomplete: string;
    blockSubmit: boolean;
    detectHumanActivity: boolean;
    name: string;
}

export class HoneypotBehavior {

    private config: HoneypotBehaviorConfig;


    private executedAppendField: boolean = false;
    private isHuman: boolean = false;
    private passedDelay: boolean = false;

    constructor(config: HoneypotBehaviorConfig) {
        this.config = config;
    }

    private hide(hpElm: HTMLElement): void {
        hpElm.className = "hpb-f";

        hpElm.style.visibility = "hidden";
        hpElm.style.position = "fixed";
        hpElm.style.zIndex = "-1";
        hpElm.style.bottom = "0";
        hpElm.style.left = "0";
        hpElm.style.width = "0px";
        hpElm.style.margin = "0 0 0 -10em";
    }

    private appendField(): void {
        if (this.executedAppendField) {
            return;
        }

        let forms = document.querySelectorAll("form");
        if (forms && forms.length > 0) {
            for (let i = 0; i < forms.length; i++) {
                let form = forms[i];

                if (form.querySelector("input[name=" + this.config.name + "]")) {
                    continue;
                }

                // add element
                let hpField = document.createElement("input");
                hpField.type = "text";
                hpField.value = "";
                hpField.id = this.config.name + "-" + i;
                hpField.name = this.config.name;
                this.hide(hpField);

                hpField.setAttribute("aria-hidden", "true");
                hpField.setAttribute("tabindex", "-1");
                if (this.config.autocomplete) {
                    hpField.setAttribute("autocomplete", this.config.autocomplete);
                }

                form.append(hpField);
            }
        }

        this.executedAppendField = true;
    }

    private humanActivity(): void {
        if (this.passedDelay) {
            this.appendField();
        }
        this.isHuman = true;
    }

    private blockSubmit(event: Event): void {
        let inputs: NodeListOf<HTMLElement> = document.getElementsByName(this.config.name);
        if (inputs && inputs.length > 0) {
            for (let i = 0; i < inputs.length; i++) {
                let input = inputs[i] as HTMLInputElement;
                if (input.value == undefined || input.value == null || input.value.length == 0) {
                    // empty
                    return;
                }

                event.preventDefault();
                break;
            }
        } else {
            event.preventDefault();
        }
    }

    /**
     * Initialize behavior
     */
    public init(): void {

        if (this.config.detectHumanActivity) {
            const detector = () => this.humanActivity();
            window.addEventListener('keydown', detector);
            window.addEventListener('mousemove', detector);
            window.addEventListener('touchstart', detector);
            window.addEventListener('touchmove', detector);
            window.addEventListener('scroll', detector);
        }

        if (this.config.blockSubmit) {
            const blocker = (e: Event) => this.blockSubmit(e);
            let forms = document.querySelectorAll("form");
            if (forms && forms.length > 0) {
                for (let i = 0; i < forms.length; i++) {
                    let form = forms[i] as HTMLFormElement;
                    form.addEventListener("submit", blocker, false);
                }
            }
        }
 
        setTimeout(() => {
            if (this.config.detectHumanActivity) {
                if (this.isHuman) {
                    this.appendField();
                }
            } else {
                this.appendField();
            }
    
            this.passedDelay = true;
        }, this.config.delay);
    }
}

