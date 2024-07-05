import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import jp.try0.wicket.honeypot.behavior.HoneypotBehaviorConfig;

public class HoneypotBehaviorConfigTest {

	@Test
	public void defaultConfig() {
		HoneypotBehaviorConfig config = new HoneypotBehaviorConfig();
		Assertions.assertTrue(config.isDefault());
	}

	@Test
	void testEquals() {

		HoneypotBehaviorConfig configA = new HoneypotBehaviorConfig();
		HoneypotBehaviorConfig configB = new HoneypotBehaviorConfig();

		Assertions.assertEquals(configA, configB);

		configA.setAutocomplete("password");
		configB.setAutocomplete("password");
		Assertions.assertEquals(configA, configB);

		configA.setBlockSubmit(true);
		configB.setBlockSubmit(true);
		Assertions.assertEquals(configA, configB);

		configA.setDelay(999);
		configB.setDelay(999);
		Assertions.assertEquals(configA, configB);

		configA.setDetectHumanActivity(true);
		configB.setDetectHumanActivity(true);
		Assertions.assertEquals(configA, configB);

	}

}
