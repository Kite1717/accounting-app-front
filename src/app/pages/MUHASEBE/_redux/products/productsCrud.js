import axios from "axios";

export const PRODUCTS_URL = "/product";

// CREATE =>  POST: add a new product to the server
export function createProduct(product) {
  return axios.post(`${PRODUCTS_URL}/new`, { product });
}

// READ
export function getAllProducts() {
  return axios.get(PRODUCTS_URL);
}

export function getProductById(productId) {
  return axios.get(`${PRODUCTS_URL}/${productId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProducts(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the product on the server
export function updateProduct(product) {
  return axios.put(`${PRODUCTS_URL}/${product.id}`, { product });
}

// UPDATE Status
export function updateStatusForProducts(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForProducts`, {
    ids,
    status
  });
}

// DELETE => delete the product from the server
export function deleteProduct(productId) {
  return axios.delete(`${PRODUCTS_URL}/${productId}`);
}

// DELETE Products by ids
export function deleteProducts(ids) {
  return axios.post(`${PRODUCTS_URL}/deleteProducts`, { ids });
}

//create super category
export function createSuperCategory(category) {
  return axios.post(`/product-category/new/super-category`,{category});
}
//create category
export function createCategory(category) {
  return axios.post(`/product-category/new/category`,{category});
}

// create sub category 
export function createSubCategory(category) {
  return axios.post(`/product-category/new/sub-category`,{category});
}



// get all super categories
export function findSuperProductCategories() {
  return axios.get(`/product-category/super-category/all`);
}


// get all  categories
export function findProductCategories() {
  return axios.get(`/product-category/category/all`);
}


//**************** */




//find available super cat
export function findAvailableSuperCat() {
  return axios.get(`/product-category/super-category/available`);
}



// find available cat
export function findAvailableCat() {
  return axios.get(`/product-category/category/available`);
}


// fetch all sub cat



export function findAllSubCat() {
  return axios.get(`/product-category/sub-category/all`);
}









/******************* */
