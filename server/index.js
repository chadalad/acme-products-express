const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const readFileP = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(err);
      else res(JSON.parse(data.toString()));
    });
  });
};

const writeFileP = (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) rej(err);
      else res();
    });
  });
};

const app = express();

const PORT = process.env.PORT || 3000;

const DB_PATH = path.join(__dirname, './products.json');

//  Logging MiddleWare
app.use((req, res, next) => {
  console.log(chalk.cyan(`Request made to ${req.path}`));

  next();
});

//  JSON Middleware
app.use(express.json());

//  Data Layer Middleware
app.use((req, res, next) => {
  readFileP(DB_PATH)
    .then(data => {
      req.products = data;
      next();
    });
});

//  GET / - returns index.html page which loads/contains front end code

//  GET /api/products - returns products
// app.get('/products', (req, res) => {
//   readFileP(path.join(__dirname, './products.json'))
//     .then(data => res.send({ products: data }));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/index.html'));
});

app.get('/api/products', (req, res) => {
  res.send({
    products: req.products,
  });
});

app.get('/api/products/:name', (req, res) => {
  const { name } = req.params;

  res.send({
    selectedProduct: req.products[name]
      ? {
        name: name,
        ...req.products[name],
      }
      : null,
  });
});


//  POST /api/products - creates a product 
//  and returns the newly created product
//  and returns a 201 response
app.post('/api/products/:name', (req, res) => {
  const { name } = req.params;
  const { type, price } = req.body;
  console.log('req.body: ',req.body);

  if (req.products[name]) {
    res.status(400).send({
      message: `Product ${name} already exists.`,
    });
  } 
  else if(typeof type !== 'string' || typeof price !== 'number') {
    res.status(400).send({
      message: 'Body of request must contain a "type" of type "string" and a "price" of type "number"',
    });
  } 
  else {
    const newProduct = {
      ...req.products,
      [name]: {
        type,
        price,
      },
    };

    writeFileP(DB_PATH, newProduct)
      .then(() => {
        res.status(201).send({
          message: `Product ${name} added as a new Product!`,
        })
      });
  }
});

//  DELETE /api/products/:id - deletes a product
//  and returns a 204 response
app.delete('/api/products/:name', (req, res) => {
  const { name } = req.params;

  if (!req.products[name]) {
    res.status(400).send({
      message: `Product ${name} does not exist in product offerings`,
    });
  } else {
    delete req.products[name];

    writeFileP(DB_PATH, req.products)
      .then(() => {
        res.status(204).send({
          message: `Product ${name} removed from product offerings`,
        });
      });
  }
});

//  Structure: { name : <PRODUCT_NAME> }
// app.get('/test', (req, res, next) => {
//   res.send({
//     message: 'Test successful!',
//   })
// });

// app.get('/error', () => {
//   throw new Error('something went wrong')
// })

//  Not Found Middleware
app.use((req, res, next) => {
  console.log('Got to Not Found Middleware!');
  res.status(404).send({
    message: `Webpage not found at ${req.path}`,
  });
});



//  Error Middleware
app.use((err, req, res, next) => {
  console.log('Hit error middleware');

  res.send({
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
});
