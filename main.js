// Tony George//

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let Mood = 'create';
let tmp;

// Get Total Function
function getTotal() {
  if (price.value !== "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040"
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#A00D02"
  }
}
// Create Product Function
let dataOfProducts;
if (localStorage.Product != null) {
  dataOfProducts = JSON.parse(localStorage.Product);
} else {
  dataOfProducts = [];
}

// Save To Local Storage Function
submit.onclick = () => {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  }
  if (title.value != "" && price.value != "" && category.value != "") {
    if (Mood === 'create') {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataOfProducts.push(newProduct);
        }
      } else {
        dataOfProducts.push(newProduct);
      }
    } else {
      dataOfProducts[tmp] = newProduct;
      Mood = 'create';
      count.style.display = "block";
      submit.innerHTML = "Create";
    }
    clearAllInputs();
  }
  window.localStorage.setItem("Product", JSON.stringify(dataOfProducts));
  showDataOnPage();
}

// Clear All Inputs Function
function clearAllInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read Fucntion
function showDataOnPage() {
  let table = "";
  for (let i = 0; i < dataOfProducts.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${dataOfProducts[i].title}</td>
      <td>${dataOfProducts[i].price}</td>
      <td>${dataOfProducts[i].taxes}</td>
      <td>${dataOfProducts[i].ads}</td>
      <td>${dataOfProducts[i].discount}</td>
      <td>${dataOfProducts[i].total}</td>
      <td>${dataOfProducts[i].category}</td>
      <td><button onclick="updateData(${i});" id="update">Update</button></td>
      <td><button onclick="deleteData(${i});" id="delete">Delete</button></td>
    </tr>
    `
  }
  document.getElementById("tbody").innerHTML = table;
  const deleteAllBtn = document.getElementById("deleteAll");
  if (dataOfProducts.length > 0) {
    deleteAllBtn.innerHTML = `
      <button onclick="deleteAllData();">Delete All Data (${dataOfProducts.length}) </button>
    `
  } else {
    deleteAllBtn.innerHTML = "";
  }
}
showDataOnPage();

// Delete Function
function deleteData(index) {
  dataOfProducts.splice(index, 1);
  window.localStorage.Product = JSON.stringify(dataOfProducts);
  showDataOnPage();
}

function deleteAllData() {
  window.localStorage.clear();
  dataOfProducts.splice(0);
  showDataOnPage();
}

// Update Function
function updateData(index) {
  tmp = index;
  title.value = dataOfProducts[index].title;
  price.value = dataOfProducts[index].price;
  taxes.value = dataOfProducts[index].taxes;
  ads.value = dataOfProducts[index].ads;
  discount.value = dataOfProducts[index].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataOfProducts[index].category;
  submit.innerHTML = "Update";
  Mood = 'update';
  scroll({
    top: 0,
    behavior: 'smooth'
  })
}
// Search Function
let searchMood = 'Title';

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = 'Title';
  } else {
    searchMood = 'Category';
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showDataOnPage();
}

function SearchOnData(value) {
  let table = '';
  for (let i = 0; i < dataOfProducts.length; i++) {
    if (searchMood === 'Title') {
      if (dataOfProducts[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataOfProducts[i].title}</td>
            <td>${dataOfProducts[i].price}</td>
            <td>${dataOfProducts[i].taxes}</td>
            <td>${dataOfProducts[i].ads}</td>
            <td>${dataOfProducts[i].discount}</td>
            <td>${dataOfProducts[i].total}</td>
            <td>${dataOfProducts[i].category}</td>
            <td><button onclick="updateData(${i});" id="update">Update</button></td>
            <td><button onclick="deleteData(${i});" id="delete">Delete</button></td>
          </tr>
        `
      }
    } else {
      if (dataOfProducts[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataOfProducts[i].title}</td>
            <td>${dataOfProducts[i].price}</td>
            <td>${dataOfProducts[i].taxes}</td>
            <td>${dataOfProducts[i].ads}</td>
            <td>${dataOfProducts[i].discount}</td>
            <td>${dataOfProducts[i].total}</td>
            <td>${dataOfProducts[i].category}</td>
            <td><button onclick="updateData(${i});" id="update">Update</button></td>
            <td><button onclick="deleteData(${i});" id="delete">Delete</button></td>
          </tr>
        `
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
