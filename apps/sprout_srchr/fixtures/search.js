// ==========================================================================
// Project:   SproutSrchr.Search Fixtures
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SproutSrchr */

sc_require('models/search');

SproutSrchr.Search.FIXTURES = [

	{
		'term': 'Sproutcore',
		'sources': {
			'twitter': true,
			'flickr': true,
			'upcoming': false,
			'yahoo': false
		}
	},

	{
		'term': 'Javascript',
		'sources': {
			'twitter': true,
			'flickr': true,
			'upcoming': true,
			'yahoo': true
		}
	},

	{
		'term': 'jQuery',
		'sources': {
			'twitter': false,
			'flickr': false,
			'upcoming': false,
			'yahoo': true
		}
	},

	{
		'term': 'Ruby on Rails',
		'sources': {
			'twitter': false,
			'flickr': false,
			'upcoming': true,
			'yahoo': false
		}
	},

];
