import frappe

def send_mail(docname,asd):
		self = frappe.get_doc("Purchase Order",docname)
		frappe.sendmail(recipients={self.contact_email},subject="new order created ",message=f"new order is created with {self.total_qty} items and a total of {self.total}Rs",delayed=False)


def validate_customer_anniversary(doc, method):
    if doc.custom_customer_anniversary:
        today = frappe.utils.today()
        anniversary_date = doc.custom_customer_anniversary

        if anniversary_date > today:
            frappe.throw(("Customer Anniversary date cannot be a future date."))
