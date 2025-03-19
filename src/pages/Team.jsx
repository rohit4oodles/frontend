import { useState } from "react";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamMembers,setMember]=useState([])
  const get=async()=>{
    try{
        const response=await fetch("https://rohitmaurya15.pythonanywhere.com/user/team/",{
            method:"GET",
            headers:{ "Content-Type": "application/json" }
        })
        if(response){
            const data= await response.json()
            setMember(data)
            console.log(data,"34567890")
        }
    }
    catch{

    }

}
get()

  // const teamMembers = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     role: "Senior Product Designer",
  //     department: "Design Team",
  //     bio: "Passionate designer with 8+ years of experience in creating user-centric digital products",
  //     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  //     email: "sarah.j@company.com",
  //     linkedin: "linkedin.com/sarahj",
  //     github: "github.com/sarahj",
  //     skills: ["UI/UX", "Product Design", "Design Systems"]
  //   },
  //   {
  //     id: 2,
  //     name: "Michael Chen",
  //     role: "Lead Developer",
  //     department: "Engineering",
  //     bio: "Full-stack developer specialized in scalable architecture and cloud solutions",
  //     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  //     email: "michael.c@company.com",
  //     linkedin: "linkedin.com/michaelc",
  //     github: "github.com/michaelc",
  //     skills: ["React", "Node.js", "AWS"]
  //   },
  //   {
  //     id: 3,
  //     name: "Emily Rodriguez",
  //     role: "Marketing Director",
  //     department: "Marketing",
  //     bio: "Strategic marketing professional driving growth through data-driven campaigns",
  //     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  //     email: "emily.r@company.com",
  //     linkedin: "linkedin.com/emilyr",
  //     github: "github.com/emilyr",
  //     skills: ["Digital Marketing", "Content Strategy", "Analytics"]
  //   },
  //   {
  //     id: 4,
  //     name: "David Thompson",
  //     role: "Product Manager",
  //     department: "Product",
  //     bio: "Experienced product leader focusing on innovation and user experience",
  //     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  //     email: "david.t@company.com",
  //     linkedin: "linkedin.com/davidt",
  //     github: "github.com/davidt",
  //     skills: ["Product Strategy", "Agile", "User Research"]
  //   }
  // ];

  const Modal = ({ member, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={member.user_profile_image}
              alt={member.first_name}
              className="w-32 h-32 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
              }}
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">{member.first_name}</h2>
              <p className="text-gray-600 mb-1">{member.user_bio}</p>


              <div className="flex gap-4">
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <FaEnvelope size={20} />
                </a>
               
              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're a diverse group of passionate individuals working together to create amazing solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <img
              src={member.user_profile_image}
              alt={member.first_name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{member.first_name}</h3>
              <p className="text-gray-600 mb-1">{member.user_bio}</p>
              <div className="flex gap-3">
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <FaEnvelope size={18} />
                </a>


              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMember && (
        <Modal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
};

export default Team;