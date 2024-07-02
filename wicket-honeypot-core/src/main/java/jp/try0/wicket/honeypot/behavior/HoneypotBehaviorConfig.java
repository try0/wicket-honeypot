package jp.try0.wicket.honeypot.behavior;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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

	private int delay = 0;

	private String autocomplete = "one-time-code";

	private boolean blockSubmit = false;

	/**
	 * Constructor
	 */
	public HoneypotBehaviorConfig() {
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

		this.delay = delayMillisecond;
	}

	/**
	 * Sets the autocomplete attribute value of honeypot field.
	 * 
	 * @param autocomplete
	 */
	public void setAutocomplete(String autocomplete) {
		this.autocomplete = autocomplete;
	}

	/**
	 * Sets whether to block submits on the client.
	 * 
	 * @param blockSubmit
	 */
	public void setBlockSubmit(boolean blockSubmit) {
		this.blockSubmit = blockSubmit;
	}

	/**
	 * Gets config values as Map.
	 * 
	 * @return
	 */
	public Map<String, Object> asMap() {
		Map<String, Object> variables = new HashMap<>();
		variables.put(VAR_AUTOCOMPLETE, autocomplete == null ? "" : autocomplete);
		variables.put(VAR_DELAY, delay);
		variables.put(VAR_BLOCK_SUBMIT, blockSubmit ? "true" : "false");
		return variables;
	}

	/**
	 * Determines whether this setting is the default.
	 * 
	 * @return
	 */
	public boolean isDefault() {
		if (delay != 0) {
			return false;
		}

		if (!"one-time-code".equals(autocomplete)) {
			return false;
		}

		if (!blockSubmit) {
			return false;
		}

		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}

		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		HoneypotBehaviorConfig that = (HoneypotBehaviorConfig) o;
		return delay == that.delay &&
				blockSubmit == that.blockSubmit &&
				Objects.equals(autocomplete, that.autocomplete);
	}

	@Override
	public int hashCode() {
		return Objects.hash(delay, autocomplete, blockSubmit);
	}
}
