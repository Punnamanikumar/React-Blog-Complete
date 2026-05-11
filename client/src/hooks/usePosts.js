import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: '/api', // This is proxied to http://localhost:5000/api by Vite
});

// Hook to fetch all posts
export const usePosts = (category = '') => {
  return useQuery({
    queryKey: ['posts', category],
    queryFn: async () => {
      const { data } = await api.get(`/posts${category ? `?category=${category}` : ''}`);
      return data;
    },
  });
};

// Hook to fetch the latest posts
export const useLatestPosts = () => {
  return useQuery({
    queryKey: ['latestPosts'],
    queryFn: async () => {
      const { data } = await api.get('/posts/latest');
      return data;
    },
  });
};

// Hook to fetch a single post by slug
export const usePostDetails = (slug) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${slug}`);
      return data;
    },
    enabled: !!slug, // Only run the query if a slug is provided
  });
};
