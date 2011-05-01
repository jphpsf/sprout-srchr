// ==========================================================================
// Project:   SRCHR.SourceCheckboxes
// Copyright: ©2011 jphpsf
// ==========================================================================
/*globals SRCHR */

/** @class

  This is the source picker: it's a view with a row of checkboxes (1 for each source)

  The checkboxes are generated from the configured sources SRCHR.sourcesConfig (see core.js in root folder)

  @extends SC.FormView
*/
SRCHR.SourceCheckboxesView = SC.FormView.extend({
	childViews: 'sources'.w(),

	sources: SC.FormView.row('',SC.View.extend(SC.FlowedLayout, {
		createChildViews: function() {
			// We are going to loop on each source known from SRCHR.sourcesConfig
			// (see core.js in root folder)
			var sources=SRCHR.sourcesConfig, childViews=[], viewName;
			for (source in sources) {
				viewName=source+'CheckboxView';
				this[viewName]=SC.CheckboxView.design({
					// The width should be 10px per char from the label
					layout: { width: 12*sources[source].label.length, height: 32},
					title: sources[source].label,
					controlSize: SC.SMALL_CONTROL_SIZE,
					valueBinding: 'SRCHR.searchController.searchSources_'+source
				})
				childViews.push(this[viewName]);
			};

			this.set('childViews', childViews);

			sc_super();
		}
	}))
});
