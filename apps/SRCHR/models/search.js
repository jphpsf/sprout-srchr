// ==========================================================================
// Project:   SRCHR.Search
// Copyright: ©2011 jphpsf
// ==========================================================================
/*globals SRCHR */

/** @class

  This model represent searches (a search term + sources flags)

  The search term is just a string

  The sources flag is an object (see example below)

  @extends SC.Record
  @version 0.1
*/
SRCHR.Search = SC.Record.extend(
/** @scope SRCHR.Search.prototype */ {

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
	// in a "human readable" way
	toString: function() {
		var sources=SRCHR.sourcesConfig, source, checked=[], last='';
		for (source in sources) {
			if (this.get('sources')[source]) {
				checked.push(sources[source].label);
			}
		}
		if (checked.length>1) {
			last=' and '+checked.pop();
		}
		return 'Searching "'+this.get('term')+'" on '+checked.join(', ')+last;
	}.property('term', 'sources').cacheable()

}) ;
