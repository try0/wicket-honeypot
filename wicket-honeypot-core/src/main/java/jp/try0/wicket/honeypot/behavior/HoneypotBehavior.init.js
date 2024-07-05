document.addEventListener("DOMContentLoaded", function () {
    // configs
    const config = {
        name: "hpb-id",
        delay: Number("${delay}"),
        autocomplete: "${autocomplete}",
        blockSubmit: Boolean("${blockSubmit}"),
        detectHumanActivity: Boolean("${detectHumanActivity}"),
    }

    new jp.try0.wicket.HoneypotBehavior(config).init();
});