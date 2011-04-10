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

	// Properties used for value binding with the view
	searchString: null,
	searchOnTwitter: false,
	searchOnYahoo: false,
	searchOnUpcoming: false,
	searchOnFlickr: false,

	// This action handles the user clicking the 'Find it!' button
	findIt: function() {

		var term, search, sources;

		// Retrieve the search term (the searchString property was automatically
		// bound with the text input)
		term=this.get('searchString');

		// Build the sources object
		sources={
			'twitter': this.get('searchOnTwitter'),
			'flickr': this.get('searchOnFlickr'),
			'upcoming': this.get('searchOnUpcoming'),
			'yahoo': this.get('searchOnYahoo')
		};

		// Does the term already exists?
		if (SproutSrchr.Search.storeKeyExists(term)) {

			// The key exists, so retrieve the record to update it
			search = SproutSrchr.store.find(SproutSrchr.Search, term);

			// Update the sources
			search.set('sources', sources);

		} else {

			// Otherwise create a new record
			search = SproutSrchr.store.createRecord(SproutSrchr.Search, {
				'term': term,
				'sources': sources
			});
		}

		// Select new search term (this should trigger the search)
		this.selectObject(search);

		// Start the search
		this.startSearch();

		return YES;
	},

	// This action handles the user double clicking on a recent search
	loadRecent: function() {

		var selected=this.get('selection').get('firstObject');

		// Restore the recent search which just got selected
		this.set('searchString',selected.get('term'));
		this.set('searchOnTwitter',selected.get('sources')['twitter']);
		this.set('searchOnFlickr',selected.get('sources')['flickr']);
		this.set('searchOnUpcoming',selected.get('sources')['upcoming']);
		this.set('searchOnYahoo',selected.get('sources')['yahoo']);

		// Start the search
		this.startSearch();

		return YES;
	},

	// Start a search on the currently selected item
	startSearch: function() {

		// Update the status bar
		var selected=this.get('selection').get('firstObject');
		SproutSrchr.statusController.set('notice',selected.get('statusString'));

		// Start the search
		// TODO
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
