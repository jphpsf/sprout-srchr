// ==========================================================================
// Project:   SRCHR - mainPage
// Copyright: ©2011 jphpsf
// ==========================================================================

// This page describes the main user interface for this application.
SRCHR.mainPage = SC.Page.design({

	// The main pane is made visible on screen as soon as the app is loaded.
	// It contains several child views.
	mainPane: SC.MainPane.design({

		// We have 3 child views:
		// form is the top area where the user types his query
		// search is the results area with history on the left and results on the right
		// status is a status bar for user notices
		childViews: 'form search status'.w(),

		// The form includes the logo on the left and text input + search button
		// and checkboxes to pick sources on the right
		form: SC.View.design({
			layout: { top: 0, left: 0, right: 0, height: 96},
			childViews: 'logo query sourcePicker'.w(),
			anchorLocation: SC.ANCHOR_TOP,

			// This will be the area for the title and/or logo on the left
			logo: SC.View.design({
				layout: { height: 36, left: 30, width: 210, top: 30},
				classNames: ['logo']
			}),

			// This will be the area where the user types a query and hit search
			query: SC.FormView.design({
				layout: { height: 36, left: 210, width: 800, top: 12},
				childViews: 'queryInput'.w(),

				queryInput: SC.FormView.row('', SC.View.design(SC.FlowedLayout, {

					childViews: 'searchBox searchButton'.w(),

					// This is our search text input
					searchBox: SC.TextFieldView.design({
						layout: { width: 410, height: 24 },
						classNames: ['search'],
						value: 'Search term',
						hint: 'Type your search term here and press "Find it!"',
						valueBinding: 'SRCHR.searchController.searchString'
					}),

					// This is the search button which on click will call SRCHR.searchController.findIt
					searchButton: SC.ButtonView.design({
						toolTip: 'Click to search',
						layout: { width: 60, height: 24},
						title: 'Find it!',
						//hasIcon: YES,
						//icon: 'search'
						target: 'SRCHR.searchController',
						action: 'findIt'
					})
				}))
    		}),

			// The list of sources to search from: this is a simple group of checkboxes
			// See the source for SourceCheckboxesView in views/source_checkboxes.js
			sourcePicker: SRCHR.SourceCheckboxesView.design({
				layout: { height: 40, left: 230, width: 800, top: 56}
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
				layout: { left: 20, width: 190, bottom: 20, top: 13 },
				backgroundColor: 'white',
				contentView: SC.ListView.design({
					classNames: [ 'history' ],
					rowHeight: 25,

					// Here we override the default list item rendering and create our own with a custom
					// view SRCHR.SearchItemView (used sc-gen view)
					exampleView: SRCHR.SearchItemView,

					// Bind to the search controller to get the content in
					contentBinding: 'SRCHR.searchController.arrangedObjects',
					selectionBinding: 'SRCHR.searchController.selection',

					// This is a computer property that will display a search term with the
					// associated sources (see model)
					contentValueKey: 'term',

					// This to allow deletion if user press delete key
					canDeleteContent: YES,

					// On double click we need to use the target selection as our current search
					target: 'SRCHR.searchController',
					action: 'loadRecent'
				})
		    }),

			// This is an area that will contain the results for a give search
			// TODO: make this dynamic like the checkboxes
			results: SC.TabView.design({
				layout: { left: 240, right: 20, bottom: 20, top: 0 },
				itemTitleKey: 'tab',
				itemValueKey: 'panel',
				itemIconKey: 'icon',
				value: 'SRCHR.mainPage.mainPane.search.results.noResults',
				items: [
					{ tab: 'Flickr', icon: static_url('flickr-icon'), panel: 'SRCHR.mainPage.mainPane.search.results.flickrResults' },
					{ tab: 'Yahoo!', icon: static_url('yahoo-icon'), panel: 'SRCHR.mainPage.mainPane.search.results.yahooResults' },
					{ tab: 'Upcoming', icon: static_url('upcoming-icon'), panel: 'SRCHR.mainPage.mainPane.search.results.upcomingResults' },
					{ tab: 'Twitter', icon: static_url('twitter-icon'), panel: 'SRCHR.mainPage.mainPane.search.results.twitterResults' }
				],
				tabLocation: SC.TOP_LOCATION,

				noResults: SC.LabelView.design({
					layout: { top: 0, right:0, left: 0, bottom:0 },
					backgroundColor: 'white',
					value: ' No results'
				}),

				yahooResults: SC.LabelView.design({
					layout: { top: 0, right:0, left: 0, bottom:0 },
					backgroundColor: 'white',
					value: ' No results on Yahoo (NOT IMPLEMENTED)'
				}),

				flickrResults: SC.LabelView.design({
					layout: { top: 0, right:0, left: 0, bottom:0 },
					backgroundColor: 'white',
					value: ' No results on Flickr (NOT IMPLEMENTED)'
				}),

				upcomingResults: SC.LabelView.design({
					layout: { top: 0, right:0, left: 0, bottom:0 },
					backgroundColor: 'white',
					value: ' No results on Upcoming (NOT IMPLEMENTED)'
				}),

				twitterResults: SC.LabelView.design({
					layout: { top: 0, right:0, left: 0, bottom:0 },
					backgroundColor: 'white',
					value: ' No results on Twitter (NOT IMPLEMENTED)'
				})
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
				valueBinding: 'SRCHR.statusController.status'
			})
		})
	})
});

