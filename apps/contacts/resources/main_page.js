// ==========================================================================
// Project:   Contacts - mainPage
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals Contacts Animate */
require("views/contact");

// This page describes the main user interface for your application.  
Contacts.mainPage = SC.Page.design({

	// The main pane is made visible on screen as soon as your app is loaded.
	// Add childViews to this pane for views to display immediately on page 
	// load.
	mainPane: SC.MainPane.design({
		childViews: 'toolbar splitter'.w(),
		toolbar: SC.ToolbarView.design({
			classNames: ["toolbar"],
			layout: { left: 0, top: 0, right: 0, height: 32 },
			childViews: "demo search".w(),
			
			demo: SC.LabelView.design({
				layout: {centerY: 0, left: 10, height: 18, right: 10},
				value: "Note: Demo mode is ON. Animations are slow (but hopefully smooth) for effect. :)"
			}),
			
			search: SC.TextFieldView.design({
			  layout: { right: 10, width: 300, height: 20, centerY: 0 },
			  classNames: ["searchBox"],
			  hint: "Search...",
			  leftAccessoryView: SC.View.create({
			      layout: {left:5, width:20, height:16, centerY: 0 },
			      childViews: 'icon'.w(),
			      icon: SC.ImageView.create({
			        layout: {left:0, top: 0, width:16, height: 16 },
			        value: "icons search-16 icon"
		        })
			  })
			})
		}),
		
		// splitter between contact chooser and contact view.
		splitter: SC.SplitView.design({
			layout: { left: 0, top: 32, right: 0, bottom: 0 },
			defaultThickness: 200,
			dividerThickness: 1,
			// companies
			topLeftView: SC.View.design({
				childViews: "allGroup groupList toolbar".w(),
				classNames: "groups".w(),
				
				allGroup: SC.View.design({
				  childViews: "label separator".w(),
				  layout: { left: 0, right: 0, top: 0, height: 32 },
				  
				  selectedBinding: "Contacts.groupsController.allIsSelected",
				  displayProperties: ["selected"],
				  render: function(context){
				    sc_super();
				    if (this.get("selected")) context.addClass("selected");
				  },
				  
				  click: function() {
				    Contacts.groupsController.selectAllGroup();
				    return YES;
				  },
				  
				  label: SC.LabelView.design({
				    layout: { height: 18, centerY: 0, left: 10, right: 10 },
				    value: "All",
				    fontWeight: SC.FONT_BOLD
				  }),
				  separator: SC.SeparatorView.design({
				    layoutDirection: SC.LAYOUT_HORIZONTAL, 
				    layout: { bottom:0, left:0, right:0, height: 1} 
				  })
				}),
				
				groupList: SC.ScrollView.design({
					layout: { left:0, right:0, top: 32, bottom:32},
					borderStyle: SC.BORDER_NONE,
					hasHorizontalScroller: NO,
					contentView: SC.ListView.design({
						contentBinding: "Contacts.groupsController.arrangedObjects",
						selectionBinding: "Contacts.groupsController.selection",
						delegate: Contacts.groupDropController,
						contentValueKey: "name",
						canEditContent: YES,
						canDeleteContent: YES,
						rowHeight:24,
						exampleView: SC.View.design({
							childViews: "label".w(),
							label: SC.LabelView.design({
								layout: {left:10, right:10, height:18,centerY:0},
								contentBinding: ".parentView.content",
								contentValueKey: "name",
								isEditable: YES,
								fontWeight: SC.FONT_WEIGHT_BOLD,
								inlineEditorDidEndEditing: function(){ 
									sc_super();
									Contacts.store.commitRecords();
								}
							}),
							
							beginEditing: function(){ this.label.beginEditing(); },
							
							isDropTarget: YES,							
							computeDragOperations: function(drag, evt) {
								return Contacts.groupsController.computeDragOperations(this.get("content"), drag);
							},
							
							performDragOperation: function(drag, evt) {
								console.error("HI");
								return Contacts.groupsController.performDragOperations(this.get("content"), drag);
							},
							
							dragEntered: function(){
								this.$().addClass("drag-potential");
							},
							
							dragExited: function(drag, evt) {
								this.$().removeClass("drag-potential");
							},
							
							acceptDragOperation: function() { return YES; },
							
							isSelected: NO,
							isSelectedDidChange: function()
							{
								this.displayDidChange();
							}.observes("isSelected"),
							render: function(context) {
								sc_super();
								if (this.contentIndex % 2 === 0) context.addClass("even");
								else context.addClass("odd");
								if (this.get("isSelected")) context.addClass("selected");
							}
						})
					})
				}), // scroll view
				toolbar: SC.ToolbarView.design({
					classNames: "toolbar".w(),
					layout: { left: 0, bottom: 0, right: 0, height: 32 },
					childViews: "add remove".w(),
					add: SC.ButtonView.design({
						layout: { left: 0, top: 0, bottom: 0, width:32 },
						title: "+",
						target: "Contacts.groupsController",
						action: "addGroup"
					}),
					remove: SC.ButtonView.design({
						layout: { left: 32, top: 0, bottom: 0, width:32 },
						title: "-"
					})
				})
			}),
			
			// another splitter between companies and contacts
			bottomRightView: SC.SplitView.design({
				defaultThickness: 200,
				dividerThickness: 1,
				topLeftView: SC.View.design({
					childViews: "toolbar contacts".w(),
					toolbar: SC.ToolbarView.design({
						classNames: "toolbar".w(),
						layout: { left: 0, bottom: 0, right: 0, height: 32 },
						childViews: "add remove".w(),
						add: SC.ButtonView.design({
							layout: { left: 0, top: 0, bottom: 0, width:32 },
							title: "+",
							target: "Contacts.contactsController",
							action: "addContact"
						}),
						remove: SC.ButtonView.design({
							layout: { left: 32, top: 0, bottom: 0, width:32 },
							title: "-"
						})
					}),
					contacts: SC.ScrollView.design({
						layout: { left:0, right:0, top:0, bottom:32},
						borderStyle: SC.BORDER_NONE,
						contentView: SC.ListView.design({
							contentBinding: "Contacts.contactsController.arrangedObjects",
							selectionBinding: "Contacts.contactsController.selection",
							contentValueKey: "fullName",

							delegate: Contacts.contactController,
							canReorderContent: YES,
							isDropTarget: YES,
							canDeleteContent: YES
						})
					})
				}),
				
				// contact view
				bottomRightView: SC.View.design({
					backgroundColor: "#555",
					childViews: 'contactView toolbar'.w(),
					contactView: SC.ScrollView.design({
						classNames: ["contact-panel"],
						layout: { left: 15, right: 15, bottom: 47, top: 15 },
						borderStyle: SC.BORDER_NONE,
					  	contentView: Contacts.ContactView.design({
						  contentBinding: "Contacts.contactController"
					  })
					}),
					
					toolbar: SC.ToolbarView.design({
						layout: { left:0, right:0, bottom:0, height:32 },
						classNames: "toolbar".w(),
						childViews: "edit save".w(),
						edit: SC.ButtonView.design(SC.Animatable, {
							transitions: {
								opacity: 0.25
							},
							title: "Edit",
							layout: { left: 0, top: 0, bottom: 0, width: 90 },
							target: Contacts.contactController,
							action: "beginEditing",
							style: { opacity: 1 }
						}),
						save: SC.ButtonView.design(SC.Animatable, {
							transitions: { opacity: 0.25 },
							title: "Save",
							layout: { left: 0, top:0, bottom: 0, width: 90 },
							target: Contacts.contactController,
							action: "endEditing",
							style: {
								opacity: 0, display: "none"
							}
						}),
						
						controllerIsEditing: NO,
						controllerIsEditingBinding: "Contacts.contactController.isEditing",
						controllerIsEditingDidChange: function()
						{
							var save = this.get("save");
							var edit = this.get("edit");
							
							
							if (save.isClass) return;
							
							if (this.get("controllerIsEditing"))
							{
								save.adjust({
									opacity: 1, display: "block"
								}).updateLayout();
								edit.adjust({
									opacity: 1, display: "none"
								}).updateLayout();
							}
							else
							{
								edit.adjust({
									opacity: 1, display: "block"
								}).updateLayout();
								save.adjust({
									opacity: 1, display: "none"
								}).updateLayout();
							}
						}.observes("controllerIsEditing")
					})
				})
			})
			
		})
	})

});
