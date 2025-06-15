const someOrder = {
  items: [
    { name: "banana", price: 9, quantity: 5 },
    { name: "apple", price: 11, quantity: 2 },
    { name: "shipping", price: 10, quantity:1, shipping: true },
  ],
};

const orderTotal = (order) => {
  let totalItems = order.items.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0);
  const shipping = order.items.find(x=> x.shipping)
  const total = totalItems-shipping.price >50 ? totalItems -shipping.price : totalItems
  return total;
};


const price = orderTotal(someOrder)
console.log(price)

