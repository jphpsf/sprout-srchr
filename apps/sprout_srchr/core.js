// ==========================================================================
// Project:   SproutSrchr
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SproutSrchr */

/** @namespace

  Sprout-Srchr is a SproutCore app implementing the srchr concept from <a href="https://twitter.com/#!/rmurphey">Rebecca Murphey</a>.

  More info about srchr can be found on <a href="http://blog.rebeccamurphey.com/2010/03/15/srchr-crowdsourcing-javascript-wisdom" target="_blank">Rebecca's blog</a>

  @extends SC.Object
*/
SproutSrchr = SC.Application.create(
	/** @scope SproutSrchr.prototype */ {

	NAMESPACE: 'SproutSrchr',
	VERSION: '0.1.0',

	// This is your application store.  You will use this store to access all
	// of your model data.  You can also set a data source on this store to
	// connect to a backend server.  The default setup below connects the store
	// to any fixtures you define.
	store: SC.Store.create().from(SC.Record.fixtures),

	// This is a configurable list of sources, feel free to add/remove sources
	sourcesConfig: {
		twitter: {
			label: "Twitter",
			icon: static_url('twitter-icon')
		},
		yahoo: {
			label: "Yahoo!",
			icon: static_url('yahoo-icon')
		},
		flickr: {
			label: "Flickr",
			icon: static_url('flickr-icon')
		},
		upcoming: {
			label: "Upcoming",
			icon: static_url('upcoming-icon')
		}
	}
});
