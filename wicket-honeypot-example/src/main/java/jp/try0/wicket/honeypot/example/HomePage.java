package jp.try0.wicket.honeypot.example;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.PasswordTextField;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import jp.try0.wicket.honeypot.behavior.HoneypotBehavior;

public class HomePage extends WebPage {
	private static final long serialVersionUID = 1L;

	private IModel<String> account = new Model<>();
	private IModel<String> pass = new Model<>();

	public HomePage(final PageParameters parameters) {
		super(parameters);

		// TODO Add your page's components here

		add(new FeedbackPanel("messages"));
		add(new Form<Void>("form") {

			{
				add(new HoneypotBehavior());

				add(new TextField<String>("account", account));
				add(new PasswordTextField("pass", pass));

				add(new Button("btnLogin") {

					@Override
					public void onSubmit() {
						super.onSubmit();
					}
				});
			}
		});

	}
}
