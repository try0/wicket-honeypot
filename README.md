# wicket-honeypot
Adds honeypot field to the form.



```java
add(new Form<Void>("form") {
    {
        add(new HoneypotBehavior());
    }
});
```

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



HoneypotBehavior uses JavaScript on the client side to add a honeypot field to the form. The added field is of type text and will be hidden using styles.
To distinguish between bot actions and user actions, the field addition process can be executed with a delay.

```java
add(new Form<Void>("form") {
    {
        int delayMs = 2000;
        add(new HoneypotBehavior(delayMs));
    }
});
```

For example, this code determines that requests made within two seconds of the screen being displayed are bot actions.


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


To display a message and request form resubmission when a user action is mistakenly identified as a bot action, please override the onError method.