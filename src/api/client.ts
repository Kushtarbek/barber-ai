const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

interface Appointment {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  totalVisits: number;
}

interface Message {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface GalleryImage {
  id: string;
  title: string;
  type: 'Men' | 'Women';
  description: string;
  image: string;
  uploadedAt: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return this.request<Appointment[]>('/appointments');
  }

  async getAppointment(id: string): Promise<Appointment> {
    return this.request<Appointment>(`/appointments/${id}`);
  }

  async createAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    return this.request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
    return this.request<Appointment>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointment),
    });
  }

  async deleteAppointment(id: string): Promise<void> {
    await this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    return this.request<Customer[]>('/customers');
  }

  async getCustomer(id: string): Promise<Customer> {
    return this.request<Customer>(`/customers/${id}`);
  }

  async createCustomer(customer: Omit<Customer, 'id'>): Promise<Customer> {
    return this.request<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }

  async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
    return this.request<Customer>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    });
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.request(`/customers/${id}`, {
      method: 'DELETE',
    });
  }

  // Messages
  async getMessages(): Promise<Message[]> {
    return this.request<Message[]>('/messages');
  }

  async getMessage(id: string): Promise<Message> {
    return this.request<Message>(`/messages/${id}`);
  }

  async createMessage(message: Omit<Message, 'id' | 'timestamp' | 'read'>): Promise<Message> {
    return this.request<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  async updateMessage(id: string, message: Partial<Message>): Promise<Message> {
    return this.request<Message>(`/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(message),
    });
  }

  async deleteMessage(id: string): Promise<void> {
    await this.request(`/messages/${id}`, {
      method: 'DELETE',
    });
  }

  // Gallery
  async getGalleryImages(): Promise<GalleryImage[]> {
    return this.request<GalleryImage[]>('/gallery');
  }

  async getGalleryImage(id: string): Promise<GalleryImage> {
    return this.request<GalleryImage>(`/gallery/${id}`);
  }

  async createGalleryImage(image: Omit<GalleryImage, 'id' | 'uploadedAt'>): Promise<GalleryImage> {
    return this.request<GalleryImage>('/gallery', {
      method: 'POST',
      body: JSON.stringify(image),
    });
  }

  async updateGalleryImage(id: string, image: Partial<GalleryImage>): Promise<GalleryImage> {
    return this.request<GalleryImage>(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(image),
    });
  }

  async deleteGalleryImage(id: string): Promise<void> {
    await this.request(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
export type { Appointment, Customer, Message, GalleryImage };
