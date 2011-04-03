// ==========================================================================
// Project:   SproutSrchr - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================

/*globals SproutSrchr Forms*/

// This page describes the main user interface for your application.
SproutSrchr.mainPage = SC.Page.design({

	// The main pane is made visible on screen as soon as your app is loaded.
	// Add childViews to this pane for views to display immediately on page
	// load.
	mainPane: SC.MainPane.design({

		// form is the top area where the user types his query
		// search is the results area with history on the left and results on the right
		// status is a status bar for user notices
		childViews: 'form search status'.w(),

		// The form should include the logo on the left and text input + search
		// button and checkboxes to pick sources
		form: SC.View.design({
			layout: { top: 0, left: 0, right: 0, height: 96},
			childViews: 'logo query sourcePicker'.w(),
			anchorLocation: SC.ANCHOR_TOP,

			// This will be the area for the title and/or logo
			logo: SC.View.design({
				layout: { height: 72, left: 10, width: 200, centerY: 0},
				classNames: ['logo'],
			}),

			// This will be the area where the user types a query and hit search
			query: SC.FormView.design({
				layout: { height: 36, left: 200, width: 800, top: 12},
				childViews: 'queryInput'.w(),

				queryInput: SC.FormView.row('', SC.View.design(SC.FlowedLayout, {

					childViews: 'searchBox searchButton'.w(),

					// This is our search text input
					searchBox: SC.TextFieldView.design({
						layout: { width: 410, height: 24 },
						classNames: ['search'],
						value: 'Search term',
						hint: 'Type your search term here and press "Find it!"',
						valueBinding: 'SproutSrchr.searchController.searchString'
					}),

					// This is the search button which on click will call SproutSrchr.searchController.findIt
					searchButton: SC.ButtonView.design({
						toolTip: 'Click to search',
						layout: { width: 60, height: 24},
						title: 'Find it!',
						//hasIcon: YES,
						//icon: 'search'
						target: 'SproutSrchr.searchController',
						action: 'findIt'
					})
				}))
    		}),

			// The list of sources to search from: this is a simple group of checkboxes
			sourcePicker: SC.FormView.design({
				layout: { height: 40, left: 220, width: 800, top: 56},
				childViews: 'sources'.w(),

				sources: SC.FormView.row('',
					SC.View.design(SC.FlowedLayout, {
					childViews: 'twitterCheckbox flickrCheckbox yahooCheckbox upcomingCheckbox'.w(),
					twitterCheckbox: SC.CheckboxView.design({
						layout: { width: 70, height: 32},
						title: 'Twitter',
						controlSize: SC.SMALL_CONTROL_SIZE,
						valueBinding: 'SproutSrchr.searchController.searchOnTwitter'
					}),
					flickrCheckbox: SC.CheckboxView.design({
						layout: { width: 60, height: 32},
						title: 'Flickr',
						controlSize: SC.SMALL_CONTROL_SIZE,
						valueBinding: 'SproutSrchr.searchController.searchOnFlickr'
					}),
					yahooCheckbox: SC.CheckboxView.design({
						layout: { width: 110, height: 32},
						title: 'Yahoo! search',
						controlSize: SC.SMALL_CONTROL_SIZE,
						valueBinding: 'SproutSrchr.searchController.searchOnYahoo'
					}),
					upcomingCheckbox: SC.CheckboxView.design({
						layout: { width: 120, height: 32},
						title: 'Upcoming events',
						controlSize: SC.SMALL_CONTROL_SIZE,
						valueBinding: 'SproutSrchr.searchController.searchOnUpcoming'
					})
				}))
			})
   		}),

		// This is the area of the app where we display recent searches on the left
		// and results on the right
		search: SC.View.design({
			layout: { top: 97, left: 0, right: 0, bottom: 36},
			childViews: 'recents results'.w(),

			// This is a simple list of recent searches
			recents: SC.ScrollView.design({
				hasHorizontalScroller: NO,
				// Added this to get the borders, got the idea from the SC.TabView, is
				// it the right way to do it?
				renderDelegateName: 'wellRenderDelegate',
				layout: { left: 20, width: 160, bottom: 20, top: 13 },
				backgroundColor: 'white',
				contentView: SC.ListView.design({
					classNames: [ 'history' ],
					rowHeight: 25,

					// Bind to the search controller to get the content in
					contentBinding: 'SproutSrchr.searchController.arrangedObjects',
					selectionBinding: 'SproutSrchr.searchController.selection',

					// This is a computer property that will display a search term with the
					// associated sources (see model)
					contentValueKey: 'shortString',

					// This to allow deletion if user press delete key
					canDeleteContent: YES,

					// On double click we need to use the target selection as our current search
					target: 'SproutSrchr.searchController',
					action: 'loadRecent'
				})
		    }),

			// This is an area that will contain the results for a give search
			results: SC.TabView.design({
				layout: { left: 220, right: 20, bottom: 20, top: 0 },
				items: [ 'Flickr', 'Yahoo!', 'Upcoming', 'Twitter' ],
				tabLocation: SC.TOP_LOCATION,
				contentView: SC.ScrollView.design({
					hasHorizontalScroller: NO,
					//layout: { left: 220, width: 460, bottom: 400, top: 13 },
					backgroundColor: 'red',
					contentView: SC.ListView.design({
					})
				}),
			})
		}),

		// This is a status bar in which we'll show notices to the user
		status: SC.ToolbarView.design({
			layout: { bottom: 0, left: 0, right: 0, height: 36 },
			childViews: 'status'.w(),
			anchorLocation: SC.ANCHOR_BOTTOM,

			status: SC.LabelView.design({
				layout: { centerY: 0, right:10, left: 10, height:20 },
				fontWeight: SC.BOLD_WEIGHT,
				valueBinding: 'SproutSrchr.statusController.notice'
			}),
		}),
	})
});
