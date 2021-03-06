// ==========================================================================
// Project:   SRCHR.SearchItemView
// Copyright: ©2011 jphpsf
// ==========================================================================
/*globals SRCHR */

/** @class

  This is a custom view that extend list item view.

  The goal is to display an icon for each source associated with that search.

  @extends SC.ListItemView
*/
SRCHR.SearchItemView = SC.ListItemView.extend(
/** @scope SRCHR.SearchItemView.prototype */ {

	// The 2 model attributes we want to use in this view
	contentDisplayProperties: 'term sources'.w(),

	render: function(context, firstTime) {

		// This is copied/adapted from the ListItemView
		// TODO: figure out how to render the list item view and add content to it
		// instead of duplicating the code
		var content = this.get('content'),
			del     = this.displayDelegate,
			key, value, working, classArray = [], contentSources, configSources, source, icon;

		// add alternating row classes
		classArray.push((this.get('contentIndex')%2 === 0) ? 'even' : 'odd');
		context.setClass('disabled', !this.get('isEnabled'));

		// Level wrapper
		working = context.begin("div").addClass("sc-outline");

		// Display the term has a label
		value = content.get('term');
		if (value && SC.typeOf(value) !== SC.T_STRING) value = value.toString();
		if (this.get('escapeHTML')) value = SC.RenderContext.escapeHTML(value);
		working.push('<label>', value || '', '</label>') ;

		// Render the source icons
		working = context.begin("div").addClass("has-source-icon");
		contentSources = content.get('sources');
		configSources=SRCHR.sourcesConfig;
		for (source in configSources) {
			if (contentSources[source]) {
				icon=configSources[source].icon;
				working.begin('img').addClass(['source-icon']).attr('src', icon).end();
			}
		}

		// handle action
		/*key = this.getDelegateProperty('listItemActionProperty', del) ;
		value = (key && content) ? (content.get ? content.get(key) : content[key]) : null ;
		if (value) {
			this.renderAction(working, value);
			classArray.push('has-action');
		}*/

		context.addClass(classArray);
		context = working.end();
	}
});
