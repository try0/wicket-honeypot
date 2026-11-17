# wicket-honeypot
Adds a honeypot field to Wicket forms to help block spam bots.

## Versions


| Version | Wicket |
| ---- | ---- |
| [4.0.0](https://search.maven.org/artifact/jp.try0.wicket/wicket-honeypot-core/4.0.0/jar) | 11.x |
| [3.0.0](https://search.maven.org/artifact/jp.try0.wicket/wicket-honeypot-core/3.0.0/jar) | 10.x |

Wicket 11.x
```xml
<dependency>
    <groupId>jp.try0.wicket</groupId>
    <artifactId>wicket-honeypot-core</artifactId>
    <version>4.0.0</version>
</dependency>
```

Wicket 10.x
```xml
<dependency>
    <groupId>jp.try0.wicket</groupId>
    <artifactId>wicket-honeypot-core</artifactId>
    <version>3.0.0</version>
</dependency>
```


## Usage

```java
add(new Form<Void>("form") {
    {
        add(new HoneypotBehavior());
    }
});
```


`HoneypotBehavior` uses client-side JavaScript to add a honeypot field to the form. The field is a text input hidden with inline styles:

```html
<input 
    type="text" 
    id="hpb-id-0" 
    name="hpb-id" 
    class="hpb-f" 
    aria-hidden="true" 
    tabindex="-1" 
    autocomplete="one-time-code" 
    style="visibility: hidden; position: fixed; z-index: -1; bottom: 0px; left: 0px; width: 0px; margin: 0px 0px 0px -10em;">
```


The field can be added after a delay.
For example, the following code treats any form submitted within two seconds of the page loading as a bot submission.

```java
add(new Form<Void>("form") {
    {
        int delayMs = 2000;
        add(new HoneypotBehavior(delayMs));
    }
});
```


If a real user is mistakenly identified as a bot, you can override `onError` to show a message asking them to submit the form again.

```java
add(new Form<Void>("form") {
    {
        int delayMs = 2000;
        add(new HoneypotBehavior(delayMs) {
            @Override
            protected void onError(Form<?> form) {
                form.error(HomePage.this.getString("honeypot_error_message")); // replace with your own property key
            }
        });
    }
});
```


Other options can be set with `HoneypotBehaviorConfig`.

```java
add(new Form<Void>("form") {
    {
        HoneypotBehaviorConfig config = new HoneypotBehaviorConfig();
        // Delay in milliseconds before the honeypot field is added.
        // default: 0
        config.setDelay(1500);
        // The autocomplete attribute of the honeypot field.
        // default: one-time-code
        config.setAutocomplete("one-time-code");
        // Block submission on the client if the honeypot field is missing or filled in.
        // default: false
        config.setBlockSubmit(true);
        // Treat the user as a bot unless a keydown, mousemove, touchstart, touchmove, or scroll event is detected.
        // default: false
        config.setDetectHumanActivity(true);

        add(new HoneypotBehavior(config));
    }
});
```
