package jp.try0.wicket.honeypot.behavior;

import org.apache.wicket.Component;
import org.apache.wicket.behavior.Behavior;
import org.apache.wicket.markup.head.CssReferenceHeaderItem;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.validation.AbstractFormValidator;
import org.apache.wicket.request.IRequestParameters;
import org.apache.wicket.request.resource.CssResourceReference;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.util.string.StringValue;

/**
 * Adds honeypot field.
 */
public class HoneypotBehavior extends Behavior {

	private final static String HONEYPOT_FIELD_NAME = "hpb-id";

	public final static JavaScriptResourceReference JS_REFERENCE = new JavaScriptResourceReference(
			HoneypotBehavior.class,
			HoneypotBehavior.class.getSimpleName() + ".js");

	public final static CssResourceReference CSS_REFERENCE = new CssResourceReference(HoneypotBehavior.class,
			HoneypotBehavior.class.getSimpleName() + ".css");

	private Form<?> form;

	public HoneypotBehavior() {
	}

	@Override
	public void bind(Component component) {

		if (!(component instanceof Form<?>)) {
			throw new UnsupportedOperationException("Add HoneypotBehavior to FormComponent.");
		}

		super.bind(component);

		this.form = (Form<?>) component;
		this.form.add(new AbstractFormValidator() {

			@Override
			public void validate(Form<?> form) {

				IRequestParameters postParams = form.getRequest().getPostParameters();

				// missing honeypot field
				if (!postParams.getParameterNames().contains(HONEYPOT_FIELD_NAME)) {
					onError(form);
				}

				// check honeypot field
				StringValue paramValue = postParams.getParameterValue(HONEYPOT_FIELD_NAME);
				if (!paramValue.isEmpty()) {
					// entered by a bot
					onError(form);
				}

			}

			@Override
			public FormComponent<?>[] getDependentFormComponents() {
				return null;
			}
		});
	}

	@Override
	public void unbind(Component component) {
		super.unbind(component);
		this.form = null;
	}

	@Override
	public void renderHead(Component component, IHeaderResponse response) {
		super.renderHead(component, response);

		response.render(JavaScriptHeaderItem.forReference(JS_REFERENCE));
		response.render(CssReferenceHeaderItem.forReference(CSS_REFERENCE));
	}

	protected void onError(Form<?> form) {
		String errorMessage = form.getString("HoneypotBehavior.error", null, "Invalid request.");
		form.error(errorMessage);
	}
}
