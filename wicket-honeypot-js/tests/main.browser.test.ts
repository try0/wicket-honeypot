import { assert, describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

import { HoneypotBehavior, HoneypotBehaviorConfig } from "../src/main.ts";

async function wait(sleep: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, sleep));
}

function createTestForm() {
    document.body.innerHTML = `
        <form>
            <div>
                <label for="account">Account</label>
                <input id="account" type="text">
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" type="password">
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    `;
}

function getAccountTextField(): HTMLInputElement {
    return document.querySelector("input[id='account']")!;
}

function getPasswordTextField(): HTMLInputElement {
    return document.querySelector("input[id='password']")!;
}

function getLoginButton(): HTMLButtonElement {
    return document.querySelector("button[type='submit']")!;
}



describe("HoneypotBehavior", () => {

    test("renders honeypot field", async () => {
        createTestForm();

        const config: HoneypotBehaviorConfig = {
            delay: 0,
            autocomplete: "",
            blockSubmit: false,
            detectHumanActivity: false,
            name: "ut-hpb-field"
        }
        new HoneypotBehavior(config).init()
        await wait(1);

        const honeypotField: HTMLElement | null = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeDefined();

    });

    test("renders honeypot field with delay", async () => {
        createTestForm();

        const config: HoneypotBehaviorConfig = {
            delay: 1000,
            autocomplete: "",
            blockSubmit: false,
            detectHumanActivity: false,
            name: "ut-hpb-field"
        }

        new HoneypotBehavior(config).init()
        await wait(1);

        let honeypotField: HTMLElement | null = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeNull();

        await wait(800);
        honeypotField = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeNull();

        await wait(201);
        honeypotField = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeDefined();
    });

    test("tests attribute", async () => {
        createTestForm();

        const config: HoneypotBehaviorConfig = {
            delay: 0,
            autocomplete: "new-password",
            blockSubmit: false,
            detectHumanActivity: false,
            name: "ut-hpb-field"
        }

        new HoneypotBehavior(config).init()
        await wait(1);

        let honeypotField: HTMLElement | null = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeDefined();

        assert.equal(honeypotField?.getAttribute("autocomplete"), "new-password", "autocomplete is not config.autocomplete");
        assert.equal(honeypotField?.getAttribute("tabindex"), "-1", "tabindex must be -1");
        assert.equal(honeypotField?.getAttribute("aria-hidden"), "true", "aria-hidden must be true");
        assert.equal(honeypotField?.getAttribute("type"), "text", "type must be text");

    });

    test("tests human activity", async () => {
        createTestForm();
        const user = userEvent.setup();


        const config: HoneypotBehaviorConfig = {
            delay: 0,
            autocomplete: "one-time-code",
            blockSubmit: false,
            detectHumanActivity: true,
            name: "ut-hpb-field"
        }

        new HoneypotBehavior(config).init()
        await wait(1);

        let honeypotField: HTMLElement | null = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeNull();

        // detect user event
        await user.type(getAccountTextField(), "test-account");
        await wait(1);

        honeypotField = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeDefined();

    });


    test("tests human activity and delay: 1", async () => {
        createTestForm();
        const user = userEvent.setup();

        const config: HoneypotBehaviorConfig = {
            delay: 2000,
            autocomplete: "one-time-code",
            blockSubmit: false,
            detectHumanActivity: true,
            name: "ut-hpb-field"
        }

        new HoneypotBehavior(config).init()
        await wait(1);

        let honeypotField: HTMLElement | null = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeNull();

        // detect user event
        await user.type(getAccountTextField(), "test-account");
        await wait(1);

        honeypotField = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeNull();

        await wait(2000);

        honeypotField = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeDefined();
    });

    test("tests human activity and delay: 2", async () => {
        createTestForm();
        const user = userEvent.setup();


        const config: HoneypotBehaviorConfig = {
            delay: 1000,
            autocomplete: "one-time-code",
            blockSubmit: false,
            detectHumanActivity: true,
            name: "ut-hpb-field"
        }

        new HoneypotBehavior(config).init()
        await wait(1);

        let honeypotField: HTMLElement | null = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeNull();

        await wait(2000);

        honeypotField = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeNull();

        
        // detect user event
        await user.type(getAccountTextField(), "test-account");
        await wait(1);

        honeypotField = document.querySelector("[name='ut-hpb-field']");
        expect(honeypotField).toBeDefined();
    });

});

