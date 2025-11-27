const productsApi= "https://fakestoreapi.com/products";
const categoriesApi = "https://fakestoreapi.com/products/categories";

let allProductsList = [];

function displayCardProducts(products){
       const cardContainer = document.getElementById("cardsContainer");
     cardContainer.innerHTML = '';
     products.forEach(product=>{
        const productCard= document.createElement("div");
        productCard.innerHTML=` <a href="product_info.html?id=${product.id}" class="block">
    <div class="bg-white rounded-xl h-[490px] shadow-xl overflow-hidden flex flex-col">
      <img src="${product.image}" alt="" class="w-full h-80  flex-shrink-0">
      <div class="p-5 flex flex-col flex-grow justify-between">
        <div class="flex items-start justify-between mb-4">
          <div class="flex flex-col flex-grow overflow-hidden">
            <h3 class="text-xl font-semibold text-[#333333] line-clamp-2">${product.title}</h3>
            <h6 class="text-lg text-[#717070]">${product.category}</h6>
          </div>
          <p class="text-lg font-semibold text-[#333333] ml-4">$${product.price}</p>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="99" height="33" viewBox="0 0 99 33" fill="none" class="flex-shrink-0">
              <path d="M13.2 21.5188L16.5 18.975L19.8 21.5188L18.5625 17.325L21.6562 15.125H17.8062L16.5 10.8625L15.1937 15.125H11.3437L14.4375 17.325L13.2 21.5188ZM10.5737 25.2258L12.793 17.897L7.03311 13.75H14.2051L16.5 6.13525L18.7962 13.75H25.9669L20.207 17.897L22.4262 25.2258L16.5 20.7213L10.5737 25.2258Z" fill="#FFE100"/>
              <path d="M46.2 21.5188L49.5 18.975L52.8 21.5188L51.5625 17.325L54.6562 15.125H50.8062L49.5 10.8625L48.1937 15.125H44.3437L47.4375 17.325L46.2 21.5188ZM43.5737 25.2258L45.793 17.897L40.0331 13.75H47.2051L49.5 6.13525L51.7962 13.75H58.9669L53.207 17.897L55.4262 25.2258L49.5 20.7213L43.5737 25.2258Z" fill="#FFE100"/>
              <path d="M79.2 21.5188L82.5 18.975L85.8 21.5188L84.5625 17.325L87.6563 15.125H83.8063L82.5 10.8625L81.1938 15.125H77.3438L80.4375 17.325L79.2 21.5188ZM76.5738 25.2258L78.793 17.897L73.0331 13.75H80.2051L82.5 6.13525L84.7963 13.75H91.9669L86.207 17.897L88.4263 25.2258L82.5 20.7213L76.5738 25.2258Z" fill="#FFE100"/>
            </svg>
            <span class="text-sm text-[#717070]">${product.rating.rate} (${product.rating.count} reviews)</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 480 480" class="flex-shrink-0">
          <g><path d="M348 0c-43 .066-83.281 21.04-108 56.223A132.242 132.242 0 0 0 132 0C61.68 0 0 65.426 0 140c0 72.68 41.04 147.535 118.688 216.48a638.51 638.51 0 0 0 117.64 82.625 8.015 8.015 0 0 0 7.344 0 638.546 638.546 0 0 0 117.601-82.625C438.961 287.535 480 212.68 480 140 480 65.426 418.32 0 348 0zM240 422.902C210.617 406.688 16 293.406 16 140 16 73.945 70.2 16 132 16c41.867.074 80.46 22.66 101.031 59.129 1.54 2.351 4.16 3.766 6.969 3.766s5.43-1.415 6.969-3.766C267.539 38.66 306.133 16.074 348 16c61.8 0 116 57.945 116 124 0 153.406-194.617 266.688-224 282.902zm0 0" fill="#000000"></path></g>
          </svg>
        </div>
      </div>
    </div>
  </a>`; 
  cardContainer.appendChild(productCard);
     });
}

async function fetchProducts(){
   try{
     const response = await fetch(productsApi);
     const products = await response.json();
     allProductsList=products;
     displayCardProducts(allProductsList);
   }catch(error){
      console.error("Error fetching products:", error);
   } 
}

async function fetchCategories() {
    try{
        const response = await fetch(categoriesApi);
        const categories = await response.json();
        const dropDownContainer = document.getElementById("categoryDropDown");
        dropDownContainer.innerHTML = '';
        categories.forEach(category=>{
            const categoryItem = document.createElement("li");
            categoryItem.innerHTML = `<a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">${category}</a>`;
            dropDownContainer.appendChild(categoryItem);
        });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
    }
    
}

function filterProducts(filters){
  let filteredItems = [...allProductsList];

  if(filters.search && filters.search.trim()!== ""){
    filteredItems = filteredItems.filter(input=> input.title.toLowerCase().includes(filters.search));
  }

  if(filters.category && filters.category !== "all"){
    filteredItems = filteredItems.filter(choosenCategory => choosenCategory.category.toLowerCase()=== filters.category.toLowerCase());
  }

  displayCardProducts(filteredItems);
}

function liveSearch(){
  const inputSearch = document.getElementById("search");
  
  inputSearch.addEventListener("input", function(){
    const value= this.value.toLowerCase();
    filterProducts({search:value});
  });
}

function filterByCategory(){
  const selectedCategory= document.getElementById("categoryDropDown");

  selectedCategory.addEventListener("click",function(event){
    const target = event.target;
    if(target.tagName === "A"){
      const category = target.textContent.toLowerCase();
       filterProducts({category: category});
    }
   
  });
}

async function getProducts(){
  const response = await fetch('https://fakestoreapi.com/products');
  return await response.json();
}

function filterTopRatedProducts(products){
  return products.sort((a,b)=> b.rating.rate - a.rating.rate).slice(0,5);
}

async function fetchTopRatedProducts() {
  const allProducts = await getProducts();
  const topRatedProducts = filterTopRatedProducts(allProducts);
  const carouselContainer = document.getElementById("product-carousel");
  carouselContainer.innerHTML = topRatedProducts
    .map((product, index) => {
      const activeAttr = index === 0 ? 'data-carousel-item="active"' : 'data-carousel-item';
      return `
      <div class="hidden duration-700 ease-in-out" ${activeAttr}>
        <div class="relative h-full w-full">
          <img src="${product.image}" alt="${product.title}" class="object-cover w-full h-full rounded-md bg-[#FBCC54]">
          <div class="absolute inset-0 bg-black/40 rounded-xl"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <h3 class="text-lg font-semibold">${product.title}</h3>
            <p class="text-sm opacity-80">${product.category}</p>
          </div>
          <div class="absolute bottom-4 right-4 text-white text-lg font-semibold">
            $${product.price}
          </div>
        </div>
      </div>`;
    })
    .join("");

  }

document.addEventListener("DOMContentLoaded", function(){
fetchCategories();
fetchProducts();
filterByCategory();
liveSearch();
// fetchTopRatedProducts();
});


 

async function fetchProductDetails() {
  const productId = new URLSearchParams(window.location.search).get("id");
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const productDetails = await response.json();

  displayProductDetails(productDetails);
}

function displayProductDetails(product){
  const productDetailsContainer = document.getElementById("productDetails");
  productDetailsContainer.innerHTML = '';
  productDetailsContainer.innerHTML = `
    <img src="${product.image}" alt="" class="h-110 w-90 object-cover mt-10 rounded-md"> 
     <div class="flex flex-col justify-start mt-5 space-x-20 ml-16">
        <h2 class="text-4xl font-bold text-[#333333]">${product.title}</h2>
        <h6 class="text-lg text-[#717070]"> ${product.category}</h6>
        <div class="flex flex-col justify-start items-start space-y-2 md:flex md:flex-row md:justify-start md:items-center lg:flex lg:flex-row lg:justify-start lg:items-center lg:space-x-2 lg:my-4">
            <p class="text-xl font-semibold text-[#333333]">$ ${product.price} \t.</p>
           
            <svg xmlns="http://www.w3.org/2000/svg" width="99" height="33" viewBox="0 0 99 33" fill="none">
            <path d="M13.2 21.5188L16.5 18.975L19.8 21.5188L18.5625 17.325L21.6562 15.125H17.8062L16.5 10.8625L15.1937 15.125H11.3437L14.4375 17.325L13.2 21.5188ZM10.5737 25.2258L12.793 17.897L7.03311 13.75H14.2051L16.5 6.13525L18.7962 13.75H25.9669L20.207 17.897L22.4262 25.2258L16.5 20.7213L10.5737 25.2258Z" fill="#FFE100"/>
            <path d="M46.2 21.5188L49.5 18.975L52.8 21.5188L51.5625 17.325L54.6562 15.125H50.8062L49.5 10.8625L48.1937 15.125H44.3437L47.4375 17.325L46.2 21.5188ZM43.5737 25.2258L45.793 17.897L40.0331 13.75H47.2051L49.5 6.13525L51.7962 13.75H58.9669L53.207 17.897L55.4262 25.2258L49.5 20.7213L43.5737 25.2258Z" fill="#FFE100"/>
           <path d="M79.2 21.5188L82.5 18.975L85.8 21.5188L84.5625 17.325L87.6563 15.125H83.8063L82.5 10.8625L81.1938 15.125H77.3438L80.4375 17.325L79.2 21.5188ZM76.5738 25.2258L78.793 17.897L73.0331 13.75H80.2051L82.5 6.13525L84.7963 13.75H91.9669L86.207 17.897L88.4263 25.2258L82.5 20.7213L76.5738 25.2258Z" fill="#FFE100"/>
           </svg>
            <p class="text-md text-[#717070]">${product.rating.rate} (${product.rating.count} reviews)</p>
        </div>
        <div class="flex flex-col mt-5">
            <h4 class="text-2xl font-bold text-[#333333] mb-2">Amount</h4>
            <div class="flex items-center space-x-1 mb-6">

  <button type="button" data-input-counter-decrement="counter-input"
    class="w-10 h-10 flex items-center justify-center text-[#333333] bg-gray-200 rounded-lg shadow-lg hover:bg-gray-300">
    –
  </button>
  <input type="text" id="counter-input" data-input-counter
    class="w-14 h-10 text-center bg-white border border-gray-300 rounded-lg shadow-lg"
    placeholder="0" value="1">
  <button type="button" data-input-counter-increment="counter-input"
    class="w-10 h-10 flex items-center justify-center text-[#333333] bg-gray-200 rounded shadow-lg hover:bg-gray-300">
    +
  </button>

</div>
        </div>
        <button class="w-80 bg-[#FBCC54] text-white px-6 py-3 rounded-md hover:bg-[#FFD200] transition duration-300 mb-1">Add to Cart</button>
        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400 mb-7">
        <h3 class="text-2xl font-semibold text-[#333333] mb-4">Product Description</h3>
     <p class="text-gray-500 mr-17">${product.description}</p>
 </div>`;
}

document.addEventListener("DOMContentLoaded",fetchProductDetails);


