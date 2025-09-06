// src/pages/YourProfile.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../store/useAuth";
import useProfileStore from "../store/useProfileStore";
import { FiPlusCircle, FiXCircle, FiSave, FiTrash2 } from "react-icons/fi";
import { FaBriefcase, FaGraduationCap, FaLink, FaProjectDiagram } from "react-icons/fa";

// --- Reusable UI Components for a cleaner layout ---

const FormSection = ({ title, icon, children }) => (
  <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-3">
      {icon} {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const SubSection = ({ onRemove, children }) => (
  <div className="relative bg-gray-50 border border-gray-200 p-4 rounded-lg">
    <button
      type="button"
      onClick={onRemove}
      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
      aria-label="Remove item"
    >
      <FiXCircle size={20} />
    </button>
    <div className="space-y-3">{children}</div>
  </div>
);

const YourProfile = () => {
  const { user } = useAuth();
  const { profile, loading, getMyProfile, createProfile, updateProfile, deleteProfile } = useProfileStore();

  const [formData, setFormData] = useState({
    fullName: "", email: "", skills: [], education: [], projects: [], works: [], links: [],
  });

  // Fetch the user's profile on component load
  useEffect(() => {
    if (user) {
      getMyProfile();
    }
  }, [user, getMyProfile]);

  // When profile data from the store changes, update the local form state
  useEffect(() => {
    // Define a guaranteed initial state with all fields
    const initialState = {
      fullName: user?.fullName || "",
      email: user?.email || "",
      skills: [],
      education: [],
      projects: [],
      works: [],
      links: [],
    };

    if (profile) {
      // If a profile exists, merge its data over the initial state
      // This ensures fields not present in profile (like 'skills') default to an empty array
      setFormData({
        ...initialState,
        ...profile,
        skills: profile.skills || [],
        education: profile.education || [],
        projects: profile.projects || [],
        works: profile.works || [],
        links: profile.links || [],
      });
    } else {
      // If no profile, just use the initial state
      setFormData(initialState);
    }
  }, [profile, user]);

  // --- Form Input Handlers ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleArrayChange = (field, index, key, value) => {
    const updated = [...(formData[field] || [])];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, [field]: updated });
  };

  const addArrayItem = (field, newItem) => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), newItem] });
  };

  const removeArrayItem = (field, index) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  // --- Form Submission Handlers ---
  const handleSubmit = async () => {
    if (profile) {
      await updateProfile(profile._id, formData);
    } else {
      await createProfile(formData);
    }
  };

  const handleDeleteConfirm = () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      deleteProfile(profile._id);
    }
  };
  
  // --- Render Logic ---
  if (loading && !profile) return <p className="text-center mt-10">Loading Your Profile...</p>;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <p className="text-xl text-gray-600 font-semibold">
          Please login to manage your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Profile Dashboard</h1>
          {/* Show Save/Delete icons only if a profile already exists */}
          {profile && (
            <div className="flex items-center gap-2">
              <button onClick={handleSubmit} className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors" title="Save Changes">
                <FiSave size={20} />
              </button>
              <button onClick={handleDeleteConfirm} className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white transition-colors" title="Delete Profile">
                <FiTrash2 size={20} />
              </button>
            </div>
          )}
        </header>

        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-600">
            {profile ? "Update Your Profile Details" : "Create Your Profile"}
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>
            <input type="text" placeholder="Skills (comma-separated)" value={formData.skills.join(", ")} onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(",").map((s) => s.trim()) })} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
            
            <FormSection icon={<FaGraduationCap />} title="Education">
              {formData.education?.map((edu, index) => (
                <SubSection key={index} onRemove={() => removeArrayItem("education", index)}>
                  <input type="text" placeholder="Institute" value={edu.institute || ""} onChange={(e) => handleArrayChange("education", index, "institute", e.target.value)} className="w-full p-2 border rounded" />
                  <input type="text" placeholder="Degree" value={edu.degree || ""} onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)} className="w-full p-2 border rounded" />
                  <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy || ""} onChange={(e) => handleArrayChange("education", index, "fieldOfStudy", e.target.value)} className="w-full p-2 border rounded" />
                  <div className="flex gap-2">
                    <input type="number" placeholder="Start Year" value={edu.startYear || ""} onChange={(e) => handleArrayChange("education", index, "startYear", e.target.value)} className="w-full p-2 border rounded" />
                    <input type="number" placeholder="End Year" value={edu.endYear || ""} onChange={(e) => handleArrayChange("education", index, "endYear", e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                </SubSection>
              ))}
              <button onClick={() => addArrayItem("education", { institute: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "" })} className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"><FiPlusCircle /> Add Education</button>
            </FormSection>

            <FormSection icon={<FaProjectDiagram />} title="Projects">
              {formData.projects?.map((p, index) => (
                <SubSection key={index} onRemove={() => removeArrayItem("projects", index)}>
                  <input type="text" placeholder="Title" value={p.title || ""} onChange={(e) => handleArrayChange("projects", index, "title", e.target.value)} className="w-full p-2 border rounded" />
                  <textarea placeholder="Description" value={p.description || ""} onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)} className="w-full p-2 border rounded" rows="3"></textarea>
                  <input type="text" placeholder="Link" value={p.link || ""} onChange={(e) => handleArrayChange("projects", index, "link", e.target.value)} className="w-full p-2 border rounded" />
                </SubSection>
              ))}
              <button onClick={() => addArrayItem("projects", { title: "", description: "", link: "" })} className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"><FiPlusCircle /> Add Project</button>
            </FormSection>

            <FormSection icon={<FaBriefcase />} title="Work Experience">
              {formData.works?.map((w, index) => (
                <SubSection key={index} onRemove={() => removeArrayItem("works", index)}>
                  <input type="text" placeholder="Company" value={w.company || ""} onChange={(e) => handleArrayChange("works", index, "company", e.target.value)} className="w-full p-2 border rounded" />
                  <input type="text" placeholder="Position" value={w.position || ""} onChange={(e) => handleArrayChange("works", index, "position", e.target.value)} className="w-full p-2 border rounded" />
                  <input type="text" placeholder="Duration (e.g., 2020 - 2022)" value={w.duration || ""} onChange={(e) => handleArrayChange("works", index, "duration", e.target.value)} className="w-full p-2 border rounded" />
                   <textarea placeholder="Description" value={w.description || ""} onChange={(e) => handleArrayChange("works", index, "description", e.target.value)} className="w-full p-2 border rounded" rows="3"></textarea>
                </SubSection>
              ))}
              <button onClick={() => addArrayItem("works", { company: "", position: "", duration: "", description: "" })} className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"><FiPlusCircle /> Add Work Experience</button>
            </FormSection>

            <FormSection icon={<FaLink />} title="Links">
              {formData.links?.map((l, index) => (
                <SubSection key={index} onRemove={() => removeArrayItem("links", index)}>
                  <input type="text" placeholder="Label (e.g., GitHub, LinkedIn)" value={l.key || ""} onChange={(e) => handleArrayChange("links", index, "key", e.target.value)} className="w-full p-2 border rounded" />
                  <input type="text" placeholder="URL" value={l.value || ""} onChange={(e) => handleArrayChange("links", index, "value", e.target.value)} className="w-full p-2 border rounded" />
                </SubSection>
              ))}
              <button onClick={() => addArrayItem("links", { key: "", value: "" })} className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"><FiPlusCircle /> Add Link</button>
            </FormSection>
            
            {/* Show Create Button only if profile doesn't exist */}
            {!profile && (
              <div className="mt-8 border-t pt-6">
                <button onClick={handleSubmit} className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                  Create Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;