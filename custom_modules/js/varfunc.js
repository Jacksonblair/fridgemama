var obj = {

	/* Two basic useful functions */
	truthy: function (x) {
		return (x !== false) && obj.existy(x)
	},

	existy: function(x) {
		return x != null
	},

	/* A way to abstract errors, warning and notes away. So they can be modified individually. */

	fail: function(thing) {
		throw new Error(thing);
	},

	warn: function(thing) {
		console.log(`WARNING: ${thing}`)
	},

	note: function(thing) {
		console.log(`NOTE: ${thing}`)
	}

}

module.exports = obj;