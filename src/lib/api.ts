const API_BASE_URL = 'http://localhost:4000/api';

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

export const getUserRole = (): string | null => {
  return localStorage.getItem('user_role');
};

export const setUserRole = (role: string): void => {
  localStorage.setItem('user_role', role);
};

export const removeUserRole = (): void => {
  localStorage.removeItem('user_role');
};

// API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    company: string;
    phone: string;
  }) {
    return this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Products
  async getProducts() {
    return this.request<{ count: number; products: any[] }>('/products', {
      method: 'GET',
    });
  }

  async createProduct(data: {
    name: string;
    category: string;
    price: number;
    stock: number;
  }) {
    return this.request<any>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Orders
  async getOrders() {
    return this.request<any[]>('/orders', {
      method: 'GET',
    });
  }

  async createOrder(data: {
    wholesalerId: string;
    items: Array<{ product: string; quantity: number; price: number }>;
  }) {
    return this.request<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.request<any>(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Invoices
  async getInvoices() {
    return this.request<any[]>('/invoices', {
      method: 'GET',
    });
  }

  async createInvoice(orderId: string) {
    return this.request<any>(`/invoices/order/${orderId}`, {
      method: 'POST',
    });
  }

  // Dashboard
  async getWholesalerDashboard() {
    return this.request<any>('/dashboard/overview', {
      method: 'GET',
    });
  }

  async getRetailerDashboard() {
    return this.request<any>('/retailerDashboard/overview', {
      method: 'GET',
    });
  }

  // Payments
  async createPaymentIntent(invoiceId: string) {
    return this.request<any>('/payments/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ invoiceId }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
