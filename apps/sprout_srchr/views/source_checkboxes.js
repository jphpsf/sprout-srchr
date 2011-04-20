// ==========================================================================
// Project:   SproutSrchr.SourceCheckboxes
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SproutSrchr */

/** @class

  This is the source picker: it's a view with a row of checkboxes (1 for each source)

  The checkboxes are generated from the configured sources SproutSrchr.sourcesConfig (see core.js in root folder)

  @extends SC.FormView
*/
SproutSrchr.SourceCheckboxesView = SC.FormView.extend(
/** @scope SproutSrchr.SourceCheckboxesView.prototype */ {

	init: function() {

		// Generate the childviews
		this.set('childViews', this.buildChildViews());

		// Go back to the regular workflow
		sc_super();
	},

	buildChildViews: function() {

		// We are going to loop on each source known from SproutSrchr.sourcesConfig
		// (see core.js in root folder)
		var sources=SproutSrchr.sourcesConfig, checkboxes=[];
		for (source in sources) {
			checkboxes.push(
				SC.CheckboxView.extend({
					// The width should be 10px per char from the label
					layout: { width: 10*sources[source].label.length, height: 32},
					title: sources[source].label,
					controlSize: SC.SMALL_CONTROL_SIZE,
					valueBinding: 'SproutSrchr.searchController.searchOnTwitter' // TODO: update this
				})
			)
		};

		// Wrap the checkboxes in a FormView row with a flowed layout
		var childViews=[
			SC.FormView.row('',
				SC.View.extend(SC.FlowedLayout, {
					childViews: checkboxes
				})
			)
		];

		return childViews;
	}
});
