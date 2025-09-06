import CandidateProfile from "../models/candidateProfile.js";


// get profile 

const getAllProfile = async (req, res) => {
    try {
        const profiles = await CandidateProfile.find(); 
        // Simply return the array of profiles.
        return res.status(200).json(profiles);

    } catch (error) {
        console.log("Error in getAllProfile controller", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// get profile by id 

const getProfileById = async (req, res) => {
    try {
        const id = req.params.id;

        const profile = await CandidateProfile.findById(id);
        // if no profile found 
        if (!profile) {
            return res.status(404).json({ message: "No profile found with this ID" });
        }

        // If a profile is found, send it back
        return res.status(200).json(profile);

    } catch (error) {
        console.log("Error in getProfileById controller", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// get profile by skills
const getProfileBySkills = async (req, res) => {
    try {
        // Extract skills from query param
        let { skills } = req.query;

        if (!skills) {
            return res.status(400).json({ message: "Please provide skills to search" });
        }

        // Convert commam separated string to array
        if (typeof skills === "string") {
         skills = skills.split(",").map(skill => skill.trim());
        }

        // Search profiles where skills array contains any of the requested skills
        const profiles = await CandidateProfile.find({ skills: { $in: skills } });

        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ message: "No profiles found with these skills" });
        }

        return res.status(200).json(profiles);
    } catch (error) {
        console.log("Error in getProfileBySkills controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

 const getMyProfile = async (req, res) => {
    try {
        // req.user._id is added by your 'protectRoute' middleware
        const profile = await CandidateProfile.findOne({ user: req.user._id });

        if (!profile) {
            // It's not an error if a user hasn't created a profile yet
            return res.status(200).json(null); 
        }

        return res.status(200).json(profile);
    } catch (error) {
        console.log("Error in getMyProfile controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



const createProfile = async (req, res) => {
    try {
        const { fullName, email, education, skills, projects, works, links } = req.body;
        const userId = req.user._id; // Get user ID from the authenticated user

        // Check if a profile for this user already exists
        const existingProfile = await CandidateProfile.findOne({ user: userId });
        if (existingProfile) {
            return res.status(409).json({ message: "Profile already exists for this user" }); 
        }
        
        if (!fullName || !email) {
            return res.status(400).json({ message: "Full name and email are mandatory" });
        }

        let skillsArray = skills;

          if (typeof skills === "string") {
         skills = skills.split(",").map(skill => skill.trim());
        }

        const profile = new CandidateProfile({
            fullName,
            email,
            education,
            skills: skillsArray,
            projects,
            works,
            links,
            user: userId, 
        });

        await profile.save();
        return res.status(201).json(profile);

    } catch (error) {
        console.log("Error in createProfile controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// update profiles
const updateProfile = async (req, res) => {
    try {
        const profileId = req.params.id;
        const userId = req.user._id;
        let updateData = req.body;

        // Find the profile first to check ownership
        const profileToUpdate = await CandidateProfile.findById(profileId);

        if (!profileToUpdate) {
            // profile doesn't exist
            return res.status(404).json({ message: "Profile not found" });
        }

        // Authorization check 

        if (profileToUpdate.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "User not authorized to update this profile" });
        }
        
            
          if (typeof updateData.skills === "string") {
         updateData.skills = updateData.skills.split(",").map(skill => skill.trim());
        }
        
        // Now, update the profile
        const updatedProfile = await CandidateProfile.findByIdAndUpdate(
            profileId,
            { $set: updateData },
            { new: true, runValidators: true } // runValidators is good practice
        );

        return res.status(200).json(updatedProfile);

    } catch (error) {
        console.log("Error in updateProfile controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Delete Profile
const deleteProfile = async (req, res) => {
    try {
        const profileId = req.params.id;
        const userId = req.user._id;

        //  Find the profile first to check ownership
        const profileToDelete = await CandidateProfile.findById(profileId);
        
        if (!profileToDelete) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // authorization check
        if (profileToDelete.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "User not authorized to delete this profile" });
        }

        //delete the profile
        await CandidateProfile.findByIdAndDelete(profileId);

        return res.status(200).json({ message: "Profile deleted successfully" });

    } catch (error) {
        console.log("Error in deleteProfile controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export {getAllProfile , getMyProfile, getProfileById , getProfileBySkills , createProfile , updateProfile , deleteProfile} ; 