import mongoose from "mongoose";

// Define Candidate Profile Schema
const candidateProfileSchema = new mongoose.Schema(
    {
        // Candidate's full name
        fullName: {
            type: String,
            required: true,
            trim: true, // remove space in start and end
        },

        // Candidate email 
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        // Education details array because one candidate can have multiple degrees
        education: [
            {
                institute: { type: String, required: true },
                degree: { type: String, required: true },
                fieldOfStudy: { type: String, required: true },
                startYear: { type: Number, required: true },
                endYear: { type: Number, required: true },
                cgpa: { type: Number },
            },
        ],

        // Skills list 
        skills: [
            {
                type: String,
            },
        ],

        // Projects done by the candidate
        projects: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                link: { type: String, required: true },
            },
        ],

        // Work experience details
        works: [
            {
                company: { type: String, required: true },
                position: { type: String, required: true },
                duration: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],

        // Candiate profiles links like GitHub, LinkedIn, Portfolio
        links: [
            {
                key: { type: String, required: true },
                value: { type: String, required: true },
            }
        ],

        user : {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "User" , 
        }
    },


    {
        timestamps: true,
    }
);

// Create model from schema
const CandidateProfile = mongoose.model("CandidateProfile", candidateProfileSchema);

export default CandidateProfile;
