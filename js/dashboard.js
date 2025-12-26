const meetingsList = document.getElementById("meetingsList");

// TEMP DEMO DATA (simulate database)
const meetings = [
  {
    title: "Project Discussion",
    date: "2025-09-01",
    summary: "Discussed WebRTC implementation and AI transcription."
  },
  {
    title: "Client Meeting",
    date: "2025-09-02",
    summary: "Finalized requirements and next action items."
  }
];

meetings.forEach(meeting => {
  const card = document.createElement("div");
  card.className = "meeting-card";

  card.innerHTML = `
    <h3>${meeting.title}</h3>
    <p><strong>Date:</strong> ${meeting.date}</p>
    <p><strong>Summary:</strong> ${meeting.summary}</p>
  `;

  meetingsList.appendChild(card);
});
