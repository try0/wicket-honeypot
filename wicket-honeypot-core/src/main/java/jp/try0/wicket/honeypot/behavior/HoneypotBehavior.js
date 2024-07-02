document.addEventListener("DOMContentLoaded", function() {

	// configs
	var delay = Number("${delay}");
	var autocomplete = "${autocomplete}";
	var isBlockSubmit = Boolean("${isBlockSubmit}");
	var detectHumanActivity = Boolean("${detectHumanActivity}");
	var name = "hpb-id";

	// hidden style
	function hide(hpElm) {
		hpElm.className = "hpb-f";

		hpElm.style.visibility = "hidden";
		hpElm.style.position = "fixed";
		hpElm.style.zIndex = "0";
		hpElm.style.bottom = "0";
		hpElm.style.left = "0";
		hpElm.style.width = "0px";
		hpElm.style.margin = "0 0 0 -10em";
	}


	var executedAppendField = false;
	var isHuman = false;
	var passedDelay = false;


	// Appends honeypot field
	function appendField() {
		if (executedAppendField) {
			return;
		}

		var forms = document.querySelectorAll("form");
		if (forms && forms.length > 0) {
			for (let i = 0; i < forms.length; i++) {
				let form = forms[i];

				if (form.querySelector("input[name=" + name + "]")) {
					continue;
				}

				// add element
				var hpField = document.createElement("input");
				hpField.type = "text";
				hpField.value = "";
				hpField.id = name + "-" + i;
				hpField.name = name;
				hide(hpField);

				hpField.setAttribute("aria-hidden", "true");
				hpField.setAttribute("tabindex", "-1");
				if (autocomplete) {
					hpField.setAttribute("autocomplete", autocomplete);
				}

				form.append(hpField);
			}
		}

		executedAppendField = true;
	}


	function humanActivity() {
		if (passedDelay) {
			appendField();
		}
		isHuman = true;
	}

	if (detectHumanActivity) {
		window.addEventListener('keydown', humanActivity);
		window.addEventListener('mousemove', humanActivity);
		window.addEventListener('touchstart', humanActivity);
		window.addEventListener('touchmove', humanActivity);
		window.addEventListener('scroll', humanActivity);
	}

	if (isBlockSubmit) {
		var blockSubmit = function(event) {
			var inputs = document.getElementsByName(name);
			if (inputs && inputs.length > 0) {
				for (let i = 0; i < inputs.length; i++) {
					let input = inputs[i];
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

		var forms = document.querySelectorAll("form");
		if (forms && forms.length > 0) {
			for (let i = 0; i < forms.length; i++) {
				let form = forms[i];
				form.addEventListener("submit", blockSubmit, false);
			}
		}
	}

	setTimeout(function() {
		if (detectHumanActivity) {
			if (isHuman) {
				appendField();
			}
		} else {
			appendField();
		}

		passedDelay = true;
	}, delay);

});