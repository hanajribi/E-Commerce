// singup simple user LS
function customerSingup() {

    var fname = document.getElementById('fnameId').value;
    var lname = document.getElementById('lnameId').value;
    var email = document.getElementById('emailId').value;
    var pwd = document.getElementById('pwdId').value;
    var cpwd = document.getElementById('CpwdId').value;
    var tel = document.getElementById('telId').value;
    console.log(fname);
    var vfname = check(fname, 3);
    var vlname = check(lname, 4)
    var vemail = validateEmailFormat(email);
    var vpwd = check(pwd, 8)
    var valide_pwd = compare(pwd, cpwd)
    var verifEmail = searchUser(email);
    if (vfname && vlname && vemail && vpwd && valide_pwd && !verifEmail) {
        var iduser = JSON.parse(localStorage.getItem('idUserKey') || '1');

        var user = {};
        user.id = iduser;
        user.fname = fname;
        user.lname = lname;
        user.email = email;
        user.pwd = pwd;
        user.cpwd = cpwd;
        user.tel = tel;
        user.role = 'user';
        console.log(user);
        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('idUserKey', iduser + 1);
        console.log(users);
    }


}
// singup admin user LS
function AdminSingup() {

    var fname = document.getElementById('adminFirstNameId').value;
    var lname = document.getElementById('adminLastNameId').value;
    var email = document.getElementById('adminEmailId').value;
    var pwd = document.getElementById('adminPwdId').value;
    var cpwd = document.getElementById('AdminConfirmPwdId').value;
    var tel = document.getElementById('admintelId').value;
    var fax = document.getElementById('fax').value;
    var adress = document.getElementById('adressId').value;
    var companyId = document.getElementById('adminCompnyId').value;
    var companyName = document.getElementById('namecompany').value;
    console.log(fname);
    var vfname = check(fname, 3);
    var vlname = check(lname, 4)
    var vemail = validateEmailFormat(email);
    var vpwd = check(pwd, 8)
    var valide_pwd = compare(pwd, cpwd)
    var verifEmail = searchUser(email);
    if (vfname && vlname && vemail && vpwd && valide_pwd && !verifEmail) {
        var iduser = JSON.parse(localStorage.getItem('idUserKey') || '1');

        var user = {};
        user.id = iduser;
        user.fname = fname;
        user.lname = lname;
        user.email = email;
        user.pwd = pwd;
        user.cpwd = cpwd;
        user.tel = tel;
        user.fax = fax;
        user.adress = adress;
        user.companyId = companyId;
        user.companyName = companyName;
        user.role = 'admin';

        console.log(user);
        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('idUserKey', iduser + 1);
        console.log(users);
        location.replace('login.html');
    }


}
function validateEmailFormat(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

function check(ch, nbr) {
    return (ch.length >= nbr);
}

function compare(x, y) {

    return (x == y);
}
// search objet user by email from LS
function searchUser(email) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var userExists = false;
    for (var i = 0; i < users.length; i++) {
        if (email == users[i].email) {
            userExists = true;
            break;
        }
    }
    return userExists;
}
function displayError(id, condition, msg) {
    if (condition) {
        document.getElementById(id).innerHTML = "";

    } else {
        document.getElementById(id).innerHTML = msg;
        document.getElementById(id).style.color = 'red';
    }

}
function login() {

    var email = document.getElementById('loginemailId').value;
    var pwd = document.getElementById('loginpwdId').value;
    var verifUser = userExists(email, pwd);
    var findedUser = searchIdByEmail(email)
    if (verifUser) {
        if (findedUser.role == 'admin') {
            location.replace("store-products.html");
            localStorage.setItem("connecteUserId", findedUser.id);
        } else {
            location.replace("shop-all-user.html");
            localStorage.setItem("connecteUserId", findedUser.id);

        }
    }
}


function userExists(user, pw) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var exist = false;
    for (let i = 0; i < users.length; i++) {
        if (user == users[i].email && pw == users[i].pwd) {
            exist = true;
            break;
        }
    }
    return exist;
}
function searchIdByEmail(email) {
    var users = JSON.parse(localStorage.getItem('users'));
    var userName;
    for (let j = 0; j < users.length; j++) {
        if (users[j].email == email) {
            userName = users[j];
            break;
        }
    }

    return userName; // objet total of user
}
// LS to category
function addCategory() {
    var name = document.getElementById('categoryNameId').value;
    var idPcategory = JSON.parse(localStorage.getItem('idPcategoryKey') || '1');

    var x = {};
    x.id = idPcategory
    x.name = name;
    x.iduser = localStorage.getItem('connecteUserId');
    var catogaryTab = JSON.parse(localStorage.getItem('catogaryTab')) || [];
    catogaryTab.push(x);
    localStorage.setItem('catogaryTab', JSON.stringify(catogaryTab));
    localStorage.setItem('idPcategoryKey', idPcategory + 1);
    location.reload();
}

// LS to product
function addProduct() {
    var name = document.getElementById('productNameId').value;
    var price = document.getElementById('priceId').value;
    var stock = document.getElementById('stockId').value;
    var category = document.getElementById('categoryId').value;
    var vstock = checkStock(stock);
    var vPice = checkPrice(price);
    var vName = check(name, 3);

    if (vstock && vPice && vName) {
        var idProduct = JSON.parse(localStorage.getItem('idProductKey') || '1');

        var product = {};
        product.id = idProduct;
        product.name = name;
        product.price = price;
        product.stock = stock;
        product.category = category;
        product.isConfirm = false;
        product.idUser = localStorage.getItem('connecteUserId');
        var products = JSON.parse(localStorage.getItem('products')) || [];

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('idProductKey', idProduct + 1);
        location.reload();

    }
}

function checkStock(nbr) {
    return (nbr > 10 && !isNaN(nbr))
}
function checkPrice(nbr) {
    return (nbr > 0 && !isNaN(nbr))
}
//generete select option
function selectOption() {
    var categorys = JSON.parse(localStorage.getItem('catogaryTab')) || [];
    var catalogueSelect = ``;

    for (let i = 0; i < categorys.length; i++) {
        if (categorys[i].iduser == localStorage.getItem('connecteUserId')) {
            catalogueSelect = catalogueSelect + `
    <option value="${categorys[i].name}">${categorys[i].name}</option>`;
        }
    }
    document.getElementById('categoryId').innerHTML = catalogueSelect;

}
//that return all objects from LS
function getObjectsFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
function getConnectedUserId() {
    return localStorage.getItem('connecteUserId')
}
//displayUserProducts function that allows to display all connected user products
function displayUserProducts() {
    var products = getObjectsFromLS('products');
    var connectedUserId = getConnectedUserId();
    var myProducts = getUserProduct(connectedUserId, products);
    var productsDiv = ``;
    for (let i = 0; i < myProducts.length; i++) {
        productsDiv = productsDiv + `
        <div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p1.jpg" alt="">
							<div class="product-details">
								<h6>${myProducts[i].name}</h6>
								<div class="price">
									<h6>${myProducts[i].price}</h6>
									<h6 class="l-through">${myProducts[i].price}</h6>
								</div>
                                <h6>${myProducts[i].category}</h6>
                                <h6> stock: ${myProducts[i].stock}</h6>
								<div class="prd-bottom">

									<div href="" class="social-info">
										<span class="ti-bag"></span>
										<button class=" btn hover-text" onclick="goToDisplayProduct(${myProducts[i].id})" style="background-color: white;">info product</button>
									</div>
									<div href="" class="social-info">
										
                                        <span class="lnr lnr-sync"></span>
										<button class="hover-text btn" onclick="deleteProduct(${i})" style="background-color: white;">Delete</button>
									</div>
									
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>`


    }
    document.getElementById('myProductsId').innerHTML = productsDiv;
}

// return all products of connected user
function getUserProduct(idUser, productsTab) {
    var myProducts = [];
    for (let i = 0; i < productsTab.length; i++) {
        if (productsTab[i].idUser == idUser && productsTab[i].isConfirm == true) {
            myProducts.push(productsTab[i]);
        }
    }
    return myProducts;
}

function goToDisplayProduct(idProduct) {
    localStorage.setItem('selectProductId', idProduct)
    location.replace("display-product.html");

}
function productInfo() {
    var selectProduct = localStorage.getItem('selectProductId');
    var idConnected = getConnectedUserId();
    var findedUser = searchUserById(idConnected);
    var products = getObjectsFromLS('products');
    var productInfo = ``;


    for (let i = 0; i < products.length; i++) {
        if (selectProduct == products[i].id) {
            if (idConnected) {
                if (findedUser.role == 'admin') {
                    console.log(findedUser.role)
                    console.log(products[i].name)
                    productInfo += `
            <div class="s_product_text">
                            <h3>${products[i].name}</h3>
                            <h2>${products[i].price}</h2>
                            <ul class="list">
                                <li><a class="active" href="#"><span>Category</span> : ${products[i].category}</a></li>
                                <li><a href="#"><span>Stock</span> : ${products[i].stock}</a></li>
                            </ul>
                            
                            
                            <div class="card_area d-flex align-items-center">
                                <button class="primary-btn btn" href="#" onclick="displayEditProduct()" >Edit product</button>
                            </div>
                        </div>`


                } else {
                    productInfo = `
                    <div class="s_product_text">
                    <h3>${products[i].name}</h3>
                    <h2>${products[i].price}</h2>
                    <ul class="list mb-3">
                        <li><a class="active" href="#"><span>Category</span> : ${products[i].category}</a></li>
                        <li><a href="#"><span>Stock</span> : ${products[i].stock}</a></li>
                    </ul>
                    <div lass="card_area d-flex align-items-center">
                        <input type="text" placeholder="insert quantity" class="form-control" id="qtyReserveId"> <br>
                        <span id="errorQtyResrve"></span>  <br>
                        <button class="btn-warning btn mt-2" href="#" onclick="myOrders()">reserve</button>
    
                    </div>
                    </div>`

                }
            } else {
                productInfo = `
                <div class="s_product_text">
                <h3>${products[i].name}</h3>
                <h2>${products[i].price}</h2>
                <ul class="list mb-3">
                    <li><a class="active" href="#"><span>Category</span> : ${products[i].category}</a></li>
                    <li><a href="#"><span>Stock</span> : ${products[i].stock}</a></li>
                </ul>
                <div lass="card_area d-flex align-items-center">
                   
                    <button class="btn-warning btn mt-2" href="#" onclick="goToLogin()">Login</button>

                </div>
                </div>`

            }

        }
        document.getElementById('productInfoId').innerHTML = productInfo;
    }
}
function goToLogin() {
    location.replace("login.html")
}
//function that returns object from LS
function searchProductById(id) {
    var products = getObjectsFromLS('products');
    var findedProduct = [];
    for (let i = 0; i < products.length; i++) {
        if (id == products[i].id) {
            findedProduct = products[i];
            break;

        }

    }
    return findedProduct;
}
function searchUserById(id) {
    var users = getObjectsFromLS('users');
    var findedUser = [];
    for (let i = 0; i < users.length; i++) {
        if (id == users[i].id) {
            findedUser = users[i];
            break;

        }

    }
    return findedUser;
}

function displayEditProduct() {
    var idProduct = localStorage.getItem('selectProductId');
    var findedProduct = searchProductById(idProduct);
    console.log(findedProduct)
    var editForm = ``;
    editForm = `
    <div class="s_product_text">

    <h3>EDIT PRODUCT</h3>
                     <div class="row login_form" method="post" id="contactForm">
                         <div class="col-md-12 form-group">
                         <label for="exampleInputEmail1" class="form-label">price</label>

                             <input type="text" class="form-control" id="newpriceId" value="${findedProduct.price}" >
                         </div>
                         <div class="col-md-12 form-group">
                         <label for="exampleInputEmail1" class="form-label">stock</label>
                             <input type="text" class="form-control" id="newstockId" value="${findedProduct.stock}" >
                         </div>
                     
                         <div class="col-md-12 form-group">
                             <button type="submit" value="submit" class="primary-btn" onclick="validateEdit()">Validate Edit</button>
                         </div>
                     </div>
 </div> `;

    document.getElementById('editProductId').innerHTML = editForm;
}

function validateEdit() {
    var idProductSelecter = localStorage.getItem('selectProductId');
    var products = getObjectsFromLS('products');
    var newprice = document.getElementById('newpriceId').value;
    var newstock = document.getElementById('newstockId').value;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idProductSelecter) {
            products[i].price = newprice;
            products[i].stock = newstock;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.replace("store-products.html")

}
function deleteProduct(pos) {
    var products = getObjectsFromLS('products');
    products.splice(pos, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();

}
function generateProductsTab() {
    var products = getObjectsFromLS('products');
    console.log('products', products)
    var productsTable = `    
         <table class="table table-striped">
         <tr>
           
            <th>name</th>
            <th>price</th>
             <th>stock</th>
             <th>category</th>
             <th>Actions</th>
             
         </tr>`;
    for (let i = 0; i < products.length; i++) {
        productsTable = productsTable + `
         <tr>
            
            
            <td>${products[i].name}</td>
             <td>${products[i].price}</td>
             <td>${products[i].stock}</td>
             <td>${products[i].category}</td>
             <td>
             <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>
             <button class="btn btn-success" onclick="confimProduct(${products[i].id})"> comfirm</button>
             </td>
            
         </tr> `;
    }
    productsTable = productsTable + `</table>`;
    document.getElementById('adminSuperProductsId').innerHTML = productsTable;
}
function confimProduct(id) {
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].isConfirm = true;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}
function generateUsersTab() {
    var users = getObjectsFromLS('users');
    console.log(users);
    var usersTable = `    
         <table class="table table-striped">
         <tr>
            
            <th>First name</th>
            <th>Last name</th>
             <th>Email</th>
             <th>telphone</th>
             <th>role</th>
             <th>actions</th>
             
         </tr>`;
    for (let i = 0; i < users.length; i++) {

        usersTable = usersTable + `
         <tr>
            
             <td>${users[i].fname}</td>
             <td>${users[i].lname}</td>
             <td>${users[i].email}</td>
             <td>${users[i].tel}</td>
             <td>${users[i].role}</td>
             <td>
             <button class="btn btn-danger">delete</button>
             </td>
            
         </tr> `;

    }
    usersTable = usersTable + `</table>`;
    document.getElementById('adminSuperUsersId').innerHTML = usersTable;
}
//display all products confirm
function shopUser() {
    var products = getObjectsFromLS('products');
    console.log(products);
    var confimProduct = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].isConfirm == true) {
            confimProduct.push(products[i])
        }

    }
    var productsAllUse = ``;
    for (let i = 0; i < confimProduct.length; i++) {
        productsAllUse += `
            <div class="col-lg-4 col-md-6">
							<div class="single-product">
								<img class="img-fluid" src="img/product/p1.jpg" alt="">
								<div class="product-details">
									<h6>${products[i].name}</h6>
									<div class="price">
										<h6>${products[i].price}</h6>
										<h6 class="l-through">${products[i].price}</h6>
									</div>
                                    <h6>${products[i].category}</h6>
									<div class="prd-bottom">

                                    <div href="" class="social-info">
                                    <span class="ti-bag"></span>
                                    <button class=" btn hover-text" onclick="goToDisplayProduct(${products[i].id})" style="background-color: white;">display</button>
                                </div>
										<div href="" class="social-info">
											<span class="lnr lnr-heart"></span>
                                            <button class=" btn hover-text" onclick=" myWishlistProduct(${products[i].id})" style="background-color: white;">wishlist</button>

										</div>
										<a href="" class="social-info">
											<span class="lnr lnr-sync"></span>
											<p class="hover-text">compare</p>
										</a>
										<a href="" class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">view more</p>
										</a>
									</div>
								</div>
							</div>
						</div>`;


    }
    document.getElementById('productsAllUserId').innerHTML = productsAllUse;
}
//table of objects by orders 
function myOrders() {
    var qty = document.getElementById('qtyReserveId').value;
    var idProduct = localStorage.getItem('selectProductId');
    var connectedUser = getConnectedUserId();
    var productReserve = searchProductById(idProduct);
    var stock = productReserve.stock;
    if (stock >= qty) {

        var idOrders = JSON.parse(localStorage.getItem('idOrdersKey') || '1');
        var orders = {};
        orders.id = idOrders;
        orders.qty = qty;
        orders.idProduct = idProduct;
        orders.idUser = connectedUser;
        orders.status = false;
        var myOrders = JSON.parse(localStorage.getItem('myOrders')) || [];
        myOrders.push(orders);
        localStorage.setItem('myOrders', JSON.stringify(myOrders));
        localStorage.setItem('idOrdersKey', idOrders + 1);
        udpateStock(qty);
        location.reload();
        console.log('my Orders', myOrders)


    } else {
        document.getElementById('errorQtyResrve').innerHTML = 'unvailable Qty';
        document.getElementById('errorQtyResrve').style.color = 'red';

    }
}
// admin update her stock
function udpateStock(qty) {
    var selectProduct = localStorage.getItem('selectProductId');
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (selectProduct == products[i].id) {
            var newQty = products[i].stock - qty;
            products[i].stock = newQty;
            break;

        }

    }
    localStorage.setItem('products', JSON.stringify(products));
}

function ordersByUser(orders) {
    var myOrder = [];
    var connecteUserId = getConnectedUserId();
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connecteUserId) {
            myOrder.push(orders[i])
        }
    }
    return myOrder;
}
//display orders table
function generateOrdersTab() {
    var ordres = getObjectsFromLS('myOrders')
    console.log('tous les Orders test', ordres)
    var connecteUserId = getConnectedUserId();
    console.log('l utisateur', connecteUserId)
    var myOrder = [];
    for (let i = 0; i < ordres.length; i++) {
        if (ordres[i].idUser == connecteUserId) {
            myOrder.push(ordres[i])
        }
    }
    console.log('mes ordres', myOrder);
    var ordersTable = ``;
    console.log('logeur table des ordres qui reservé', myOrder.length)
    if (myOrder.length == 0) {
        ordersTable = `
        <div class="text-center mt-5 mb-5">
							<h2>basket vide</h2>
						</div>`;
    } else {
        ordersTable = `  
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th style="col"> Actions</th>
        </tr>
    </thead>`;
        var total = 0;
        for (let i = 0; i < myOrder.length; i++) {
            order = myOrder[i];
            console.log(order.idProduct)
            var myOrdersReseve = searchProductById(order.idProduct)
            console.log('l objet de notre product', myOrdersReseve)
            ordersTable = ordersTable + `
         
         <tbody>
                            <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${myOrdersReseve.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${myOrdersReseve.price}</h5>
                                </td>
                                <td>
                                    <h5>${order.qty}</h5>
                                </td>
                                <td>
                                    <h5>${order.qty * myOrdersReseve.price}</h5>
                                </td>
                                <td>`
            if (order.status) {
                ordersTable += `
                                        your basket is confirmed 
                                    `
            } else {
                ordersTable += ` <button class="btn btn-danger" onclick="deleteOrderAndUpdateStock(${getObjectPositionById(order.id, ordres)},'myOrders',${myOrdersReseve.id},${order.qty})">delete</button>`;

            }
            `</td>
                            </tr> `
            total = total + order.qty * myOrdersReseve.price;

        }
        ordersTable = ordersTable + `
    <tr>
    <td>

    </td>
    <td>

    </td>
    <td>
        <h5>total</h5>
    </td>
    <td>
        <h5>${total}</h5>
    </td>
    </tr>  
    <tr>
    <td>

    </td>
    <td>

    </td>
    <td>
        <h5>Delivry</h5>
    </td>
    <td>
        <h5>${freeDelivry(total)}</h5>
    </td>
    </tr>  
    <tr class="out_button_area">
         <td>

         </td>
        <td>

        </td>
        <td>

        </td>
        <td>
            <div class="checkout_btn_inner d-flex align-items-center">
                <a class="gray_btn" href="shop-all-user.html">Continue Shopping</a>
                <a class="primary-btn" href="checkout.html">Proceed to checkout</a>
            </div>
        </td>
    </tr>                                      
    </tbody>
    </table>`;
    }
    document.getElementById('ordersId').innerHTML = ordersTable;
}
//display orders of connected user
function userOrders(orders, userId) {
    var myOrders = [];

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser = userId) {
            myOrders.push(orders[i]);
        }

    }
    return myOrders
}
//get Object Position By Id
function getObjectPositionById(id, tab) {
    var pos;
    for (let i = 0; i < tab.length; i++) {
        if (id == tab[i].id) {
            pos = i;
            break;
        }

    }
    return pos;
}
//delete Order And Update Stock
function deleteOrderAndUpdateStock(pos, key, idProduct, qty) {
    if (condition) {

    } else {

    }
    var object = getObjectsFromLS(key);
    object.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(object));
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idProduct) {
            products[i].stock += Number(qty);
            break;
        }

    }
    localStorage.setItem('products', JSON.stringify(products))
    location.reload();

}
//check price to free delivery
function freeDelivry(total) {

    return (total >= 300) ? 'Free' : '7$';
}
function editProfile() {
    var connectedUserId = localStorage.getItem('connecteUserId');

    var findedProfile = searchUserById(connectedUserId)
    var editForm = ``;
    editForm = `
    <div class="s_product_text">

    <h3>Edit profile</h3>
                     <div class="row login_form" method="post" id="contactForm">
                         <div class="col-md-12 form-group">
                         <label for="exampleInputEmail1" class="form-label">Email</label>

                             <input type="text" class="form-control" id="newGmailProfileId" value="${findedProfile.email}" >
                         </div>
                         <div class="col-md-12 form-group">
                         <label for="exampleInputEmail1" class="form-label">tel</label>
                             <input type="text" class="form-control" id="newTelProfileId" value="${findedProfile.tel}" >
                         </div>
                         <span id="errorProfile"></span>
                         <div class="col-md-12 form-group">
                             <button type="submit" value="submit" class="primary-btn" onclick="validateEditProfile()">Validate Profile</button>
                         </div>
                     </div>
 </div> `;

    document.getElementById('editProfileId').innerHTML = editForm;

}
//to validate Edit Profile
function validateEditProfile() {
    var connectedUserId = localStorage.getItem('connecteUserId');
    var users = getObjectsFromLS('users');

    var newGmail = document.getElementById('newGmailProfileId').value;
    var newTlf = document.getElementById('newTelProfileId').value;
    var verifNewEmail = validateEmailFormat(newGmail);
    var verifNewTel = !isNaN(newTlf);

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == connectedUserId) {
            if (verifNewEmail && verifNewTel) {
                users[i].email = newGmail;
                users[i].tel = newTlf;
                break;
            } else {
                document.getElementById('errorProfile').innerHTML = 'check ur email or ur number';
                document.getElementById('errorProfile').style.color = 'red';

            }

        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    if (verifNewEmail && verifNewTel) {
        location.replace("profile.html")
    }


}
//display user profile
function profileForum() {
    var connectedUserId = localStorage.getItem('connecteUserId');
    var findedProfile = searchUserById(connectedUserId)
    var profileForum = `

    <div class="col-md-12 form-group">
    <p class="fw-bold">First name: <span class="fst-italic">${findedProfile.fname}</span> </p>
    
</div>
<div class="col-md-12 form-group">
<p class="fw-bold">Last name: <span class="fst-italic">${findedProfile.lname}</span> </p>
  
</div>
<div class="col-md-12 form-group">
<p class="fw-bold">Email: <span class="fst-italic">${findedProfile.email}</span> </p>

</div>

<div class="col-md-12 form-group">
<p class="fw-bold">Email: <span class="fst-italic">${findedProfile.tel}</span> </p>

</div>


<div class="col-md-12 form-group">
    <button type="submit" value="submit" class="primary-btn"
        onclick="editProfile()">Edit</button>

</div>`
    document.getElementById('profilrForumId').innerHTML = profileForum;

}
//determine the header display according to the user
function header() {
    var connectedUserId = localStorage.getItem('connecteUserId');
    var headerStyle = ``;
    if (connectedUserId) {
        var findedUser = searchUserById(connectedUserId);


        console.log(findedUser.role)
        console.log(findedUser)


        if (findedUser.role == 'user') {
            var ordres = getObjectsFromLS('myOrders');
            var myOrders = ordersByUser(ordres);
            headerStyle = `
            <div class="main_menu">
                <nav class="navbar navbar-expand-lg navbar-light main_box">
                    <div class="container">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                         aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto">
                                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="shop-all-user.html">Shop</a></li>
                                <li class="nav-item"><a class="nav-link"  href="my-orders.html">basket(${myOrders.length})</a></li>
                                <li class="nav-item"><a class="nav-link"  href="wishlist.html">wish list</a></li>
                                <li class="nav-item"><a class="nav-link" href="profile.html" >welcome user  ${findedUser.fname} </a></li>
                                <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
                                <li class="nav-item"><a class="nav-link" onclick='logout()' href="index.html">logout</a></li>
                            </ul>
                            
                        </div>
                    </div>
                </nav>
            </div>
            <div class="search_input" id="search_input_box">
                <div class="container">
                    <form class="d-flex justify-content-between">
                        <input type="text" class="form-control" id="search_input" placeholder="Search Here">
                        <button type="submit" class="btn"></button>
                        <span class="lnr lnr-cross" id="close_search" title="Close Search"></span>
                    </form>
                </div>
            </div>
            `;

        } else {
            headerStyle = `
            <div class="main_menu">
                <nav class="navbar navbar-expand-lg navbar-light main_box">
                    <div class="container">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto">
                                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="store-products.html">My products</a></li>
                                <li class="nav-item submenu dropdown">
                                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                                        aria-haspopup="true" aria-expanded="false">adding</a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item"><a class="nav-link" href="add-product.html">products</a></li>
                                        <li class="nav-item"><a class="nav-link" href="add-category.html">category</a></li>
                                        
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="store-orders.html">Orders</a></li>
                                <li class="nav-item"><a class="nav-link" href="profile.html" >welcome admin  ${findedUser.fname} </a></li>
                                <li class="nav-item"><a class="nav-link" href="index.html" onclick='logout()'>Logout</a></li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <li class="nav-item"><a href="#" class="cart"><span class="ti-bag"></span></a></li>
                                <li class="nav-item">
                                    <button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="search_input" id="search_input_box">
                <div class="container">
                    <form class="d-flex justify-content-between">
                        <input type="text" class="form-control" id="search_input" placeholder="Search Here">
                        <button type="submit" class="btn"></button>
                        <span class="lnr lnr-cross" id="close_search" title="Close Search"></span>
                    </form>
                </div>
            </div>
            `;
        }


    } else {
        headerStyle += `
        <div class="main_menu">
			<nav class="navbar navbar-expand-lg navbar-light main_box">
				<div class="container">
					<!-- Brand and toggle get grouped for better mobile display -->
					<a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
						<ul class="nav navbar-nav menu_nav ml-auto">
							<li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
							
							<li class="nav-item submenu dropdown">
								<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
								 aria-expanded="false">Signup</a>
								<ul class="dropdown-menu">
									<li class="nav-item"><a class="nav-link" href="registration.html">Simple user</a></li>
									<li class="nav-item"><a class="nav-link" href="store-signup.html">Admin user</a></li>
								</ul>
							</li>
							<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
							

							<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>

						</ul>
						<ul class="nav navbar-nav navbar-right">
							<li class="nav-item"><a href="#" class="cart"><span class="ti-bag"></span></a></li>
							<li class="nav-item">
								<button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
							</li>
							
						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div class="search_input" id="search_input_box">
			<div class="container">
				<form class="d-flex justify-content-between">
					<input type="text" class="form-control" id="search_input" placeholder="Search Here">
					<button type="submit" class="btn"></button>
					<span class="lnr lnr-cross" id="close_search" title="Close Search"></span>
				</form>
			</div>
		</div>
        `;

    }

    document.getElementById('headerId').innerHTML = headerStyle;

}

// disconnected user
function logout() {

    localStorage.removeItem('connecteUserId');
    location.replace("index.html")
}
//search by category
function mySearchProduct() {
    var products = getObjectsFromLS('products');
    //var nameProduct=document.getElementById('searchName').value;
    var categoryProduct = document.getElementById('searchcategory').value;
    var mySearch = [];

    for (let i = 0; i < products.length; i++) {
        if (products[i].category == categoryProduct && products[i].isConfirm) {

            mySearch.push(products[i]);
        }
    }
    return mySearch;
}
// display all products looking for them
function pageSearch() {
    var mySearch = mySearchProduct();
    var s = mySearch.length;
    console.log(s)
    console.log(mySearch);
    var searchForum = ``;
    for (let i = 0; i < mySearch.length; i++) {
        searchForum += `
        <div class="col-lg-3 col-md-6">
        <div class="single-product">
							<img class="img-fluid" src="img/product/p1.jpg" alt="">
							<div class="product-details">
								<h6>${mySearch[i].name}</h6>
								<div class="price">
									<h6>${mySearch[i].price}</h6>
									<h6 class="l-through">${mySearch[i].price}</h6>
								</div>
                                <h6>${mySearch[i].category}</h6>
                                <h6> stock: ${mySearch[i].stock}</h6>
								<div class="prd-bottom">

									<div href="" class="social-info">
										<span class="ti-bag"></span>
										<button class=" btn hover-text" onclick="goToDisplayProduct(${mySearch[i].id})" style="background-color: white;">info product</button>
									</div>
									<div href="" class="social-info">
										
                                        <span class="lnr lnr-sync"></span>
										<button class="hover-text btn"style="background-color: white;">Delete</button>
									</div>
									
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
						
		</div>`;

    }
    if (s == 0) {
        forum = `
        <div class="text-center">
          <h3>Not FOUND IT</h3>
        </div>
        `;

        document.getElementById('searchId').innerHTML = forum;
    } else {
        document.getElementById('searchId').innerHTML = searchForum;
    }


}
//delete object from Ls with la position
function deleteObjet(pos, key) {
    var object = getObjectsFromLS(key);
    object.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(object));
    location.reload();

}
//return all my wishlist
function myWishlistProduct(idProduct) {

    var connectedUser = getConnectedUserId();

    var idWishlist = JSON.parse(localStorage.getItem('idWishlistKey') || '1');
    var Wishlist = {};
    Wishlist.id = idWishlist;
    Wishlist.idProduct = idProduct;
    Wishlist.idUser = connectedUser;
    var wishlists = JSON.parse(localStorage.getItem('wishlists')) || [];
    wishlists.push(Wishlist);
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
    localStorage.setItem('idWishlistKey', idWishlist + 1);


}
//display the favorites list
function generateWishlistTab() {
    var wishlists = getObjectsFromLS('wishlists');
    console.log('tous les listes favoris', wishlists);
    var connectedUser = getConnectedUserId();
    console.log('l utilisateur', connectedUser);
    var myFavoris = [];
    var wishlistTable = ``;
    for (let i = 0; i < wishlists.length; i++) {
        if (wishlists[i].idUser == connectedUser) {
            myFavoris.push(wishlists[i])
        }
    }
    console.log('les favoris qui le selctionné', myFavoris)
    if (myFavoris.length == 0) {
        wishlistTable = `
    <div class="text-center mt-5 mb-5">
        <h2>wishlist vide</h2>
    </div>`;
    } else {

        wishlistTable = `  
<table class="table">
<thead>
    <tr>
        <th scope="col">Product</th>
        <th scope="col">Price</th>
        <th scope="col">category</th>
        
        <th style="col"> Actions</th>
    </tr>
</thead>`;

        for (let i = 0; i < myFavoris.length; i++) {
            var myfarvor = searchProductById(myFavoris[i].idProduct);
            console.log(myfarvor)
            console.log(myFavoris[i].id)

            wishlistTable = wishlistTable + `
     
     <tbody>
                        <tr>
                            <td>
                                <div class="media">
                                    <div class="d-flex">
                                        <img src="img/cart.jpg" alt="">
                                    </div>
                                    <div class="media-body">
                                        <p>${myfarvor.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h5>${myfarvor.price}</h5>
                            </td>
                            <td>
                                <h5>${myfarvor.category}</h5>
                            </td>
                            
                            <td>
                                <button class="btn btn-danger" onclick="deleteObjet(${getObjectPositionById(myFavoris[i].id, wishlists)},'wishlists')">delete</button>
                                <button class="btn btn-success" onclick="goToReserveIt(${myFavoris[i].idProduct})">reserve</button>

                            </td>
                        </tr> `

        }
        // console.log('la position fel Ls ',getObjectPositionById(myFavoris.id,wishlists));

        wishlistTable = wishlistTable + `</table>`;
    }

    document.getElementById('wishlistId').innerHTML = wishlistTable;
}
//reserve product from wishlist
function goToReserveIt(id) {
    var products = getObjectsFromLS('products');
    console.log(products);
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            location.replace("display-product.html");
            break;
        }

    }

}
// that returns all admin orders
function adminOrders() {
    var allProducts = getObjectsFromLS('products');
    console.log('tous les produits', allProducts);
    var connectedUser = getConnectedUserId();
    console.log('l admin est ', connectedUser);
    var productsAdmin = [];
    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].idUser == connectedUser) {
            productsAdmin.push(allProducts[i])
        }

    }
    console.log('les produits qui l ajout par admin', productsAdmin)
    var allOrders = getObjectsFromLS('myOrders');
    console.log('tous les ordres', allOrders)
    var ordersAdmin = [];
    for (let i = 0; i < allOrders.length; i++) {
        for (let j = 0; j < productsAdmin.length; j++) {
            if (allOrders[i].idProduct == productsAdmin[j].id) {
                ordersAdmin.push(productsAdmin[j])

            }

        }

    }
    if (ordersAdmin.length == 0) {
        var adminOrdersTab = `
        <div class="text-center mt-5 mb-5">
            <h1> No orders</h1>
        </div>`;
    } else {
        console.log('l objet des ordres', ordersAdmin);
        var total = 0;
        var adminOrdersTab = `
                          <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit price</th>
                                    <th scope="col">Total HT</th>
                                    <th scope="col">Total TTC</th>
                                    <th scope="col">First name</th>
                                    <th scope="col">Last name</th>
                                    <th scope="col">Tel</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody> `;
        for (let i = 0; i < ordersAdmin.length; i++) {
            var adminOrder = ordersAdmin[i];
            for (let j = 0; j < allOrders.length; j++) {
                if (adminOrder.id == allOrders[j].idProduct) {
                    console.log(`totale : ${total += allOrders[j].qty * adminOrder.price} `);
                    adminOrdersTab = adminOrdersTab + `
                    
                        
                                <tr>
                                    <td>
                                        <p>${adminOrder.name}</p>
                                    </td>
                                    <td>
                                        <h5>x ${allOrders[j].qty}</h5>
                                    </td>
                                    <td>
                                        <p>${adminOrder.price}</p>
                                    </td>
                                    <td>
                                        <p>£${allOrders[j].qty * adminOrder.price}</p>
                                    </td>
                                    <td>
                                        <p>£${allOrders[j].qty * adminOrder.price * 1.21}</p>
                                    </td>
                                    <td>
                                        <p>${searchUserById(allOrders[j].idUser).fname}</p>
                                    </td>
                                    <td>
                                        <p>${searchUserById(allOrders[j].idUser).lname}</p>
                                    </td>
                                    <td>
                                        <p>${searchUserById(allOrders[j].idUser).tel}</p>
                                    </td>
                                    <td>
                                    <button class="btn btn-info" onclick="confirmOrders(${allOrders[j].id})">Confirm</button>
                                </td>
                                </tr>`;
                }
            }
        }
        adminOrdersTab = adminOrdersTab + `
        <tr>
        <td>
            <h4>Subtotal</h4>
        </td>
        <td>
            <h5></h5>
        </td>
        <td>
            <p>£${total}</p>
        </td>
    </tbody>
    </table> `;
    }

    document.getElementById('adminOrdersId').innerHTML = adminOrdersTab;

}
//to update order status to true
function confirmOrders(id) {
    var myOrders = getObjectsFromLS('myOrders');
    for (let i = 0; i < myOrders.length; i++) {
        if (myOrders[i].id == id) {
            myOrders[i].status = true;
            break;
        }
    }
    localStorage.setItem('myOrders', JSON.stringify(myOrders));
}

function BillingDetais() {
    var fname = document.getElementById('firstBillingId').value;
    var lname = document.getElementById('lastBillingId').value;
    var company = document.getElementById('companyBillingId').value;
    var number = document.getElementById('numberBillingId').value;
    var email = document.getElementById('emailBillingId').value;
    var country = document.getElementById('countryBillingId').value;
    var add1 = document.getElementById('add1BillingId').value;
    var add2 = document.getElementById('add2BillingId').value;
    var city = document.getElementById('cityBillingId').value;
    var district = document.getElementById('districtBillingId').value;
    var zip = document.getElementById('zipBillingId').value;
    var idBilling = JSON.parse(localStorage.getItem('idBillingKey') || '1');

    var billing = {};
    billing.id = idBilling;
    billing.fname = fname;
    billing.lname = lname;
    billing.company = company;
    billing.number = number;
    billing.email = email;
    billing.country = country;
    billing.add1 = add1;
    billing.add2 = add2;
    billing.city = city;
    billing.district = district;
    billing.zip = zip;

    var billingDetais = JSON.parse(localStorage.getItem('billingDetais')) || [];
    billingDetais.push(billing);
    localStorage.setItem('billingDetais', JSON.stringify(billingDetais));
    localStorage.setItem('idBillingKey', idBilling + 1);
    console.log(billingDetais);




}
function generateBellingTab() {
    var ordres = getObjectsFromLS('myOrders')
    console.log('tous les Orders test', ordres)
    var connecteUserId = getConnectedUserId();
    console.log('l utisateur', connecteUserId)
    var myOrder = [];
    for (let i = 0; i < ordres.length; i++) {
        if (ordres[i].idUser == connecteUserId && ordres[i].status) {
            myOrder.push(ordres[i])
        }
    }
    console.log('mes ordres', myOrder);
    var ordersTable = ``;
    console.log('logeur table des ordres qui reservé', myOrder.length)
    if (myOrder.length == 0) {
        ordersTable = `
        <div class="text-center mt-5 mb-5">
							<h2>basket vide</h2>
						</div>`;
    } else {
        ordersTable = `  
        <ul class="list">
        <li><a href="#">Product <span>Total</span></a></li> `;
        var total = 0;
        for (let i = 0; i < myOrder.length; i++) {
            order = myOrder[i];
            console.log(order.idProduct)
            var myOrdersReseve = searchProductById(order.idProduct)
            console.log('l objet de notre product', myOrdersReseve)
            ordersTable = ordersTable + `

            <li><a href="#">${myOrdersReseve.name}<span class="middle">x ${order.qty}</span> <span class="last">$${order.qty * myOrdersReseve.price}</span></a></li>
            </ul>`;
            total = total + order.qty * myOrdersReseve.price;
        }
        ordersTable = ordersTable + `
        <ul class="list list_2">
                                
        <li><a href="#">Total <span>$${total}</span></a></li>
        </ul>
            `;
    }
    document.getElementById('bellingId').innerHTML = ordersTable;
}
function generateCheckBoxTab() {
    var products = getObjectsFromLS('products');
    console.log('tout les produits :', products)
    productTable = `  
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">gategory</th>
            <th style="col"> Actions</th>
        </tr>
    </thead>`;

    for (let i = 0; i < products.length; i++) {
        product = products[i];
        productTable = productTable + `
         
         <tbody>
                            <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${product.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${product.price}</h5>
                                </td>
                                <td>
                                    <h5>${product.stock}</h5>
                                </td>
                                <td>
                                    <h5>${product.category}</h5>
                                </td>
                                <td>
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="${product.id}" onclick="getPosCheck(this)" >
                                
                              </div>
                                </td>
            
                            </tr> `


    }
    productTable = productTable + ` </tbody> </table>
        <div class="text-center mb-5">
        <button class="btn btn-danger" onclick="deleteAllChecked()">delete</button>
        </div>
        `;


    document.getElementById('checkId').innerHTML = productTable;

}
var checkRows = [];
//that add checked row id to array
function getPosCheck(element) {
    checkRows.push(element.id)
    console.log(checkRows);
}
//THET LOOPS ALL PRODUCTS AND DELETE CHECHED ROWS
function deleteAllChecked() {
    console.log(checkRows)
    var products = getObjectsFromLS('products');
    for (let i = 0; i < checkRows.length; i++) {
        if (checkRows[i].checked) {
            products.splice(getObjectPositionById(Number(checkRows[i]), products), 1);
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();

}



