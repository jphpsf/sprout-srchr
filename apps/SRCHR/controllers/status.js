// ==========================================================================
// Project:   SRCHR.statusController
// Copyright: ©2011 jphpsf
// ==========================================================================
/*globals SRCHR */

/** @class

  This is very simple controller which handle the status bar notices

  @extends SC.ObjectController
*/
SRCHR.statusController = SC.ObjectController.create(
/** @scope SRCHR.statusController.prototype */ {

	// The current status
	status: '',

	// Observe the search controller for changes so that we can update the status
	// if user starts a new search
	searchControllerQueryDidChange: function() {
		var selected=SRCHR.searchController.get('selection').get('firstObject');
		this.set('status',selected.get('toString'));
	}.observes('SRCHR.searchController.searchSources')

});
