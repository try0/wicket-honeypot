document.addEventListener("DOMContentLoaded", function () {
    // configs
    const config = {
        name: "hpb-id",
        delay: Number("${delay}"),
        autocomplete: "${autocomplete}",
        blockSubmit: "${blockSubmit}".toLowerCase() === "true",
        detectHumanActivity: "${detectHumanActivity}".toLowerCase() === "true",
    }

    new jp.try0.wicket.HoneypotBehavior(config).init();
});