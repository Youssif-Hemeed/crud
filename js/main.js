var productsArray =[]
var mainButton = document.getElementById('mainButton')
var title = document.getElementById('title')
var price = document.getElementById('price')
var ads = document.getElementById('ads')
var taxes = document.getElementById('taxes')
var discount = document.getElementById('discount')
var count = document.getElementById('count')
var category = document.getElementById('category')
var total = document.getElementById('total')
var search = document.getElementById('search')
var z
var upDateMode ="create"
var VarDeleteAll =document.getElementById('btnDeleteAll')

// total======
function getTotal(){
    var results =(+price.value + +ads.value + +taxes.value - +discount.value)


if(price.value!=""){

    document.getElementById('total').innerHTML = results
    total.style.cssText="background-color:#dc3545;"

}
else {
    document.getElementById('total').innerHTML = ""
}

}

price.addEventListener('keyup' , getTotal )
ads.addEventListener('keyup' , getTotal )
taxes.addEventListener('keyup' , getTotal )
discount.addEventListener('keyup' , getTotal )

// clear=========
function clearData(){
    title.value=""
    price.value=""
    ads.value=""
    taxes.value=""
    discount.value=""
    count.value=""
    category.value=""
    search.value=""

}
// delete item=====
function removeItem(index){
productsArray.splice(index,1)
localStorage.setItem('products',JSON.stringify(productsArray))

displayItems()
} 

//  UPDATE item
function updateItem (y){
    title.value=productsArray[y].proTitle
    price.value=productsArray[y].proPrice
    ads.value=productsArray[y].proAds
    taxes.value=productsArray[y].proTaxes
    category.value=productsArray[y].proDiscount
    total.innerHTML=productsArray[y].proTotal
    upDateMode="update"
z=y
mainButton.innerHTML="UpDATE"
mainButton.style.backgroundColor="#198754"

mainButton.style.color="#fff"
}
// delete all========
function deleteAllPro(){
localStorage.clear()
productsArray.splice(0)
displayItems()

}
// refresh=======
if(localStorage.getItem('products') !=null){
    productsArray =JSON.parse(localStorage.getItem('products'))
    displayItems()
    clearData()
}
// display function ==========
function displayItems(){
    var box=``
for(var i=0;i<productsArray.length;i++){
box+=`

   <tr>
  <td>${i+1}</td>
  <td>${productsArray[i].proTitle}</td>
  <td>${productsArray[i].proPrice}</td>
  <td>${productsArray[i].proAds}</td>
  <td>${productsArray[i].proTaxes}</td>
 <td>${productsArray[i].proTaxes}</td>
 <td>${productsArray[i].proTotal}</td>
    <td>${productsArray[i].proCategory}</td>

  <td><button  class="btn btn-outline-danger " onclick="removeItem(${i})" >DELETE</button></td>

  <td><button class="btn btn-outline-success" onclick="updateItem(${i})" >UPDATE</button></td>

 </tr>

`


}
document.getElementById('demo').innerHTML = box
if(productsArray.length>0){
    document.getElementById('deleteAll').innerHTML =`
    <button onclick="deleteAllPro()" id="btnDeleteAll" class="col-md-10 offset-md-1 my-3 btn  fs-5" >DELETE ALL</button>
    
    `

} else {
    document.getElementById('deleteAll').innerHTML =''
}
    
}

mainButton.addEventListener('click' , getProducts )

function getProducts(){
    var productObject={
      proTitle:title.value,
       proPrice:price.value,  
       proAds:ads.value,  
       proTaxes:taxes.value,  
       proDiscount:discount.value,  
      proCategory:category.value,  
      proTotal:total.innerHTML,
      proCount:count.value,
    }




if( upDateMode =="create"){
    // productsArray.unshift(productObject)
mainButton.style.backgroundColor="#dc3545"

if(count.value>1){
    for(var i=0;i<count.value;i++){
        productsArray.unshift(productObject)
    
    }
    }else{
        productsArray.unshift(productObject)
    
    }

}
else {
    productsArray[z]=productObject
}


upDateMode ="create"
mainButton.innerHTML="CREATE"
mainButton.style.backgroundColor="#dc3545"
mainButton.style.color="#fff"

localStorage.setItem('products',JSON.stringify(productsArray))
displayItems()
clearData()

}


// search



    var searchMood ="title"

    function getSearchMood(id){
if (id=='searchTitle'){
    searchMood ="title"
    search.Placeholder = 'search by title'

}else {
    searchMood ="category";
    search.Placeholder= 'search by category'
}

search.focus()
    }




    function searchItem(item){
if(    searchMood =="title"){

    var box=``
    
    for(i=0;i<productsArray.length;i++){
        if(productsArray[i].proTitle.toLowerCase().includes(item.toLowerCase()) == true)
{

box+=`

   <tr>
  <td>${i+1}</td>
  <td>${productsArray[i].proTitle.replace(item,`<span>${item}</span>`)}</td>
  <td>${productsArray[i].proPrice}</td>
  <td>${productsArray[i].proAds}</td>
  <td>${productsArray[i].proTaxes}</td>
 <td>${productsArray[i].proTaxes}</td>
 <td>${productsArray[i].proTotal}</td>
    <td>${productsArray[i].proCategory}</td>

  <td><button  class="btn btn-warning " onclick="removeItem(${i})" >DELETE</button></td>

  <td><button class="btn btn-success" onclick="updateItem(${i})" >UPDATE</button></td>

 </tr>

`


}
document.getElementById('demo').innerHTML = box
}
}
else{
    var box=``
    
    for(i=0;i<productsArray.length;i++){
        if(productsArray[i].proCategory.toLowerCase().includes(item.toLowerCase()) == true)
{

box+=`

   <tr>
  <td>${i+1}</td>
  <td>${productsArray[i].proTitle}</td>
  <td>${productsArray[i].proPrice}</td>
  <td>${productsArray[i].proAds}</td>
  <td>${productsArray[i].proTaxes}</td>
 <td>${productsArray[i].proTaxes}</td>
 <td>${productsArray[i].proTotal}</td>
    <td>${productsArray[i].proCategory.replace(item,`<span>${item}</span>`)}</td>

  <td><button  class="btn btn-warning " onclick="removeItem(${i})" >DELETE</button></td>

  <td><button class="btn btn-success" onclick="updateItem(${i})" >UPDATE</button></td>

 </tr>

`


}
document.getElementById('demo').innerHTML = box
}
}


 }