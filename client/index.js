import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// class App extends Component {
//   render() {
//     return (
//       <h1>
//         You've figured out webpack!
//       </h1>
//     )
//   }
// }

// const app = document.getElementById('app');

// ReactDOM.render(
//   <App />,
//   app,
//   () => {
//     console.log('Congrats!');
//   }
// )

class App extends Component {
  constructor() {
    super();

    this.state = {
      products: null,
      inputVal: '',
    };

    this.getInfo = this.getInfo.bind(this);
  }

  getInfo() {
    axios.get('http://localhost:3000/api/products')
      .then(res => {
        // console.log(res.data.products);
        this.setState({
          products: res.data.products,
        })
      })
      .catch(e => {
        console.log('Failed to set products on state');
        console.error(e);
      });
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { products, inputVal } = this.state;

    if(products) {
      // console.log(Object.keys(products));
      const productsArr = Object.keys(products);
      console.log(productsArr);
    }

    return (
      <React.Fragment>
        <h1> Acme Products </h1>
        <h3> Home </h3>
        <h3> Products ({products ? Object.keys(products).length : 0}) </h3>
        {
          products 
          && 
          <ul> 
            {Object.keys(products).map((product, idx) => {
              return(
                <li 
                  key={idx}
                >
                  <span>{product}</span>
                  <button
                    onClick={ () => { //  make a delete call using the endpoint
                      axios.delete(`http://localhost:3000/api/products/${product}`)
                        .then(() => {
                          //  go back and make products.json an array of objects
                          this.getInfo();
                        });
                    }}
                  >
                    Destroy
                  </button>
                </li>
              )
            })
            }
            
          </ul>
        }
        <h3> Create New Product </h3>
        {
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const newProduct = {               
                    type: 'createdUI',
                    price: 400
                };

                axios.post(`http://localhost:3000/api/products/${this.state.inputVal}`, newProduct)
                  .then(res => {
                    this.setState({
                      inputVal: '',
                    });
                    this.getInfo();
                  })
              }}
            >
              <input
                value={inputVal}
                onChange={(e) => {
                  this.setState({
                    inputVal: e.target.value,
                  }, () => {
                    console.log(this.state);
                  })
                }}
              />
              <button>Save</button>
            </form>
          </div>
        }
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);