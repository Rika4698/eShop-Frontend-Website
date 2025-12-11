import { CartItem } from "@/types/modal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CartState {
    cart: CartItem[];
}

const initialState: CartState = {
    cart: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // Add Product Logic
        addProduct: (state, action: PayloadAction<CartItem>) => {
            const product = action.payload;
            const existingProduct = state.cart.find(
                (product) => product.id === action?.payload?.id
            );

            if (existingProduct) {
                const updatedQuantity =
                    existingProduct.quantity + product?.quantity;
                if (updatedQuantity <= product?.stockQuantity) {
                    existingProduct.quantity = updatedQuantity;
                } else {
                }
            } else {
                if (product?.quantity <= product?.stockQuantity) {
                    state.cart.push(product);
                } else {
                    toast.error("Not enough stock available");
                }
            }
        },

        removeProduct: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;

            state.cart = state.cart.filter((product) => product?.id !== id);
            toast.success("Product removed from cart");
        },

        incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            const existingProduct = state.cart.find(
                (product) => product.id === id
            );
            if (existingProduct) {
                if (existingProduct.quantity < existingProduct.stockQuantity) {
                    existingProduct.quantity += 1;
                } else {
                    toast.error("Cannot exceed stock limit");
                }
            }
        },

        decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            const existingProduct = state.cart.find(
                (product) => product.id === id
            );
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            } else if (existingProduct) {
                state.cart = state.cart.filter((product) => product.id !== id);
                toast.success("Product removed from cart");
            }
        },

        // Clear Cart Logic
        clearCart: (state) => {
            state.cart = [];
            toast.success("Cart cleared");
        },
    },
});

export const {
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} = productSlice.actions;

export default productSlice.reducer;
