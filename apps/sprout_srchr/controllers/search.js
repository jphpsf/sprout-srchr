// ==========================================================================
// Project:   SproutSrchr.searchController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SproutSrchr */

/** @class

  This is very simple controller which handle the search action
  (from search input or from history)

  @extends SC.ArrayController
*/
SproutSrchr.searchController = SC.ArrayController.create(

	SC.CollectionViewDelegate,
	/** @scope SproutSrchr.searchController.prototype */ {

	searchString: null,

	// This action handles the user clicking the 'Find it!' button
	findIt: function() {

		var term, search;

		// Retrieve the search term (the searchString property was automatically
		// bound with the text input)
		term=this.get('searchString')

		// Does the term already exists?
		if (SproutSrchr.Search.storeKeyExists(term)) {

			// The key exists, so retrieve the record to update it
			search = SproutSrchr.store.find(SproutSrchr.Search, term);

			// Update the sources
			search.set('sources', []);

		} else {

			// Otherwise create a new record
			search = SproutSrchr.store.createRecord(SproutSrchr.Search, {
				'term': term,
				'sources': []
			});

		}

		// Select new search term (this should trigger the search)
		this.selectObject(search);

		// Start the search

		return YES;
	},

	// This handles the delete behavior when the user hits the delete key
	// in the history
	collectionViewDeleteContent: function(view, content, indexes) {

		// destroy the term from the history
		var records = indexes.map(function(idx) {
			return this.objectAt(idx);
		}, this);
		records.invoke('destroy');
		var selIndex = indexes.get('min')-1;
		if (selIndex<0) selIndex = 0;
		this.selectObject(this.objectAt(selIndex));
	}

}) ;
