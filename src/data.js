// EDIT THIS FILE to personalize your website.
// Keep email / links blank until you are ready to publish them.
export const profile = {
  name: 'Ronald Baruelo',
  initials: 'RB',
  role: 'Cybersecurity & IT Professional in Training',
  location: 'New Zealand',
  email: 'rcbaruelo1029@gmail.com',
  githubUrl: 'https://github.com/ronaldbaruelo',
  linkedinUrl: 'https://www.linkedin.com/in/rnald-baruelo-1029/',
  resumeUrl: '', // Optional: put resume.pdf in /public and set '/resume.pdf'
  intro:
    'Master of IT student specialising in cybersecurity. I enjoy building practical labs, analysing security risks, troubleshooting systems and using data to solve real problems.',
  about:
    'My work combines hands-on technical practice with postgraduate study. I have built Windows and Linux server environments, used OpenVAS and Nessus to examine vulnerabilities, and prepared security reports and response procedures. I am also developing skills in Python, cloud technologies and research methods.',
}

export const certifications = [
  {
    title: 'Fortinet NSE 1 & 3 — Network Security Associate',
    issuer: 'Fortinet',
    certificateUrl: '',
  },
  {
    title: 'AWS Academy Graduate — AWS Academy Cloud Operations',
    issuer: 'AWS Academy',
    certificateUrl: '', // Add the PDF URL after the iCloud file is downloaded locally.
  },
]

export const skills = [
  {
    title: 'Cybersecurity',
    icon: 'shield',
    description: 'Understanding risk, finding weaknesses, recommending fixes.',
    items: ['OpenVAS / Greenbone', 'Nessus', 'Vulnerability Assessment', 'Incident Response', 'Risk Analysis', 'Security Reporting'],
  },
  {
    title: 'Systems & Cloud',
    icon: 'server',
    description: 'Building, configuring and troubleshooting lab environments.',
    items: ['Windows Server', 'Active Directory', 'Ubuntu Server', 'VMware', 'AWS', 'Microsoft Azure'],
  },
  {
    title: 'Programming & Data',
    icon: 'code',
    description: 'Applying code and data tools to investigate problems.',
    items: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'Random Forest', 'XGBoost'],
  },
  {
    title: 'Standards & Research',
    icon: 'book',
    description: 'Connecting technical work with governance and evidence.',
    items: ['ISO/IEC 27001', 'ISO/IEC 20000-1', 'NIST', 'Privacy', 'Research Methods', 'Technical Writing', 'Data Management'],
  },
]

export const projectOverviews = {
  '01': [
    { title: 'Project objective', text: 'Assess vulnerabilities in a controlled lab environment, prioritise security findings and propose practical mitigations.' },
    { title: 'Lab environment', text: 'Windows Server, Active Directory, SQL Server and Ubuntu bring together Windows and Linux systems for assessment.' },
    { title: 'Assessment workflow', steps: ['Build the Windows and Linux lab environment.', 'Use OpenVAS and Nessus to examine vulnerabilities.', 'Review findings and prioritise security risks.', 'Document findings and propose mitigations.'] },
    { title: 'Skills demonstrated', text: 'Lab configuration, vulnerability assessment, risk prioritisation and security reporting.' },
  ],
  '02': [
    { title: 'Project objective', text: 'Prepare a structured policy and plan for responding to a critical security incident.' },
    { title: 'Response lifecycle', steps: ['Preparation and readiness.', 'Detection and analysis of an incident.', 'Containment and eradication.', 'Recovery and post-incident review.'] },
    { title: 'Project focus', text: 'Connect the stages of incident response with security policy and risk management in a documented plan.' },
    { title: 'Skills demonstrated', text: 'Incident response planning, policy development, risk management and technical documentation.' },
  ],
  '03': [
    { title: 'Research objective', text: 'Investigate how cybersecurity awareness, digital experience and confidence relate to identifying phishing emails among older adults.' },
    { title: 'Research focus', steps: ['Cybersecurity awareness.', 'Experience using digital technologies.', 'Confidence in recognising suspicious messages.', 'Identification of phishing emails.'] },
    { title: 'Project scope', text: 'This portfolio describes a postgraduate research design. Study results and participant findings are not included in the available overview.' },
    { title: 'Skills demonstrated', text: 'Research design, cybersecurity awareness and investigation of human factors in email security.' },
  ],
  '04': [
    { title: 'Project objective', text: 'Compare approaches for predicting E. coli in New Zealand lakes using LAWA water-quality data.' },
    { title: 'Data and models', text: 'The project uses Python and compares regression and machine-learning approaches, including Random Forest and XGBoost.' },
    { title: 'Evaluation approach', text: 'Models are evaluated on unseen monitoring sites to examine how predictions perform beyond sites used for training.' },
    { title: 'Skills demonstrated', text: 'Water-quality data analysis, predictive modelling, model comparison and evaluation.' },
  ],
  '05': [
    { title: 'Project objective', text: 'Suggest relevant items based on user preferences and patterns in data.' },
    { title: 'Project focus', text: 'Explore recommendation systems and personalisation through analysis of preferences and data patterns.' },
    { title: 'Topics covered', text: 'Recommendation systems, personalisation and data analysis.' },
    { title: 'Further details', text: 'The dataset, recommendation algorithm and evaluation results have not yet been added to this portfolio.' },
  ],
  '06': [
    { title: 'Project objective', text: 'Answer user questions through a conversational interface.' },
    { title: 'Project focus', text: 'Build an interface where users can ask questions and read replies as a conversation.' },
    { title: 'Topics covered', text: 'Chatbot development, conversational interfaces and user interaction.' },
    { title: 'Try the portfolio assistant', text: 'Use the Ask Rose button on this webpage to explore a conversational guide to Ronald’s projects, skills and education.' },
  ],
}

export const projects = [
  {
    id: '01',
    title: 'Vulnerability Scanning Lab',
    category: 'Cybersecurity',
    categoryKey: 'security',
    summary:
      'Built a lab using Windows Server, Active Directory, SQL Server and Ubuntu. Used OpenVAS and Nessus to assess vulnerabilities, prioritise findings and propose mitigations.',
    tags: ['OpenVAS', 'Nessus', 'Windows Server', 'Ubuntu'],
    visual: 'SCAN / ANALYSE',
    accent: 'green',
    link: '', // Optional: GitHub repo or published report URL
  },
  {
    id: '02',
    title: 'Critical Incident Response Plan',
    category: 'Cybersecurity',
    categoryKey: 'security',
    summary:
      'Prepared a security incident response policy and plan covering preparation, detection, analysis, containment, eradication, recovery and post-incident review.',
    tags: ['Incident Response', 'Security Policy', 'Risk Management'],
    visual: 'DETECT / RESPOND',
    accent: 'blue',
    link: '',
  },
  {
    id: '03',
    title: 'Older Adults & Email Phishing Research',
    category: 'Research',
    categoryKey: 'research',
    summary:
      'Designed postgraduate research to investigate how cybersecurity awareness, digital experience and confidence relate to identifying phishing emails among older adults.',
    tags: ['Phishing', 'Awareness', 'Research Design'],
    visual: 'HUMAN / SECURITY',
    accent: 'violet',
    link: '',
  },
  {
    id: '04',
    title: 'Predicting E. coli in New Zealand Lakes',
    category: 'Data & ML',
    categoryKey: 'data',
    summary:
      'Compared regression and machine-learning models using LAWA water-quality data, including Random Forest and XGBoost, with evaluation on unseen monitoring sites.',
    tags: ['Python', 'Machine Learning', 'Random Forest', 'XGBoost'],
    visual: 'DATA / INSIGHTS',
    accent: 'amber',
    link: '',
  },
  {
    id: '05',
    title: 'Recommendation System',
    category: 'Data & ML',
    categoryKey: 'data',
    summary:
      'A recommendation system project focused on suggesting relevant items based on user preferences and patterns in data.',
    tags: ['Recommendation Systems', 'Personalisation', 'Data Analysis'],
    visual: 'DISCOVER / RECOMMEND',
    accent: 'blue',
    link: '',
  },
  {
    id: '06',
    title: 'Building a Chatbot',
    category: 'Data & ML',
    categoryKey: 'data',
    summary:
      'A chatbot development project focused on answering user questions through a conversational interface.',
    tags: ['Chatbot', 'Conversational Interfaces', 'User Interaction'],
    visual: 'ASK / RESPOND',
    accent: 'green',
    link: '',
  },
]
