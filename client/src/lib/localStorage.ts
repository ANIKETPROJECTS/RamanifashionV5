interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
}

interface LocalCart {
  items: CartItem[];
}

interface LocalWishlist {
  products: string[];
}

export const localStorageService = {
  getCart(): LocalCart {
    try {
      const cart = localStorage.getItem('guest_cart');
      return cart ? JSON.parse(cart) : { items: [] };
    } catch {
      return { items: [] };
    }
  },

  setCart(cart: LocalCart): void {
    localStorage.setItem('guest_cart', JSON.stringify(cart));
    // Dispatch custom event to notify Header component
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },

  addToCart(productId: string, quantity: number = 1, selectedColor?: string): void {
    const cart = this.getCart();
    const existingItem = cart.items.find(
      item => item.productId === productId && item.selectedColor === selectedColor
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, selectedColor });
    }
    
    this.setCart(cart);
  },

  updateCartQuantity(productId: string, quantity: number, selectedColor?: string): void {
    const cart = this.getCart();
    const item = cart.items.find(
      item => item.productId === productId && item.selectedColor === selectedColor
    );
    
    if (item) {
      item.quantity = quantity;
      this.setCart(cart);
    }
  },

  removeFromCart(productId: string, selectedColor?: string): void {
    const cart = this.getCart();
    cart.items = cart.items.filter(
      item => !(item.productId === productId && item.selectedColor === selectedColor)
    );
    this.setCart(cart);
  },

  clearCart(): void {
    localStorage.removeItem('guest_cart');
    // Dispatch custom event to notify Header component
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },

  getWishlist(): LocalWishlist {
    try {
      const wishlist = localStorage.getItem('guest_wishlist');
      return wishlist ? JSON.parse(wishlist) : { products: [] };
    } catch {
      return { products: [] };
    }
  },

  setWishlist(wishlist: LocalWishlist): void {
    localStorage.setItem('guest_wishlist', JSON.stringify(wishlist));
    // Dispatch custom event to notify Header component
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  },

  addToWishlist(productId: string): void {
    const wishlist = this.getWishlist();
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      this.setWishlist(wishlist);
    }
  },

  removeFromWishlist(productId: string): void {
    const wishlist = this.getWishlist();
    wishlist.products = wishlist.products.filter(id => id !== productId);
    this.setWishlist(wishlist);
  },

  isInWishlist(productId: string): boolean {
    const wishlist = this.getWishlist();
    return wishlist.products.includes(productId);
  },

  clearWishlist(): void {
    localStorage.removeItem('guest_wishlist');
    // Dispatch custom event to notify Header component
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  }
};
