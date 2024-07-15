// Copyright (c) 2024, abc and contributors
// For license information, please see license.txt

frappe.ui.form.on("custom sales order", {
	refresh(frm) {


	},
    items(frm) {
        console.log(frm.doc);
        for(item in frm.doc.items){
    item.total = item.quantity*item.price
}
    }
});

frappe.ui.form.on("custom items",{
    quantity: function(frm, cdt, cdn) {
        calculate_total_price(frm, cdt, cdn);
    },
    price: function(frm, cdt, cdn) {
        calculate_total_price(frm, cdt, cdn);
    }
})

function calculate_total_price(frm, cdt, cdn) {
    let row = locals[cdt][cdn];
    if (row.quantity && row.price) {
        row.total = row.quantity * row.price;
        frm.refresh_field('items');  // 'items' is the field name for the child table in Sales Order
    }
    
    let total_amount = frm.doc.items.reduce(function(acc, row) {
        return acc + row.total;
    }, 0);
    frm.set_value("total",total_amount)
    frm.refresh_field('total');
}