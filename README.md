# wicket-honeypot
Adds honeypot to form.


```java
add(new Form<Void>("form") {
    {
        add(new HoneypotBehavior());
    }
});
```

HoneypotBehavior adds a honeypot field to the form. The added field is of type text and will be hidden using styles.
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