const productService = require('../service/productService');

module.exports = {
  registerProduct: async (req, res) => {
    const imgFile = req.file;
    const {
      name,
      price,
      count,
      category
    } = req.body;

    await productService.register(
      name,
      imgFile,
      price,
      count,
      category,
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
  updateProductById: async (req, res) => {
    const imgFile = req.file;
    const {
      id,
      name,
      price,
      count,
      category
    } = req.body;

    await productService.updateProduct(
      id,
      name,
      imgFile,
      price,
      count,
      category,
      res);

    return res;
  },
  deleteProductById: async (req, res) => {
    const {
      id
    } = req.params;
    await productService.deleteProduct(id, res);
  }
}