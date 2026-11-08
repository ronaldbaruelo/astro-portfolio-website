import { profile, projects, skills } from './data'

export function answerQuestion(question) {
  const text = question.toLowerCase()
  if (/contact|email|hire|recruit|opportunit|reach/.test(text)) return `You can reach ${profile.name} at ${profile.email}. He is based in ${profile.location} and open to IT and cybersecurity opportunities. Visit the Contact section for his GitHub and LinkedIn profiles.`
  if (/educat|study|studying|degree|master|diploma|yoobee/.test(text)) return 'Ronald is studying a Master of Information Technology with a cybersecurity specialisation. He also has a Diploma in Cloud Engineering from Yoobee. You can find these in the Education section.'
  if (/hello|^hi\b|^hey\b/.test(text)) return `Hi! I'm Rose, your guide to ${profile.name}'s portfolio. Ask me about his projects, technical skills, education or how to get in touch.`
  const project = projects.find(item => {
    const terms = [...item.tags, item.title].join(' ').toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length > 3 && !['project', 'systems', 'analysis', 'research', 'building'].includes(word))
    return terms.some(word => text.includes(word))
  })
  if (project && !/skills|technologies|toolkit/.test(text)) return `${project.title}\n\n${project.summary}\n\nTools and topics: ${project.tags.join(', ')}. See Featured projects for more.`
  if (/project|built|work|portfolio/.test(text)) return `His featured projects include:\n\n${projects.map(item => `• ${item.title}`).join('\n')}\n\nAsk about a specific project, or explore the Projects section.`
  if (/skill|technolog|tool|python|cloud|security|linux|windows|program/.test(text)) return skills.map(skill => `${skill.title}: ${skill.items.join(', ')}.`).join('\n\n')
  if (/about|ronald|experience|yourself|who/.test(text)) return `${profile.name} — ${profile.role}.\n\n${profile.intro}\n\n${profile.about}`
  if (/thank/.test(text)) return 'You’re welcome! You can keep exploring his projects or use the Contact section to connect with Ronald.'
  return 'I answer from the information on this portfolio and don’t use a live AI service yet. Try asking about Ronald’s projects, skills, education or contact details.'
}
