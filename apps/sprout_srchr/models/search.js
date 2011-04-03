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

	// An array of all the sources
	sources: SC.Record.attr(Array)

}) ;
