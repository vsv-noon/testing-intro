function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity < 1) {
    throw new RangeError("Quantity must not be less than 1");
  }

  if (product.stock < quantity) {
    throw new RangeError("Quantity cannot be greater than stock value");
  }

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    if (existingProduct.quantity < product.stock) {
      existingProduct.quantity += quantity;
    } else {
      throw new RangeError("Quantity cannot be greater than stock value");
    }
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    });
  }
  return cart;
}

function changeQuantity(cart, id, quantity) {
  const existingProduct = cart.find((i) => i.id === id);

  if (quantity < 1) {
    throw new RangeError("Quantity must not be less than 1");
  }

  if (existingProduct) {
    if (existingProduct.stock < quantity) {
      throw new RangeError("Quantity cannot be greater than stock value");
    }
    existingProduct.quantity = quantity;
  }

  return cart;
}

function removeFromCart(cart, id) {
  return cart.filter((i) => i.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0);
}

function calculateOrderTotal(cart, promoCode) {
  const cartSubtotal = calculateCartSubtotal(cart);
  let discount = 0;
  let delivery = 0;

  if (promoCode === "SAVE10" && cartSubtotal >= 20_000) {
    discount = cartSubtotal * 0.1;
  } else {
    discount = 0;
  }

  if (cartSubtotal >= 50_000) {
    delivery = 0;
  } else {
    delivery = 30_000;
  }

  let totalSum = cartSubtotal > 0 ? cartSubtotal - discount + delivery : 0;

  return {
    subtotal: cartSubtotal,
    discount: discount,
    delivery: delivery,
    total: totalSum,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
