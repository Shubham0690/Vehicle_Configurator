package com.example.services;


import java.util.List;

import com.example.entities.Invoice;

public interface InvoiceService {
	public Invoice saveCart(Invoice obj);
	public List<Invoice> getAllInvoice();
}

