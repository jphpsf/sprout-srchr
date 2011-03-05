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
		childViews: 'formView searchView statusView'.w(),

		formView: SC.View.design({
			layout: { top: 0, left: 0, right: 0, height: 96},
			childViews: 'logoView pickerView queryView checkView'.w(),
			anchorLocation: SC.ANCHOR_TOP,

			logoView: SC.LabelView.design({
				layout: { height: 20, left: 20, width: 200, centerY: 0},
				controlSize: SC.LARGE_CONTROL_SIZE,
				fontWeight: SC.BOLD_WEIGHT,
				value: 'SRCHR'
			}),

			pickerView: SC.FormView.design({
				layout: { height: 20, left: 220, centerX: 0, centerY: 0},
				//childViews: "buttonsView testView".w(),
				childViews: "buttonsView".w(),

				buttonsView: SC.FormView.row(SC.SegmentedView.design({
					allowsEmptySelection: YES,
					allowsMultipleSelection: YES,
					layout: { left: 0, width: 220, height: 24, centerY: 0},
					align: SC.ALIGN_LEFT,
					items: [
						{ title: "Flickr", value: "flickr" },
						{ title: "Yahoo!", value: "yahoo" },
						{ title: "Upcoming", value: "upcoming" },
						{ title: "Twitter", value: "twitter" }
					],
					itemTitleKey: "title", itemValueKey: "value",
					value: null
				})),
			}),

			queryView: SC.FormView.design({
				layout: { height: 20, left: 500, width: 200, centerY: 0},
				childViews: "checkboxView1 checkboxView2".w(),

				checkboxView1: SC.CheckboxView.design({
					layout: { height: 20, left: 500, width: 200, centerY: 0},
					title: "Check 1",
					controlSize: SC.SMALL_CONTROL_SIZE
				}),
				checkboxView2: SC.CheckboxView.design({
					layout: { height: 20, left: 600, width: 200, centerY: 0},
					title: "Check 2",
					controlSize: SC.SMALL_CONTROL_SIZE
				})
    		}),

			checkView: SC.FormView.design({
				layout: { height: 20, left: 700, width: 200, centerY: 0},
				childViews: "checkboxView3 checkboxView4".w(),

				checkboxView3: SC.CheckboxView.design({
					layout: { height: 20, left: 700, width: 200, centerY: 0},
					title: "Check 3",
					controlSize: SC.SMALL_CONTROL_SIZE
				}),
				checkboxView4: SC.CheckboxView.design({
					layout: { height: 20, left: 800, width: 200, centerY: 0},
					title: "Check 4",
					controlSize: SC.SMALL_CONTROL_SIZE
				})
    		})
		}),

		searchView: SC.View.design({
			layout: { top: 97, left: 0, right: 0, height: 600},
			childViews: 'recentsView resultsView'.w(),

			recentsView: SC.ScrollView.design({
				hasHorizontalScroller: NO,
				// Added this to get the borders, got the idea from the SC.TabView, is
				// it the right way to do it?
				renderDelegateName: 'wellRenderDelegate',
				layout: { left: 20, width: 160, height: 485, top: 13 },
				backgroundColor: 'white',
				contentView: SC.ListView.design({

				})
		    }),

			resultsView: SC.TabView.design({
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

		statusView: SC.ToolbarView.design({
			layout: { bottom: 0, left: 0, right: 0, height: 36 },
			childViews: 'statusView'.w(),
			anchorLocation: SC.ANCHOR_BOTTOM,

			statusView: SC.LabelView.design({
				layout: { centerY: 0, right:10, left: 10, height:20 },
				fontWeight: SC.BOLD_WEIGHT,
				value: 'Status...'
			}),
		}),
	})
});
