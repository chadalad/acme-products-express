/*
Commands to run in the terminal:
43:37
npm run start:dev
curl command for:
  curl localhost:3000/products

To Do:
  - GET / - returns index.html page which loads (or contains) your front end code [COMPLETE]
  - GET /api/products - returns your products [COMPLETE]
  - POST /api/products 
    - creates a product and [COMPLETE]
    - returns the newly created product and [COMPLETE]
    - returns a 201 response [COMPLETE]
  - DELETE /api/products/:id 
    - deletes a product and [COMPLETE]
    - returns a 204 response [COMPLETE]

  Remaining:
    - Front End
      - Routing
      - Webpack (includes auto reload)
      - CSS
    - .gitignore [COMPLETE]

  Front End:
    Functionality:
      - Delete product [COMPLETE]
      - Create product [COMPLETE]

    Routing:
      - Home Route
      - Products Route (w/ num products)
      - Products Creation Route (Form)
        - after product creation, routes to products route (componentDidUpdate?)
          - ^this could be an auto update to then route back to '/' path

    Styling:
      - Add CSS 

    Codebase:
      - Refactor code into using a .js file for react
      - Use Webpack
      - Have webpage reload upon update (submitting/deleting product)
      - Stop using CDNs

    Make products a functional component
    create would a functional component
    wherever I keep state is where I would need to have the axios get (unless I use component did mount)
    products component as prop?
    maybe as d

*/