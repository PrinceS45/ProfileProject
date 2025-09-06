import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProfileStore from '../store/useProfileStore'; // Assuming this path is correct
import { 
  FiMail, FiCode, FiArrowLeft, FiBriefcase, 
  FiBook, FiLink, FiGitMerge, FiArrowRight 
} from 'react-icons/fi';

// A reusable section component for consistent styling
const Section = ({ icon, title, children }) => (
  <section>
    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
      {icon}
      {title}
    </h2>
    <div className="relative pl-6 border-l-2 border-gray-200">
      {children}
    </div>
  </section>
);

// A reusable timeline item for work, education, etc.
const TimelineItem = ({ title, subtitle, date, description }) => (
  <div className="relative pb-8 last:pb-0">
    {/* Dot on the timeline */}
    <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-[30px] top-1.5"></div>
    <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
    {date && <p className="text-sm text-gray-500">{date}</p>}
    {description && <p className="mt-2 text-gray-700">{description}</p>}
  </div>
);

function DetailProfile() {
  const { id } = useParams(); // Get the profile ID from the URL parameter
  
  // Connect to the Zustand store
  const { profile, loading, error, getProfileById, clearProfile } = useProfileStore();

  // Fetch the specific profile when the component mounts or the ID in the URL changes
  useEffect(() => {
    if (id) {
      getProfileById(id);
    }
    // Cleanup function to clear the profile from the store when the component unmounts
    return () => {
      clearProfile();
    };
  }, [id, getProfileById, clearProfile]);

  // Helper function to get initials from a full name for the avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // --- Conditional Rendering for loading/error states ---
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading profile details...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }
  if (!profile) {
    return <div className="flex justify-center items-center min-h-screen">Profile not found.</div>;
  }

  // --- Main Render ---
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link to navigate to the home page */}
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
          <FiArrowLeft />
          Back to All Profiles
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gray-50 p-8 border-b">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold flex-shrink-0">
                {getInitials(profile.fullName)}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">{profile.fullName}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mt-2">
                  <FiMail /> <span>{profile.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="p-8 space-y-8">
            <Section icon={<FiCode />} title="Skills">
              <div className="flex flex-wrap gap-2 !border-none !pl-0">
                {profile.skills?.map((skill, i) => (
                  <span key={i} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">{skill}</span>
                ))}
              </div>
            </Section>

            {/* --- CORRECTED Work Experience Section --- */}
            <Section icon={<FiBriefcase />} title="Work Experience">
              {profile.works?.map((work, i) => (
                <TimelineItem 
                  key={i} 
                  title={work.position}      // Matches schema: work.position
                  subtitle={work.company}    // Matches schema: work.company
                  date={work.duration}       // Matches schema: work.duration
                  description={work.description} // Matches schema: work.description
                />
              ))}
            </Section>

            <Section icon={<FiBook />} title="Education">
              {profile.education?.map((edu, i) => (
                <TimelineItem 
                  key={i} 
                  title={`${edu.degree} in ${edu.fieldOfStudy}`} 
                  subtitle={edu.institute} 
                  date={`${edu.startYear} - ${edu.endYear}`} 
                />
              ))}
            </Section>
            
            <Section icon={<FiGitMerge />} title="Projects">
              {profile.projects?.map((proj, i) => (
                <div key={i} className="relative pb-8 last:pb-0">
                  <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-[30px] top-1.5"></div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg text-blue-600 hover:underline">{proj.title}</a>
                  <p className="mt-2 text-gray-700">{proj.description}</p>
                </div>
              ))}
            </Section>

            <Section icon={<FiLink />} title="Links">
              <div className="space-y-2 !border-none !pl-0">
                {profile.links?.map((link, i) => (
                  <a key={i} href={link.value} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                    {link.key} <FiArrowRight size={14} />
                  </a>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProfile;