/*the main js that posts data into the database*/

//use the specified modules
const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
const mysql = require("mysql");

const app = express();

app.use(express.static("./public"));

app.use(morgan("short"));

app.use(parser.urlencoded({ extended: false }));

var html_dir = "./public/";

//defining routes
app.get("/", function(req, res) {
  var options = { root: __dirname };
  res.sendFile(html_dir + "toyota.html", options);
});

//connection object having the database name, user, host and the password
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shippingdb"
});

//route for computations
app.post("/computation", function(req, res) {
  const customerIdentification = req.body.userID;
  const customerName = req.body.name;
  const townCode = req.body.address;
  const Shipment = req.body.shipping;
  const partNumber = req.body.part_number;
  const pricePerPart = req.body.price;
  const quantity = req.body.Quantity;

  const RetailCustomer = req.body.retail;
  const oversize = req.body.oversizeContainer;
  const customersales = req.body.sales;

  let CustomerSales = customersales;
  let Shipmentfee;
  let qty = quantity;
  let price = pricePerPart;
  let town = townCode;

  //calculating the customer costs
  let customercosts = Number(qty) * Number(price);

  if (town == "KLA" && RetailCustomer) {
    CustomerSales = Number(0.01) * Number(customercosts);
  } else if (town == "EBB" && RetailCustomer) {
    CustomerSales = Number(0.05) * Number(customercosts);
  } else if (town == "MBR" && RetailCustomer) {
    CustomerSales = Number(0.05) * Number(customercosts);
  } else {
    CustomerSales = 0;
  }

  //switch statement to calculate shipment fee of each shipment method
  switch (Shipment) {
    case "FED Ex Ground":
      if (oversize) {
        Shipmentfee = Number(9.25) * Number(qty) + Number(5.0) * Number(qty);
      } else {
        Shipmentfee = Number(9.25) * Number(qty);
      }

      break;
    case "U.S Postal Air":
      if (oversize) {
        Shipmentfee = Number(8.5) * Number(qty) + Number(5.0) * Number(qty);
      } else {
        Shipmentfee = Number(8.5) * Number(qty);
      }

      break;
    case "Fed Ex Overnight":
      if (oversize) {
        Shipmentfee = Number(12.0) * Number(qty) + Number(5.0) * Number(qty);
      } else {
        Shipmentfee = Number(12.0) * Number(qty);
      }

      break;
    //if non is checked then the default button (ups) is checked
    default:
      if (oversize) {
        Shipmentfee = Number(7.0) * Number(qty) + Number(5.0) * Number(qty);
      } else {
        Shipmentfee = Number(7.0) * Number(qty);
      }
  }

  //calculation of the aggregate total
  let aggregateTotal =
    Number(customercosts) + Number(Shipmentfee) + Number(CustomerSales);

  const querystring =
    " INSERT INTO details (Identification, Name, Location, Shipment, partNumber, pricePerPart, quantity, receiptTotal) VALUES (?,?,?,?,?,?,?,?)";
  connection.query(querystring, [
    customerIdentification,
    customerName,
    town,
    Shipment,
    partNumber,
    price,
    qty,
    aggregateTotal
  ]);

  //redirection to the root
  res.redirect("/");

  res.end();
});

//server listening
app.listen(3006);
