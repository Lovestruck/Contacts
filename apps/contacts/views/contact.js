// ==========================================================================
// Project:   Contacts.ContactView
// Copyright: ©2009 Alex Iskander and TPSi
// ==========================================================================
/*globals Contacts Forms */

/** @class

(Document Your View Here)

@extends SC.View
*/

SC.Animatable.defaultTimingFunction = SC.Animatable.TRANSITION_EASE_IN_OUT;

Contacts.ContactView = SC.View.extend(
/** @scope Contacts.ContactView.prototype */ {
	layout: {left:0, right:0},
	classNames: ["contact-view"],
	childViews: ["form"],
	backgroundColor: "white",
	contentBindingDefault: SC.Binding.single(),
	layoutDidChangeFor: function(what) {
		sc_super();
		if (this.get("form") && !this.get("form").isClass) this.adjust("minHeight", this.getPath("form.layout").minHeight + 40);
	},
	form: Forms.FormView.design(Forms.FormAnimation, {
		editsByDefault: NO,
		layout: { left: 20, top: 20, right: 20, bottom: 20 },
		contentBinding: ".parentView.content",
		fields: "name refer active company salesperson relationship address csz phone email".w(),

		name: Forms.FormView.row({
			fields: 'firstName lastName'.w(),
			fieldLabel: NO,
			// and I kinda should test fieldLabel: NO
			firstName: Forms.FormView.field(SC.TextFieldView, { stealsFocus: YES, hint: "first", classNames: ["name"], layout: { height: 35, width: 200 } }),
			lastName: Forms.FormView.field(SC.TextFieldView, { hint: "last", classNames: ["name"], layout: { height: 35, width: 200 } }),

			autoHide: YES
		}),
	  
	  refer: Forms.FormView.row(SC.TextFieldView, {
	    hint: "refer to as",
	    fieldKey: "addressAs",
	    fieldLabel: NO,
	    
	    autoHide: YES
	  }),

		company: Forms.FormView.row(SC.TextFieldView, {
			hint: "company",
			fieldKey: "company",
			fieldLabel: "company",

			autoHide: YES
		}),
		
		salesperson: Forms.FormView.row(SC.TextFieldView, {
			hint: "salesperson",
			fieldKey: "salesperson",
			fieldLabel: "salesperson",

			autoHide: YES
		}),

		address: Forms.FormView.row(SC.TextFieldView, {
			fieldLabel: "address", // because it insists on capitalizing
			fieldKey: "address", // redundant
			hint: "address",
			isTextArea: YES,
			layout: { width: 300, height: 100 },

			autoHide: YES
		}),

		csz: Forms.FormView.row({
			fields: 'city state zip'.w(),
			fieldLabel: "",

			// and I kinda should test fieldLabel: NO
			city: Forms.FormView.field(SC.TextFieldView, { hint: "city", classNames: ["csz"], layout: { height: 35, width: 200 } }),
			state: Forms.FormView.field(SC.TextFieldView, { hint: "state", classNames: ["csz"], layout: { height: 35, width: 200 } }),
			zip: Forms.FormView.field(SC.TextFieldView, { hint: "zip", classNames: ["csz"], layout: { height: 35, width: 200 } }),

			autoHide: YES
		}),

		phone: Forms.FormView.row(SC.TextFieldView, {
			hint: "phone",
			fieldKey: "phone",
			fieldLabel: "phone",

			autoHide: YES
		}),

		email: Forms.FormView.row(SC.TextFieldView, {
			hint: "email",
			fieldKey: "email",
			fieldLabel: "email",

			autoHide: YES
		}),

		active: Forms.FormView.row(SC.CheckboxView, {
			title: "Active",
			fieldLabel: NO,
			fieldKey: "active",

			emptyValues: [YES],
			autoHide: YES,
			value: YES
		}),

		relationship: Forms.FormView.row(SC.RadioView, {
			items: [ 
			{ value: "customer", title: "Customer" },
			{ value: "former-customer", title: "Former Customer" },
			{ value: "friend", title: "Friend" },
			{ value: "enemy", title: "Enemy" }
			],
			itemValueKey: "value",
			itemTitleKey: "title",
			fieldKey: "relationship",
			fieldLabel: "relationship",
			autoHide: YES
		}),

		/* This stuff goes at the end because it is entirely to test animation. So there. */
		index: 0
	})
});
