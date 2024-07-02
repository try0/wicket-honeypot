# wicket-honeypot
Adds honeypot field to the form.



```java
add(new Form<Void>("form") {
    {
        add(new HoneypotBehavior());
    }
});
```


HoneypotBehavior uses JavaScript on the client side to add a honeypot field to the form. The added field is of type text and will be hidden using styles.

```html
<input 
    type="text" 
    id="hpb-id-0" 
    name="hpb-id" 
    class="hpb-f" 
    aria-hidden="true" 
    tabindex="-1" 
    autocomplete="one-time-code" 
    style="visibility: hidden; position: fixed; z-index: 0; bottom: 0px; left: 0px; width: 0px; margin: 0px 0px 0px -10em;">
```


The field addition process can be executed with a delay.
For example, this code determines that requests made within two seconds of the screen being displayed are bot actions.

```java
add(new Form<Void>("form") {
    {
        int delayMs = 2000;
        add(new HoneypotBehavior(delayMs));
    }
});
```


To display a message and request form resubmission when a user action is mistakenly identified as a bot action, please override the onError method.

```java
add(new Form<Void>("form") {
    {
        int delayMs = 2000;
        add(new HoneypotBehavior(delayMs) {
            @Override
            protected void onError(Form<?> form) {
                form.error(HomePage.this.getString("honeypot_error_message")); // TODO your prop key
            }
        });
    }
});
```





With other configs.

```java
add(new Form<Void>("form") {
    {
        // custom config
        HoneypotBehaviorConfig config = new HoneypotBehaviorConfig();
        // the field addition process can be executed with a delay.
        // default: 0
        config.setDelay(1500);
        // honeypot field autocomplete attr.
        // default: one-time-code
        config.setAutocomplete("one-time-code");
        // block submit on the client.
        // default: false
        config.setBlockSubmit(true);
        // If none of [keydown, mousemove, touchstart, touchmove, scroll] events are detected, assume the user is a bot.
        // default: false
		config.setDetectHumanActivity(true);

        add(new HoneypotBehavior(config));
    }
});
```
