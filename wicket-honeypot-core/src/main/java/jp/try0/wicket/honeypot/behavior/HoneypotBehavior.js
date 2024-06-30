addEventListener("DOMContentLoaded", function() {

	var setStyles = function(hpElm) {
		hpElm.className = "hpb-f";

		hpElm.style.visibility = "hidden";
		hpElm.style.position = "fixed";
		hpElm.style.zIndex = "0";
		hpElm.style.bottom = "0";
		hpElm.style.left = "0";
		hpElm.style.width = "0px";
	}

	var forms = document.querySelectorAll("form");
	if (forms) {
		for (let i = 0; i < forms.length; i++) {
			let form = forms[i];

			var hpLabel = document.createElement("label");
			hpLabel.for = "hpb-id";
			hpLabel.innerText = "ID";
			setStyles(hpLabel);
			form.append(hpLabel);

			var hpField = document.createElement("input");
			hpField.type = "text";
			hpField.value = "";
			hpField.id = "hpb-id";
			hpField.name = "hpb-id";
			setStyles(hpField);
			form.append(hpField);
		}
	}
});