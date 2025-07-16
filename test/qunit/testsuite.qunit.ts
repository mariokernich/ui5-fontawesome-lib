export default {
	name: "QUnit TestSuite for fontawesome.icons.library",
	defaults: {
		ui5: {
			libs: ["sap.ui.core", "fontawesome.icons.library"],
			theme: "sap_horizon"
		},
		qunit: {
			version: 2,
			reorder: false
		},
		sinon: {
			version: 4,
			qunitBridge: true,
			useFakeTimers: false
		}
	},
	tests: {
		// test file for the Example control
		Example: {
			title: "QUnit Test for Example",
			_alternativeTitle: "QUnit tests: fontawesome.icons.library.Example"
		}
	}
};
