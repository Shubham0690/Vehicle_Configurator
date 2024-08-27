import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ResetContext } from "../contexts/ResetContext";
import jsPDF from "jspdf";
import { Alert } from 'react-st-modal';
import 'jspdf-autotable';
import logo from '../logo.jpeg';
import { v4 as uuidv4 } from 'uuid';

const UN = localStorage.getItem("username");
const token = sessionStorage.getItem("jwtToken"); // Retrieve token

function InvoiceGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDropdownIds = location.state?.selectedDropdownIds || [];
  const selectedId = location.state?.selectedId;
  const orderSize = location.state?.orderSize;

  const [componentNames, setComponentNames] = useState([]);
  const [nonConfigurableComponents, setNonConfigurableComponents] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [modelPrice, setModelPrice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [invoicePath, setInvoicePath] = useState("");

  const { segmentSelectedTop, setSegmentSelectedTop } = useContext(ResetContext);
  const userId = localStorage.getItem("userId");
  const [check, setCheck] = useState(-1);

  useEffect(() => {
    if (selectedId) {
      // Fetch model price
      fetch(`http://localhost:8080/api/models/${selectedId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setModelPrice(data.price + (location.state?.totalDeltaa || 0));
          console.log("Model price fetched:", data.price);
        })
        .catch((error) => console.error("Error fetching model price:", error));
    }
  }, [selectedId, location.state?.totalDeltaa]);

  useEffect(() => {
    if (selectedDropdownIds.length > 0) {
      // Fetch component names
      Promise.all(
        selectedDropdownIds.map((id) =>
          fetch(`http://localhost:8080/api/components/${id}`, {
            method: "GET",
            headers: { 
              Authorization: `Bearer ${token}`, // Include token in headers
              "Content-Type": "application/json"
            }
          }).then((response) => response.json())
        )
      ).then((data) => {
        setComponentNames(data.map((item) => item.compName));
        console.log("Component names fetched:", data);
      })
      .catch((error) => console.error("Error fetching component names:", error));
    }
  }, [selectedDropdownIds]);

  useEffect(() => {
    if (selectedId) {
      // Fetch non-configurable components
      fetch(`http://localhost:8080/api/vehicles/config/${selectedId}/n`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setNonConfigurableComponents(data.map((item) => item.comp_name));
          console.log("Non-configurable components fetched:", data);
        })
        .catch((error) => console.error("Error fetching non-configurable components:", error));
    }
  }, [selectedId]);

  useEffect(() => {
    if (modelPrice !== null && orderSize !== null && check === -1) {
      setCheck(check + 1);
      const basePrice = modelPrice * orderSize;
      const taxRate = 0.28;
      const taxAmount = basePrice * taxRate;
      const totalPrice = basePrice + taxAmount;
      setTotalPrice(totalPrice);
      console.log("Total price calculated:", totalPrice);
    }
  }, [modelPrice, orderSize, check]);

  const handleModifyClick = () => {
    navigate("/Configurations");
  };

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    
    const img = new Image();
    img.src = logo;
    img.onload = function() {
      const imgWidth = 80;
      const imgHeight = 20;
      const centerX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
      const centerY = 20;
      doc.addImage(img, 'JPEG', centerX, centerY, imgWidth, imgHeight);
  
      doc.setLineWidth(0.5);
      doc.line(10, centerY + imgHeight + 10, 200, centerY + imgHeight + 10);
      doc.line(11, centerY + imgHeight + 11, 200, centerY + imgHeight + 11);
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 255);
      doc.text('Invoice', 105, centerY + imgHeight + 30, { align: 'center' });
  
      const verticalSpace = 10;
      let currentY = centerY + imgHeight + 50;
  
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(`Order Date: ${currentDate}`, 10, currentY);
      
     // Inside the generateAndDownloadPDF function, after adding the customer name:
doc.setFontSize(16);
doc.text(`Customer Name: ${UN}`, 10, currentY + verticalSpace);

currentY += verticalSpace * 2;
currentY += verticalSpace * 2;

// Adding configured components to the invoice
doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.text('Configured Components:', 10, currentY);

currentY += verticalSpace;

doc.setFont('helvetica', 'normal');
doc.setFontSize(12);
componentNames.forEach((name, index) => {
    doc.text(`${index + 1}. ${name}`, 20, currentY);
    currentY += verticalSpace;
});

currentY += verticalSpace * 2;

// Continue with the rest of the invoice details
doc.setFont('helvetica', 'normal');
doc.setFontSize(12);
doc.text('Model Price:', 20, currentY);
doc.text(`Rs ${modelPrice || 0}`, 120, currentY, { align: 'right' });

currentY += verticalSpace;

// Continue with the rest of the code as before...

  
      doc.text('Order Size:', 20, currentY);
      doc.text(`${orderSize || 0}`, 120, currentY, { align: 'right' });
  
      currentY += verticalSpace;
  
      doc.text('Tax Rate:', 20, currentY);
      doc.text('28%', 120, currentY, { align: 'right' });
  
      currentY += verticalSpace;
  
      doc.text('Tax Amount:', 20, currentY);
      doc.text(
        `Rs ${
          totalPrice !== null ? (totalPrice - totalPrice / 1.28).toFixed(2) : '0.00'
        }`,
        120,
        currentY,
        { align: 'right' }
      );
  
      currentY += verticalSpace;
  
      doc.setFont('helvetica', 'bold');
      doc.text('Total Price (Including Tax):', 20, currentY);
      doc.setTextColor(255, 0, 0);
      doc.text(`Rs ${totalPrice || 0} /-`, 120, currentY, { align: 'right'});
  
      currentY += verticalSpace;
  
      doc.setFont('helvetica', 'italic', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      currentY += verticalSpace;
      doc.text('Thank you for your order!', 105, currentY + 10, { align: 'center' });
  
      doc.setLineWidth(0.5);
      doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10);
  
      const uniqueId = uuidv4();
      const path = `${UN}_invoice_${uniqueId}.pdf`;
      doc.save(path);
      const pt = `/Users/vishvajeetpatil/Downloads/${path}`;
      sessionStorage.setItem('invoicePath', pt);
      setInvoicePath(path);
    };
  
    img.onerror = function() {
      console.error("Failed to load the image.");
    };
  };

  const handleConfirmOrder = async () => {
    setShowPopup(true);
    generateAndDownloadPDF();
    alert("Order Confirmed!");

    const myobj = {
      userId: userId,
      modelId: selectedId,
      orderedQty: orderSize,
      altCompId: selectedDropdownIds,
      modelPrice: modelPrice,
      totalPrice: totalPrice,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/invoice/`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myobj),
      });

      if (!response.ok) {
        throw new Error("Failed to send invoice");
      }

      // Fetch user's email address
      const userResponse = await fetch(`http://localhost:8080/api/${UN}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
          "Content-Type": "application/json"
        }
      });
      console.log(userResponse + " normal");
      const user_data = await userResponse.json();
      const userEmail = user_data.email; // Assuming the user object has an 'email' field
      console.log(userEmail + " useremail");
      const in_path = sessionStorage.getItem('invoicePath');
      console.log(in_path);

      // Prepare EmailDetails object
      const emailDetails = {
        recipient: userEmail,
        msgBody: `Dear ${UN}, please find the attached invoice for your recent order.`,
        name: "Vehicle Configurator Invoice: ",
        useremail: userEmail,
        attachment: in_path,
      };

      // Send email with the invoice attachment
      const emailResponse = await fetch(`http://localhost:8080/api/sendMailWithAttachment`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailDetails),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }
      
      alert("Invoice sent to your email!");

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <center><h1>Invoice</h1></center>
      
      <h2 style={{ marginLeft: "10px" }}>Configured components:</h2>
      
      <ul style={{ listStyleType: "disc", paddingLeft: "60px" }}>
        {componentNames.map((name, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              padding: "5px",
              borderRadius: "5px",
              width: "auto",
              listStylePosition: "outside"
            }}
          >
            {name}
          </li>
        ))}
      </ul>

      <div
        style={{
          border: "2px solid black",
          borderStyle: "dashed",
          padding: "20px",
          margin: "20px",
          borderRadius: "10px",
          marginTop: "50px"
        }}
      >
        <center><h2>Invoice:</h2></center>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <span style={{fontSize:"20px", fontWeight:"bold"}}>Customer Name:</span>
          <span style={{marginLeft:"10px", fontSize:"20px", fontWeight:"bold", marginBottom:"20px"}}>{UN}</span>
        </div>
        <hr />

        <div style={{ marginTop: "20px" }}>
          <h3>Configured Components:</h3>
          <ul style={{ listStyleType: "disc", paddingLeft: "40px" }}>
            {componentNames.map((name, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {name}
              </li>
            ))}
          </ul>
        </div>




        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", marginTop: "20px" }}>
          <span>Model Price:</span>
          <span>Rs {modelPrice || 0}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span>Order Size:</span>
          <span>{orderSize || 0}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span>GST:</span>
          <span>28%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span>GST Amount:</span>
          <span>
            Rs {totalPrice !== null ? (totalPrice - totalPrice / 1.28).toFixed(2) : "0.00"}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span>Total Price (Including GST):</span>
          <span>Rs {totalPrice || 0} </span>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handleConfirmOrder} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "dodgerblue", border: "1px solid dodgerblue", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>
            Confirm Order
          </button>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: "50px", marginTop: "30px" }}>
        <button onClick={handleModifyClick} style={{ fontSize: "16px", padding: "10px 20px", backgroundColor: "dodgerblue", border: "1px solid dodgerblue", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

export default InvoiceGenerator;
