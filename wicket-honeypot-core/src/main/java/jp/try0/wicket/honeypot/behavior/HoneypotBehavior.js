document.addEventListener("DOMContentLoaded", function() {

	// configs
	var delay = Number("${delay}");
	var autocomplete = "${autocomplete}";

	// hidden style
	var setStyles = function(hpElm) {
		hpElm.className = "hpb-f";

		hpElm.style.visibility = "hidden";
		hpElm.style.position = "fixed";
		hpElm.style.zIndex = "0";
		hpElm.style.bottom = "0";
		hpElm.style.left = "0";
		hpElm.style.width = "0px";
		hpElm.style.margin = "0 0 0 -10em";
	}

	setTimeout(function() {
		var forms = document.querySelectorAll("form");
		if (forms) {
			for (let i = 0; i < forms.length; i++) {
				let form = forms[i];

				// add element
				var hpField = document.createElement("input");
				hpField.type = "text";
				hpField.value = "";
				hpField.id = "hpb-id-" + i;
				hpField.name = "hpb-id";
				setStyles(hpField);

				hpField.setAttribute("aria-hidden", "true");
				hpField.setAttribute("tabindex", "-1");
				if (autocomplete) {
					hpField.setAttribute("autocomplete", autocomplete);
				}

				form.append(hpField);
			}
		}
	}, delay);

});