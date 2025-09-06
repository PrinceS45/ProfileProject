import { create } from 'zustand';
import api from '../api/axios.js';
import toast from 'react-hot-toast';

const useProfileStore = create((set, get) => ({

    profiles: [],      // Holds the array of all profiles
    profile: null,       // Holds a single profile when call by ID
    loading: false,    // A general loading state for profile actions
    error: null,         // Holds any error message

    // ACTIONS

  
     // Fetches all candidate profiles from the API.
     
    getAllProfiles: async () => {
        set({ loading: true, error: null });
        try {
            console.log("req send suces")
            const res = await api.get('/userProfile/profiles');
            console.log(typeof res.data) ; 
            set({ profiles: res.data, loading: false });
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to fetch profiles';
            set({ error: errorMsg, loading: false, profiles: [] });
            toast.error(errorMsg);
        }
    },

    
    getProfilesBySkill: async (skills) => {
        set({ loading: true, error: null });
        try {
            const res = await api.get(`/userProfile/profile/skills?skills=${encodeURIComponent(skills)}`);
            set({ profiles: res.data, loading: false });
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'No profiles found with these skills';
            set({ error: errorMsg, loading: false, profiles: [] });
            toast.error(errorMsg);
        }
    },

   
    getProfileById: async (id) => {
        set({ loading: true, error: null, profile: null });
        try {
            const res = await api.get(`/userProfile/profile/${id}`);
            set({ profile: res.data, loading: false });
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to fetch profile';
            set({ error: errorMsg, loading: false });
            toast.error(errorMsg);
        }
    },

  
    createProfile: async (profileData) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post('/userProfile/createProfile', profileData);
            // Add the new profile to the start of the existing profiles array
            set((state) => ({
                profiles: [res.data, ...state.profiles],
                loading: false,
            }));
            toast.success('Profile created successfully!');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to create profile';
            set({ error: errorMsg, loading: false });
            toast.error(errorMsg);
            throw err; // Re-throw for form handling
        }
    },

   
    updateProfile: async (id, updateData) => {
        set({ loading: true, error: null });
        try {
            const res = await api.patch(`/userProfile/updateProfile/${id}`, updateData);
            // Update the profile in the main profiles array and the single profile view
            set((state) => ({
                profiles: state.profiles.map((p) => (p._id === id ? res.data : p)),
                profile: state.profile?._id === id ? res.data : state.profile,
                loading: false,
            }));
            toast.success('Profile updated successfully!');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to update profile';
            set({ error: errorMsg, loading: false });
            toast.error(errorMsg);
            throw err; // Re-throw for form handling
        }
    },

    
    deleteProfile: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/userProfile/deleteProfile/${id}`);
            // Remove the deleted profile from the state
            set((state) => ({
                profiles: state.profiles.filter((p) => p._id !== id),
                loading: false,
            }));
            toast.success('Profile deleted successfully!');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to delete profile';
            set({ error: errorMsg, loading: false });
            toast.error(errorMsg);
        }
    },
      getMyProfile: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/userProfile/me'); 
            set({ profile: res.data || null, loading: false });
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch your profile";
            set({ error: errorMsg, loading: false, profile: null });
            toast.error(errorMsg);
        }
    },

    clearProfile: () => {
        set({ profile: null, error: null });
    }
}));

export default useProfileStore;
