const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes:
    [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryInfo => res.json(dbCategoryInfo))
  .catch(err => res.status(404).json(err))
});
  
  
  router.get('/:id', (req, res) => {
    // find one category by its 'id' value
    // be sure to include its associated Products
  Category.findOne({
  where: {
    id: req.params.id

  },
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  ]
})
.then(dbCategoryInfo => {
  if(!dbCategoryInfo){
    res.status(404).json({ message: 'Pause before you skip entering categories here.'});
      return;
    }
    res.json(dbCategoryInfo)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  });
  // be sure to include its associated Products

  router.post('/', (req, res) => {
    // create a new category
    Category.create({
      category_name: req.body.category_name,
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'please follow enter category in correct format'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  });
  
  router.put('/:id', (req, res) => {
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'please try again'});
        return;
      }
      res.json(dbCategoryData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  });
  
  router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'delete not an option'});
        return;
      }
      res.json(dbCategoryData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  });
  
  module.exports = router;