import React from "react";

const About = () => {
  const members = [
    {
      name: "seelam rohith reddy",
      phone: "123-456-7890",
      designation: "Over all co-ordinator",
      image: "/overall_coord.jpg",
    },
    {
      name: "Geethika Palla",
      phone: "234-567-8901",
      designation: "Digital and Design head",
      image: "/digital.jpg",
    },
    {
      name: "Vinay Ravilala",
      phone: "345-678-9012",
      designation: "PR Head",
      image: "/pr.jpg",
    },
    {
      name: "Laxman Sai Prakash",
      phone: "456-789-0123",
      designation: "TFI Co-ordinator",
      image: "/tfi.jpg",
    },
    {
      name: "Neha Reddy",
      phone: "567-890-1234",
      designation: "CSE Coordinator",
      image: "/cse.jpg",
    },
    {
      name: "Shivamani Pampati",
      phone: "678-901-2345",
      designation: "IT Coordinator",
      image: "/it.jpg",
    },
    {
      name: "Sumit Pendyala",
      phone: "789-012-3456",
      designation: "ECE Coordinator",
      image: "/ece.jpg",
    },
    {
      name: "Sravya vijaya",
      phone: "890-123-4567",
      designation: "EEE Coordinator",
      image: "/eee.jpg",
    },
    {
      name: "Hari Krishna",
      phone: "901-234-5678",
      designation: "MECH Coordinator",
      image: "/mech.jpg",
    },
    {
      name: "Perka Kiran",
      phone: "012-345-6789",
      designation: "Civil Coordinator",
      image: "/civil.jpg",
    },
  ];

  return (
    <div id="about" style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ color: "#00004d", fontFamily: "Roboto", fontWeight: "bold" }}>
        About
      </h2>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <img
          src="nss_image.jpg"
          alt="NSS Logo"
          style={{ marginRight: "20px", borderRadius: "8px" }}
        />
        <p style={{ fontSize: "22px", fontFamily: "Fira Sans" }}>
          NSS Vasavi College of Engineering is a student-driven organization
          committed to community service, development programs, and fostering
          leadership skills among students. Our mission is to promote social
          responsibility and holistic development. <br />
          <br />
          The National Service Scheme (NSS) is a program that encourages
          students to participate in community service to develop their
          character and personality. The NSS was launched in 1969 by the
          Ministry of Youth Affairs and Sports, Government of India. The
          program's goals include: <br />
          <ul>
            <li>Developing social and civic responsibility</li>
            <li>Understanding the community and oneself in relation to the community</li>
            <li>Identifying community needs and problems</li>
            <li>Using knowledge to find practical solutions to problems</li>
            <li>Developing leadership qualities and democratic values</li>
            <li>Practicing national integration and social harmony</li>
          </ul>
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#00004d" }}>OUR TEAM</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {members.map((member, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={member.image}
                alt={`${member.name}`}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
              />
              <h4>{member.name}</h4>
              <p>{member.designation}</p>
              <p>{member.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
