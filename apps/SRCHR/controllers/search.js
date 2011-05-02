// ==========================================================================
// Project:   SRCHR.searchController
// Copyright: ©2011 jphpsf
// ==========================================================================
/*globals SRCHR */

/** @class

  This is very simple controller which handle the search action
  (from search input or from history)

  @extends SC.ArrayController
*/
SRCHR.searchController = SC.ArrayController.create(

	SC.CollectionViewDelegate,
	/** @scope SRCHR.searchController.prototype */ {

	// Properties used for value binding with the view
	searchString: null,
	searchSources: {},

	// Trick: we need to access the searchSources property which is an object
	// with properties. SC can not do a value binding on a property of an object
	// so we use unknownProperty to map a non existing property searchSources_foo
	// to searchSources['foo']
	unknownProperty: function(key, value) {
		if (key.slice(0, 13) === 'searchSources') {
			var source = key.slice(14), sources=this.get('searchSources');
			if (value!==undefined) {
				sources[source]=value;
			}
			return sources[source];
		}
	},

	// This will allow to monitor change on searchSources property
    searchSourcesDidChange: function() {
        var sources=SRCHR.sourcesConfig;
        this.beginPropertyChanges();
		for (source in sources) {
            this.notifyPropertyChange('searchSources_'+source);
        }
        this.endPropertyChanges();
    }.observes('searchSources'),

	// This action handles the user clicking the 'Find it!' button
	findIt: function() {

		var term, search, sources=SRCHR.sourcesConfig, searchSources={};

		// Retrieve the search term (the searchString property was automatically
		// bound with the text input)
		term=this.get('searchString');

		for (source in sources) {
			searchSources[source]=this.get('searchSources_'+source);
		}

		// Does the term already exists?
		if (SRCHR.Search.storeKeyExists(term)) {

			// The key exists, so retrieve the record to update it
			search = SRCHR.store.find(SRCHR.Search, term);

			// We only need to update the sources
			search.set('sources', searchSources);

		} else {

			// Otherwise create a new record
			search = SRCHR.store.createRecord(SRCHR.Search, {
				'term': term,
				'sources': searchSources
			});
		}

		// Select new search term (this should trigger the search)
		this.selectObject(search);

		// Start the search
		this.startSearch();

		return YES;
	},

	// This action handles the user double clicking on a recent search from the history
	loadRecent: function() {

		var selected=this.get('selection').get('firstObject'), sources={};

		// Restore the recent search which just got selected
		this.set('searchString',selected.get('term'));
		var sources=SRCHR.sourcesConfig, searchSources={};
		for (source in sources) {
			searchSources[source]=selected.get('sources')[source];
		}
		this.set('searchSources',searchSources);

		// Start the search
		this.startSearch();

		return YES;
	},

	// Start a search on the currently selected item
	startSearch: function() {

		// Update the status bar
		// TODO: where should that be done?
		var selected=this.get('selection').get('firstObject');
		SRCHR.statusController.set('notice',selected.get('toString'));

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
