package jp.try0.wicket.honeypot.behavior;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * {@link HoneypotBehavior}'s config.
 */
public class HoneypotBehaviorConfig implements Serializable {

	/**
	 * Js Template variable key of delay.
	 */
	public static final String VAR_DELAY = "delay";
	/**
	 * Js Template variable key of autocomplete.
	 */
	public static final String VAR_AUTOCOMPLETE = "autocomplete";
	/**
	 * Js Template variable key of isBlockSubmit.
	 */
	public static final String VAR_BLOCK_SUBMIT = "isBlockSubmit";

	/**
	 * config values
	 */
	private Map<String, Object> variables = new HashMap<>();

	/**
	 * Constructor
	 */
	public HoneypotBehaviorConfig() {
		// default values
		setDelay(0);
		setAutocomplete("one-time-code");
		setBlockSubmit(false);
	}

	/**
	 * Sets the delay ms of the field addition process.
	 * 
	 * @param delayMilleseconds
	 */
	public void setDelay(int delayMillisecond) {
		if (delayMillisecond < 0) {
			delayMillisecond = 0;
		}

		variables.put(VAR_DELAY, String.valueOf(delayMillisecond));
	}

	/**
	 * Sets the autocomplete attribute value of honeypot field.
	 * 
	 * @param autocomplete
	 */
	public void setAutocomplete(String autocomplete) {
		if (autocomplete == null || autocomplete.isEmpty()) {
			variables.put(VAR_AUTOCOMPLETE, "");
			return;
		}

		variables.put(VAR_AUTOCOMPLETE, autocomplete);
	}

	/**
	 * Sets whether to block submits on the client.
	 * 
	 * @param blockSubmit
	 */
	public void setBlockSubmit(boolean blockSubmit) {
		variables.put(VAR_BLOCK_SUBMIT, blockSubmit ? "true" : "false");
	}

	/**
	 * Gets config values as Map.
	 * 
	 * @return
	 */
	public Map<String, Object> asMap() {
		return new HashMap<String, Object>(variables);
	}

	/**
	 * Determines whether this setting is the default.
	 * 
	 * @return
	 */
	public boolean isDefault() {
		if (!variables.get(VAR_DELAY).equals("0")) {
			return false;
		}

		if (!variables.get(VAR_AUTOCOMPLETE).equals("one-time-code")) {
			return false;
		}

		if (!variables.get(VAR_BLOCK_SUBMIT).equals("false")) {
			return false;
		}

		return true;
	}
}
