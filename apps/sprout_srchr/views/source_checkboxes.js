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
SproutSrchr.SourceCheckboxesView = SC.FormView.extend({
	childViews: 'sources'.w(),

	sources: SC.FormView.row('',SC.View.extend(SC.FlowedLayout, {
		createChildViews: function() {
			// We are going to loop on each source known from SproutSrchr.sourcesConfig
			// (see core.js in root folder)
			var sources=SproutSrchr.sourcesConfig, childViews=[], viewName;
			for (source in sources) {
				viewName=source+'CheckboxView';
				this[viewName]=SC.CheckboxView.design({
					// The width should be 10px per char from the label
					layout: { width: 12*sources[source].label.length, height: 32},
					title: sources[source].label,
					controlSize: SC.SMALL_CONTROL_SIZE,
					valueBinding: 'SproutSrchr.searchController.searchSources_'+source
				})
				childViews.push(this[viewName]);
			};

			this.set('childViews', childViews);

			sc_super();
		}
	}))
});
