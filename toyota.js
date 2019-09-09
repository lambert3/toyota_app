//variable declaration and definition
let Identification = /^[0-9]{4,10}$/;
let Name = /^[a-zA-Z]{3,40}$/;
let townCode = /^[A-Z]{3}$/;
let partNumber,
  pricePerPart,
  quantity = /^[0-9]{1,12}$/;

//function that validates the form
const validData = () => {
  //identification validation
  if (customerId.value == null || customerId.value == "") {
    customerId.style.border = "1px solid Red";
    customerId.value = "* field required";
    customerId.focus();
    return false;
  }

  //if the customerId doesn't match the stated valid Identification then an error is displayed
  else if (!customerId.value.match(Identification)) {
    customerId.style.border = "1px solid Red";
    customerId.value = "* only digits (4-10)";
    customerId.focus();
    return false;
  }

  //name validation
  else if (username.value == null || username.value == "") {
    username.style.border = "1px solid Red";
    username.value = "* field required";
    username.focus();
    return false;
  }

  //if the username doesn't match the stated valid Name then an error is displayed
  else if (!username.value.match(Name)) {
    username.style.border = "1px solid Red";
    username.value = "* only characters (above 3)";
    username.focus();
    return false;
  }

  //the state validation
  else if (!state.value.match(townCode)) {
    state.style.border = "1px solid Red";
    state.value = "* required";
    state.focus();
    return false;
  }

  //part number validation
  else if (part.value == null || part.value == "") {
    part.style.border = "1px solid Red";
    part.value = "* required";
    part.focus();
    return false;
  }

  //if the part number doesn't match the stated valid part number then an error is displayed
  else if (!part.value.match(partNumber)) {
    part.style.border = "1px solid Red";
    part.value = "* only digits";
    part.focus();
    return false;
  }

  //price per part validation
  else if (price.value == null || price.value == "") {
    price.style.border = "1px solid Red";
    price.value = "* required";
    price.focus();
    return false;
  }

  //if the pride per part doesn't match the stated valid preice per part then an error is displayed
  else if (!price.value.match(pricePerPart)) {
    price.style.border = "1px solid Red";
    price.value = "* price > 0";
    price.focus();
    return false;
  }

  //quantity validation
  else if (qty.value == null || qty.value == "") {
    qty.style.border = "1px solid Red";
    qty.value = "please insert the quantity";
    qty.focus();
    return false;
  }

  //if the quantity doesn't match the stated valid quantity then an error is displayed
  else if (!qty.value.match(quantity)) {
    qty.style.border = "1px solid Red";
    qty.value = "* quantity > 0";
    qty.focus();
    return false;
  }

  //shipment costs
  let Shipmentt = [
    "UPS",
    "FED Ex Ground",
    "U.S Postal Air",
    "Fed Ex Overnight"
  ];
  let Shipment = document.getElementsByName("shipping");
  //let oversizeContainer = document.getElementsByName("oversize");
  //looping through the shipment methods
  for (let counter = 0; counter < Shipment.length; counter++) {
    let shippingcosts;
    if (Shipment.item(counter).checked == true) {
      switch (Shipmentt[counter]) {
        case "FED Ex Ground":
          if (oversize.checked == true) {
            document.getElementsByName("shipping").value = Shipmentt[counter];
            shippingcosts =
              Number(9.25) * Number(qty.value) +
              Number(5.0) * Number(qty.value);
            document.getElementById("shippingHandling").value = shippingcosts;
          } else {
            document.getElementsByName("shipping").value = Shipmentt[counter];
            shippingcosts = Number(9.25) * Number(qty.value);
            document.getElementById("shippingHandling").value = shippingcosts;
          }

          break;
        case "U.S Postal Air":
          if (oversize.checked == true) {
            document.getElementsByName("shipping").value = Shipmentt[counter];
            shippingcosts =
              Number(8.5) * Number(qty.value) + Number(5.0) * Number(qty.value);
            document.getElementById("shippingHandling").value = shippingcosts;
          } else {
            document.getElementsByName("shipping").value = Shipmentt[counter];
            shippingcosts = Number(8.5) * Number(qty.value);
            document.getElementById("shippingHandling").value = shippingcosts;
          }

          break;
        case "Fed Ex Overnight":
          if (oversize.checked == true) {
            document.getElementsByName("shipping").value = Shipmentt[counter];
            shippingcosts =
              Number(12.0) * Number(qty.value) +
              Number(5.0) * Number(qty.value);
            document.getElementById("shippingHandling").value = shippingcosts;
          } else {
            document.getElementsByName("shipping").value = Shipmentt[counter];
            shippingcosts = Number(12.0) * Number(qty.value);
            document.getElementById("shippingHandling").value = shippingcosts;
          }

          break;
        default:
          if (oversize.checked == true) {
            document.getElementsByName("shipping").value = Shipmentt[counter];
            shippingcosts =
              Number(7.0) * Number(qty.value) + Number(5.0) * Number(qty.value);
            document.getElementById("shippingHandling").value = shippingcosts;
          } else {
            document.getElementsByName("shipping").value = Shipmentt[counter];
            shippingcosts = Number(7.0) * Number(qty.value);
            document.getElementById("shippingHandling").value = shippingcosts;
          }
      }
      break;
    }
  }

  //cost calculations
  let aggregatecosts = Number(price.value) * Number(qty.value);
  document.getElementById("cost").value = aggregatecosts;

  //sales tax calculations
  if (retail.checked == true) {
    if (state.value == "KLA") {
      let klatax = 0.1 * Number(cost.value);
      document.getElementById("sales").value = klatax.toFixed(0);
    } else if (state.value == "EBB") {
      let ebbtax = 0.05 * Number(cost.value);
      document.getElementById("sales").value = ebbtax.toFixed(0);
    } else if (state.value == "MBR") {
      let mbrtax = 0.05 * Number(cost.value);
      document.getElementById("sales").value = mbrtax.toFixed(0);
    } else {
      let othtax = 0 * Number(cost.value);
      document.getElementById("sales").value = othtax.toFixed(0);
    }
  } else {
    let wholesalerTax = 0 * Number(cost.value);
    document.getElementById("sales").value = wholesalerTax.toFixed(0);
  }

  //total calculations
  let receiptTotal =
    Number(cost.value) + Number(shippingHandling.value) + Number(sales.value);
  document.getElementById("total").value = receiptTotal;

  alert("Data added successfully!!");
  return true;
};

/*formclose() function that displays a a message confirming
 whether the user whats to leave the page*/
function formclose() {
  if (confirm("Are you sure??")) {
    document.write("");
  }
}
