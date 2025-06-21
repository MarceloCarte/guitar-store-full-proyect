export interface Product {
    id: string | number,
    name: string,
    price: number,
    stock: number,
    type: 'electrica' | 'nylon' | 'acustica' | 'electroacustica',
    condition: 'nuevo' | 'usado',
    desctription: string,
    image: string,
    user_id: string,
}

export interface User {
    id: string | number,
    name: string,
    email: string,
    password: string,
    image: string,
    type: 'admin' | 'user',
}

export interface CartItem extends Product {
    quantity: number;
}

export interface AppState {
    cart: CartItem[];
    total: number;
    products: Product[];
    user: string;
    token: string;
    addToCart: (product: Product) => void;
    signUp: (user: User) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
}


export interface AppProviderProps {
    children: React.ReactNode;
}