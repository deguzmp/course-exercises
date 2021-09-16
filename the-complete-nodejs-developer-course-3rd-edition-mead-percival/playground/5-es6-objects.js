const name = 'Phil'
const userAge = 29

const user = {
  name,
  age: userAge,
  location: 'Bacoor'
}

// console.log(user)

const product = {
  label: 'Red Notebook',
  price: 3,
  stock: 201,
  salePrice: undefined,
  rating: undefined
}

const { label:productLabel,
        stock,
        rating = 5
      } = product

// console.log(productLabel,' ',stock,' ',rating)

const transaction = (type, {label, stock = 0} = {}) => {
  console.log(type, label, stock)
}

transaction('order',product)

transaction('order')