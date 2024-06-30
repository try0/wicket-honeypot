package jp.try0.wicket.honeypot.behavior;

import org.apache.wicket.Component;
import org.apache.wicket.behavior.Behavior;
import org.apache.wicket.markup.head.CssReferenceHeaderItem;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.validation.AbstractFormValidator;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.IRequestParameters;
import org.apache.wicket.request.resource.CssResourceReference;
import org.apache.wicket.resource.TextTemplateResourceReference;
import org.apache.wicket.util.string.StringValue;

/**
 * Adds honeypot field.
 */
public class HoneypotBehavior extends Behavior {

	private final static String HONEYPOT_FIELD_NAME = "hpb-id";

	/**
	 * default js reference
	 */
	public final static TextTemplateResourceReference JS_NO_DELAY_REFERENCE;

	/**
	 * css reference
	 */
	public final static CssResourceReference CSS_REFERENCE = new CssResourceReference(HoneypotBehavior.class,
			HoneypotBehavior.class.getSimpleName() + ".css");

	static {
		// create default instance		
		JS_NO_DELAY_REFERENCE = new TextTemplateResourceReference(HoneypotBehavior.class,
				HoneypotBehavior.class.getSimpleName() + ".js", "text/javascript",
				Model.ofMap(new HoneypotBehaviorConfig().asMap()));
	}

	/**
	 * target
	 */
	private Form<?> form;

	/**
	 * configs
	 */
	private HoneypotBehaviorConfig config = new HoneypotBehaviorConfig();

	/**
	 * Constructor.
	 */
	public HoneypotBehavior() {
	}

	/**
	 * Constructor.
	 * 
	 * @param delayMilliseconds
	 */
	public HoneypotBehavior(int delayMilliseconds) {
		config.setDelay(delayMilliseconds);
	}

	/**
	 * Constructor.
	 * 
	 * @param config
	 */
	public HoneypotBehavior(HoneypotBehaviorConfig config) {
		this.config = config;
	}

	@Override
	public void bind(Component component) {

		if (!(component instanceof Form<?>)) {
			throw new UnsupportedOperationException("Add HoneypotBehavior to Form.");
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
					return;
				}

				// check honeypot field
				StringValue paramValue = postParams.getParameterValue(HONEYPOT_FIELD_NAME);
				if (!paramValue.isEmpty()) {
					// entered by a bot
					onError(form);
					return;
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

		if (config.isDefault()) {
			response.render(JavaScriptHeaderItem.forReference(JS_NO_DELAY_REFERENCE));
		} else {
			// with custom config
			TextTemplateResourceReference jsReference = new TextTemplateResourceReference(HoneypotBehavior.class,
					HoneypotBehavior.class.getSimpleName() + ".js", "text/javascript", Model.ofMap(config.asMap()));
			response.render(JavaScriptHeaderItem.forReference(jsReference));
		}

		response.render(CssReferenceHeaderItem.forReference(CSS_REFERENCE));
	}

	/**
	 * If the name of the honeypot field is missing from the request parameters 
	 * or if it contains any value, an error will occur.
	 * 
	 * @param form
	 */
	protected void onError(Form<?> form) {
		String errorMessage = form.getString("HoneypotBehavior.error", null, "Invalid request.");
		form.error(errorMessage);
	}
}
