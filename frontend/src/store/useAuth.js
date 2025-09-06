import { create } from 'zustand'
import api from '../api/axios'


const useAuth = create((set, get) => ({
user: null,
loading: true,
error: null,


checkAuth: async () => {
try {
const res = await api.get('/auth/checkAuth')
set({ user: res.data.user || null, loading: false })
} catch (err) {
set({ user: null, loading: false })
}
},


login: async (email, password) => {
try {
await api.post('/auth/login', { email, password })
await get().checkAuth()
set({ error: null })
} catch (err) {
set({ error: err.response?.data?.message || 'Login failed' })
throw err
}
},


signup: async (fullName, email, password) => {
  try {
    await api.post('/auth/signup', { fullName, email, password });
    await get().checkAuth();
    set({ error: null });
  } catch (err) {
    set({ error: err.response?.data?.message || 'Signup failed' });
    throw err;
  }
},



logout: async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    set({ user: null, loading: false });
  }
}

}))


export default useAuth;