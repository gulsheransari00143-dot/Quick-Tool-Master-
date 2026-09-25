import { additionalEducationCountries } from "./education-world-expanded";

export type EducationCountry = {
  slug: string;
  name: string;
  flag: string;
  region: string;
  languages: string[];
  levels: { slug: string; title: string; description: string; tracks: string[] }[];
};

export const educationCountries: EducationCountry[] = [
  {slug:"india",name:"India",flag:"🇮🇳",region:"South Asia",languages:["English","Hindi","Gujarati","Bengali","Marathi","Tamil","Telugu","Urdu"],levels:[
    {slug:"primary",title:"Primary Education",description:"Foundation learning and early school years.",tracks:["Class 1","Class 2","Class 3","Class 4","Class 5"]},
    {slug:"secondary",title:"Secondary Education",description:"Middle and secondary school pathways.",tracks:["Class 6","Class 7","Class 8","Class 9","Class 10"]},
    {slug:"higher-secondary",title:"Higher Secondary",description:"Senior-secondary streams and subject combinations.",tracks:["Science PCM","Science PCB","Science PCMB","Commerce","Arts / Humanities"]},
    {slug:"higher-education",title:"Higher Education",description:"Degree, professional and research pathways.",tracks:["Diploma / ITI","BCA / Computer Applications","B.Sc.","B.Com.","B.A.","BBA","Engineering","Medical","Law / LLB","MCA / M.Sc. / M.Com.","PhD / Research"]},
    {slug:"professional",title:"Professional & Career Education",description:"Professional qualifications, vocational learning and career preparation.",tracks:["Computer Science","Engineering","Medical & Health","Law","Management","Teaching","Competitive Exams","Vocational Skills"]}
  ]},
  {slug:"united-states",name:"United States",flag:"🇺🇸",region:"North America",languages:["English","Spanish","Chinese","French"],levels:[
    {slug:"school",title:"School Education",description:"Early childhood through elementary, middle and high school.",tracks:["Pre-K / Kindergarten","Elementary School","Middle School","High School"]},
    {slug:"post-secondary",title:"Post-Secondary Education",description:"College, university, community college and professional pathways.",tracks:["Associate Degree","Bachelor's Degree","Master's Degree","Doctoral Degree","Professional Education"]},
    {slug:"career",title:"Career & Technical Education",description:"Career-focused and technical education pathways.",tracks:["Technology","Healthcare","Business","Trades","Professional Certifications"]}
  ]},
  {slug:"united-kingdom",name:"United Kingdom",flag:"🇬🇧",region:"Europe",languages:["English","Welsh"],levels:[
    {slug:"school",title:"School Education",description:"Early years, primary and secondary education.",tracks:["Early Years","Primary","Secondary","GCSE"]},
    {slug:"post-16",title:"Post-16 Education",description:"Advanced school and further-education routes.",tracks:["A Levels","T Levels","BTEC / Vocational","Apprenticeships"]},
    {slug:"higher-education",title:"Higher Education",description:"University and postgraduate study.",tracks:["Foundation","Bachelor's","Master's","Doctorate","Professional Study"]}
  ]},
  {slug:"japan",name:"Japan",flag:"🇯🇵",region:"East Asia",languages:["Japanese","English"],levels:[
    {slug:"school",title:"School Education",description:"Early childhood through compulsory and upper-secondary education.",tracks:["Kindergarten","Elementary School","Junior High School","Senior High School"]},
    {slug:"higher-education",title:"Higher Education",description:"Universities, junior colleges and professional institutions.",tracks:["University","Junior College","Graduate School","Professional Education"]}
  ]},
  {slug:"germany",name:"Germany",flag:"🇩🇪",region:"Europe",languages:["German","English"],levels:[
    {slug:"school",title:"School Education",description:"Primary and differentiated secondary education pathways.",tracks:["Grundschule","Lower Secondary","Upper Secondary","Abitur"]},
    {slug:"vocational",title:"Vocational Education",description:"Dual and school-based vocational pathways.",tracks:["Ausbildung","Technical Schools","Professional Qualifications"]},
    {slug:"higher-education",title:"Higher Education",description:"Universities and applied-science pathways.",tracks:["Bachelor","Master","Doctorate"]}
  ]},
  {slug:"china",name:"China",flag:"🇨🇳",region:"East Asia",languages:["Mandarin Chinese","English"],levels:[
    {slug:"school",title:"School Education",description:"Pre-school, primary, junior and senior secondary pathways.",tracks:["Primary","Junior Secondary","Senior Secondary"]},
    {slug:"higher-education",title:"Higher Education",description:"Undergraduate and postgraduate education.",tracks:["Vocational Higher Education","Bachelor","Master","Doctorate"]}
  ]},
  {slug:"france",name:"France",flag:"🇫🇷",region:"Europe",languages:["French","English"],levels:[
    {slug:"school",title:"School Education",description:"Primary, collège and lycée pathways.",tracks:["École primaire","Collège","Lycée"]},
    {slug:"higher-education",title:"Higher Education",description:"University and specialist higher education.",tracks:["Licence","Master","Doctorat","Grandes Écoles"]}
  ]},
  {slug:"australia",name:"Australia",flag:"🇦🇺",region:"Oceania",languages:["English"],levels:[
    {slug:"school",title:"School Education",description:"Primary and secondary schooling.",tracks:["Foundation / Prep","Primary School","Secondary School","Senior Secondary"]},
    {slug:"tertiary",title:"Tertiary Education",description:"Vocational and higher education.",tracks:["TAFE / VET","Bachelor","Graduate Certificate","Master","Doctorate"]}
  ]},
  {slug:"brazil",name:"Brazil",flag:"🇧🇷",region:"South America",languages:["Portuguese","English"],levels:[
    {slug:"basic",title:"Basic Education",description:"Early, fundamental and secondary education.",tracks:["Educação Infantil","Ensino Fundamental","Ensino Médio"]},
    {slug:"higher-education",title:"Higher Education",description:"Undergraduate and postgraduate pathways.",tracks:["Tecnólogo","Bachelor","Licenciatura","Master","Doctorate"]}
  ]},
  {slug:"canada",name:"Canada",flag:"🇨🇦",region:"North America",languages:["English","French"],levels:[
    {slug:"school",title:"School Education",description:"Provincial primary and secondary education pathways.",tracks:["Elementary","Middle / Junior High","Secondary / High School"]},
    {slug:"post-secondary",title:"Post-Secondary",description:"Colleges, universities and professional education.",tracks:["College Diploma","Bachelor","Master","Doctorate","Professional Programs"]}
  ]},
  {slug:"south-africa",name:"South Africa",flag:"🇿🇦",region:"Africa",languages:["English","isiZulu","isiXhosa","Afrikaans"],levels:[
    {slug:"school",title:"School Education",description:"Foundation, intermediate and senior phases.",tracks:["Foundation Phase","Intermediate Phase","Senior Phase","Further Education & Training"]},
    {slug:"higher-education",title:"Higher Education",description:"Universities, colleges and vocational education.",tracks:["Certificate","Diploma","Bachelor","Honours","Master","Doctorate"]}
  ]},
  {slug:"singapore",name:"Singapore",flag:"🇸🇬",region:"Southeast Asia",languages:["English","Malay","Mandarin Chinese","Tamil"],levels:[
    {slug:"school",title:"School Education",description:"Primary, secondary and post-secondary pathways.",tracks:["Primary","Secondary","Junior College","Polytechnic"]},
    {slug:"higher-education",title:"Higher Education",description:"University and applied education.",tracks:["Undergraduate","Postgraduate","Professional Education"]}
  ]}
  ,...additionalEducationCountries
];

export const getEducationCountry=(slug:string)=>educationCountries.find(x=>x.slug===slug);
