import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import Loading from "../loader/Loading.jsx";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "technology",
    img: "",
  });

  // Fetch all posts (admin view)
  const { data, isLoading } = useQuery({
    queryKey: ["adminPosts"],
    queryFn: async () => {
      const { data } = await api.get("/posts?limit=50");
      return data.posts;
    },
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (newPost) => {
      await api.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminPosts"]);
      resetForm();
      alert("Post created successfully!");
    },
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: async (updatedData) => {
      await api.put(`/posts/${editingId}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminPosts"]);
      resetForm();
      alert("Post updated successfully!");
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminPosts"]);
      alert("Post deleted!");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (post) => {
    setEditingId(post._id);
    setFormData({
      title: post.title,
      description: post.description,
      content: post.content || "", // Content isn't returned in the list view for bandwidth, so we might need to fetch it
      category: post.category,
      img: post.img || "",
    });
    
    // Fetch the full post to get the content since the list view excludes it
    api.get(`/posts/${post.slug}`).then(res => {
        setFormData(prev => ({...prev, content: res.data.post.content}));
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", content: "", category: "technology", img: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updatePostMutation.mutate(formData);
    } else {
      createPostMutation.mutate(formData);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
      <h1 style={{ borderBottom: "2px solid red", paddingBottom: "10px" }}>Admin Dashboard</h1>
      
      <div style={{ display: "flex", gap: "40px", marginTop: "30px", flexWrap: "wrap" }}>
        
        {/* FORM */}
        <div style={{ flex: "1 1 400px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", position: "sticky", top: "20px", height: "fit-content" }}>
          <h2>{editingId ? "Edit Post" : "Create New Post"}</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
            <input name="title" placeholder="Post Title" value={formData.title} onChange={handleChange} required style={{ padding: "10px" }} />
            <input name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} required style={{ padding: "10px" }} />
            <input name="img" placeholder="Image URL (e.g., https://...)" value={formData.img} onChange={handleChange} style={{ padding: "10px" }} />
            
            <select name="category" value={formData.category} onChange={handleChange} style={{ padding: "10px" }}>
              <option value="technology">Technology</option>
              <option value="tollywood">Tollywood</option>
              <option value="nature">Nature</option>
              <option value="jobs">Jobs</option>
            </select>

            <textarea name="content" placeholder="Full Article Content" value={formData.content} onChange={handleChange} required rows="8" style={{ padding: "10px" }} />
            
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" disabled={createPostMutation.isPending || updatePostMutation.isPending} style={{ flex: 1, padding: "12px", backgroundColor: "black", color: "white", cursor: "pointer", border: "none" }}>
                {createPostMutation.isPending || updatePostMutation.isPending ? "Saving..." : editingId ? "Update Post" : "Publish Post"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={{ padding: "12px", backgroundColor: "gray", color: "white", cursor: "pointer", border: "none" }}>
                  Cancel
                </button>
              )}
            </div>
            {/* Image Preview Block */}
            {formData.img && (
              <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd', backgroundColor: '#fff' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #ddd', backgroundColor: '#f1f1f1', fontSize: '12px', fontWeight: 'bold', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Image Preview
                </div>
                <img 
                  src={formData.img} 
                  alt="Post Preview" 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} 
                  onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Invalid+Image+URL' }} 
                />
              </div>
            )}
            
          </form>
        </div>

        {/* MANAGE POSTS LIST */}
        <div style={{ flex: "2 1 600px" }}>
          <h2>Manage Posts</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
            {data?.map((post) => (
              <div key={post._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "white" }}>
                <div>
                  <h4 style={{ margin: "0 0 5px 0" }}>{post.title}</h4>
                  <small style={{ color: "gray", textTransform: "capitalize" }}>{post.category} • {post.views} views</small>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    onClick={() => handleEditClick(post)}
                    style={{ backgroundColor: "black", color: "white", border: "none", padding: "8px 12px", cursor: "pointer", borderRadius: "4px" }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => {
                      if(window.confirm("Are you sure you want to delete this post?")) {
                        deletePostMutation.mutate(post._id);
                      }
                    }}
                    style={{ backgroundColor: "red", color: "white", border: "none", padding: "8px 12px", cursor: "pointer", borderRadius: "4px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
