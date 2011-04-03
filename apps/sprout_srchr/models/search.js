// ==========================================================================
// Project:   SproutSrchr.Search
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SproutSrchr */

/** @class

  This models represent searches (term + sources)

  @extends SC.Record
  @version 0.1
*/
SproutSrchr.Search = SC.Record.extend(
/** @scope SproutSrchr.Search.prototype */ {

	// We want to use the search term as the primary key so that we
	// can easily lookup a term in the history
	primaryKey: 'term',

	// This is the search term from the text box
	term: SC.Record.attr(String),

	// An object in which we'll store the selected sources, a boolean for
	// each sources, example:
	// 	'sources': {
	//		'twitter': true,
	//		'flickr': true,
	//		'upcoming': true,
	//		'yahoo': true
	//	}
	sources: SC.Record.attr(Object),

	// This is computed property used to display a search term with its selected sources
	// (Example: "Foo Bar (Y,F)" for searching "Foo Bar" on Yahoo and Flickr
	toString: function() {

		var sources=['twitter','yahoo','flickr','upcoming'], checked=[];

		for (var i=sources.length; i--; i>=0) {
			if (this.get('sources')[sources[i]]) {
				checked.push(sources[i][0].toUpperCase());
			}

		}

		return this.get('term')+' ('+checked.join(',')+')';

	}.property('term', 'sources').cacheable()

}) ;
