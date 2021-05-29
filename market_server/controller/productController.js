const productService = require('../service/productService');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');

module.exports = {
  registerProduct: async (req, res) => {
    const imageUrls = req.files.map(file => file.location);

    const {
      name,
      price,
      count,
      category,
      detail,
      delivery
    } = req.body;

    await productService.register(
      name,
      imageUrls,
      price,
      count,
      category,
      detail,
      delivery,
      res);

    return res;
  },
  findProductById: async (req, res) => {
    const {
      id
    } = req.params;
    await productService.findProduct(id, res);

    return res;
  },
  findAllProduct: async (req, res) => {
    await productService.findAll(res);

    return res;
  },
  findRecentProduct: async (req, res) => {
    await productService.findRecent(res);

    return res;
  },
  findAllProductByOneCategory: async (req, res) => {
    const {
      category
    } = req.params;
    await productService.findByOneCategory(category, res);

    return res;
  },
  findAllProductByAerobic: async (req, res) => {
    await productService.findAerobic(res);

    return res;
  },
  findAllProductByWeight: async (req, res) => {
    await productService.findWeight(res);

    return res;
  },
  findAllProductByAids: async (req, res) => {
    await productService.findAids(res);

    return res;
  },
  findAllProductByMassage: async (req, res) => {
    await productService.findMassage(res);

    return res;
  },
  findAllProductByAssistant: async (req, res) => {
    await productService.findAssistant(res);

    return res;
  },
  findAllProductBySearch: async (req, res) => {
    const {
      title
    } = req.query;
    console.log("Hello! " + title);
    await productService.search(title, res);
    
    return res;
  },
  findAllProductBySearchDetail: async (req, res) => {
    const {
      title,
      category,
      minPrice,
      maxPrice
    } = req.query;
    console.log("title: " + title);
    console.log("category: " + category);
    console.log("minPrice: " + minPrice);
    console.log("maxPrice: " + maxPrice);
    await productService.searchDetail(title, category, minPrice, maxPrice, res);
    
    return res;
  },
  updateProductById: async (req, res) => {
    let imageUrls = req.files.map(file => file.location);
    const {
      id,
      name,
      price,
      count,
      category,
      detail,
      imgs,
      delivery
    } = req.body;

    if(imgs) {
      imageUrls = imageUrls.concat(imgs);
      console.log("imageUrl: " + imageUrls);
    }

    await productService.updateProduct(
      id,
      name,
      imageUrls,
      price,
      count,
      category,
      detail,
      delivery,
      res);

    return res;
  },
  deleteProductById: async (req, res) => {
    const {
      id
    } = req.params;
    await productService.deleteProduct(id, res);

    return res;
  },
  uploadImgs: async (req, res) => {
    const imageUrls = req.files.map(file => file.location);

    console.log(req.files);
    console.log(req.body);

    const uploadedImgs = {
      imageUrls: imageUrls,
      file: req.files,
      body: req.body
    }

    return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, 'IMAGES UPLOAD SUCCESS', uploadedImgs));
  }
}