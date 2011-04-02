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

		// formView is the top area where the user types his query
		// searchView is the results area with history on the left and results on the right
		// statusView is a status bar for user notices
		childViews: 'form search status'.w(),

		// the formView should include the logo on the left and text input + search
		// button and checkboxes to pick sources
		form: SC.View.design({
			layout: { top: 0, left: 0, right: 0, height: 96},
			childViews: 'logo query sourcePicker'.w(),
			anchorLocation: SC.ANCHOR_TOP,

			// this will be the area for the title and/or logo
			logo: SC.View.design({
				layout: { height: 72, left: 30, width: 200, centerY: 0},
				classNames: ["logo"],
			}),

			// this will be the area where the user types a query and hit search
			query: SC.FormView.design({
				layout: { height: 36, left: 200, width: 800, top: 12},
				childViews: "queryInput".w(),

				queryInput: SC.FormView.row("", SC.View.design(SC.FlowedLayout, {

					childViews: "textInput searchButton".w(),

					textInput: SC.TextFieldView.design({
						layout: { width: 410, height: 24 },
						classNames: ['search'],
						value: "Search term"
						//valueBinding: '...' // TODO: bind for history restor
					}),

					searchButton: SC.ButtonView.design({
						//toolTip: "_Project".loc(),
						layout: { width: 60, height: 24},
						title: "Find it!",
						//titleMinWidth: 37,
						//hasIcon: YES,
						//icon: 'search'
						//action: 'openProjectPicker'
					  })
				}))
    		}),

			// the list of sources to search from: this is a simple group of checkboxes
			sourcePicker: SC.FormView.design({
				layout: { height: 40, left: 220, width: 800, top: 56},
				childViews: "sources".w(),

				sources: SC.FormView.row("",
					SC.View.design(SC.FlowedLayout, {
					childViews: "twitterCheckbox flickrCheckbox yahooCheckbox upcomingCheckbox".w(),
					twitterCheckbox: SC.CheckboxView.design({
						layout: { width: 70, height: 32},
						title: "Twitter",
						controlSize: SC.SMALL_CONTROL_SIZE
					}),
					flickrCheckbox: SC.CheckboxView.design({
						layout: { width: 60, height: 32},
						title: "Flickr",
						controlSize: SC.SMALL_CONTROL_SIZE
					}),
					yahooCheckbox: SC.CheckboxView.design({
						layout: { width: 110, height: 32},
						title: "Yahoo! search",
						controlSize: SC.SMALL_CONTROL_SIZE
					}),
					upcomingCheckbox: SC.CheckboxView.design({
						layout: { width: 120, height: 32},
						title: "Upcoming events",
						controlSize: SC.SMALL_CONTROL_SIZE
					})
				}))
			})
   		}),

		// this is the area of the app where we display recent searches on the left
		// and results on the right
		search: SC.View.design({
			layout: { top: 97, left: 0, right: 0, height: 600},
			childViews: 'recents results'.w(),

			// this is a simple list of recent searches
			recents: SC.ScrollView.design({
				hasHorizontalScroller: NO,
				// Added this to get the borders, got the idea from the SC.TabView, is
				// it the right way to do it?
				renderDelegateName: 'wellRenderDelegate',
				layout: { left: 20, width: 160, height: 485, top: 13 },
				backgroundColor: 'white',
				contentView: SC.ListView.design({

				})
		    }),

			// this is an area that will contain the results for a give search
			results: SC.TabView.design({
				layout: { left: 220, width: 800, height: 500, top: 0 },
				items: [ "Flickr", "Yahoo!", "Upcoming", "Twitter" ],
				tabLocation: SC.TOP_LOCATION,
				contentView: SC.ScrollView.design({
					hasHorizontalScroller: NO,
					layout: { left: 220, width: 460, height: 400, top: 13 },
					backgroundColor: 'red',
					contentView: SC.ListView.design({
					})
				}),
			})
		}),

		status: SC.ToolbarView.design({
			layout: { bottom: 0, left: 0, right: 0, height: 36 },
			childViews: 'status'.w(),
			anchorLocation: SC.ANCHOR_BOTTOM,

			status: SC.LabelView.design({
				layout: { centerY: 0, right:10, left: 10, height:20 },
				fontWeight: SC.BOLD_WEIGHT,
				value: 'Status...'
			}),
		}),
	})
});
