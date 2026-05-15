import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from './components/Navbar';
import './App.css';
import Footer from "./components/Footer";
import Hero from "./components/Home/hero";

import About from "./components/About/About";
import Management from "./components/About/Management";
import Careers from "./components/About/Careers";
import VacancyDetail from "./components/About/VacancyDetail";
import Partners from "./components/About/Partners";
import Mission from "./components/About/Mission";
import Regulations from "./components/About/Regulations";
import Status from "./components/About/Status";
import Advices from "./components/About/Advices";
import Founders from "./components/About/Founders";
import Structure from "./components/About/Structure";
import Achievements from "./components/About/Achievements";

import HSM from './components/academics/academics';
import Faculties from './components/academics/faculties';
import Deparments from './components/academics/departments';
import Calendar from './components/academics/calendar';
import Resources from "./components/academics/resources";
import HSMInfo from "./components/HSM/HSMInfo";
import Programs from "./components/HSM/Programs";
import HSMLearningGoals from "./components/HSM/HSMLearningGoals";
import HSMAccreditation from "./components/HSM/HSMAccreditation";
import HSMAcademicStuff from "./components/HSM/HSMAcademicStuff";
import HSMManagement from "./components/HSM/HSMManagement";
import HSMCMK from "./components/HSM/HSMCMK";

import LifeOverview from "./components/Life/LifeOverview";
import ClubsSection from "./components/Life/ClubsSection";
import InternationalStudents from "./components/Life/InternationalStudents";
import Gallery from "./components/Life/Gallery";
import Internships from "./components/Life/Internships";
import AcademicMobility from "./components/Life/AcademicMobility";
import StudentRegulations from "./components/Life/StudentRegulations";
import Instructions from "./components/Life/Instructions";
import AppealForm from "./components/Life/AppealForm";
import StudentCalendar from "./components/academics/calendar";
import StudentEResources from "./components/Life/EResources";
import AcadOp from "./components/Life/AcadOp";
import SocOp from "./components/Life/SocOp";
import CampusEvents from "./components/Life/CampusEvents";

import AdmissionsOverview from "./components/Admissions/AdmissionsOverview";
import Requirements from "./components/Admissions/Requirements";
import Tuition from "./components/Admissions/Tuition";
import FAQ from "./components/Admissions/FAQ";
import OnlineApplication from "./components/Admissions/OnlineApplication";
import AdmissionProcess from "./components/Admissions/AdmissionProcess";
import ForApplicants from "./components/Admissions/ForApplicants";
import ForCitizensKG from "./components/Admissions/ForCitizensKG";
import ForForeignCitizens from "./components/Admissions/ForForeignCitizens";
import RequirementsCitizensKG from "./components/Admissions/Requirements/RequirementsCitizensKG";
import RequirementsForeignCitizens from "./components/Admissions/Requirements/RequirementsForeignCitizens";
import ApplyCitizensKG from "./components/Admissions/Apply/ApplyCitizensKG";
import ApplyForeignCitizens from "./components/Admissions/Apply/ApplyForeignCitizens";
import TuitionCitizensKG from "./components/Admissions/Tuition/TuitionCitizensKG";
import TuitionForeignCitizens from "./components/Admissions/Tuition/TuitionForeignCitizens";
import Committee from "./components/Admissions/Committee";
import Courses from "./components/Admissions/Courses";
import Procedure from "./components/Admissions/Procedure";
import Payments from "./components/Admissions/Payments";
import Scholarships from "./components/Admissions/Scholarships";

import News from "./components/News/News";
import NewsDetail from "./components/News/NewsDetail";
import NewsEvents from "./components/News/NewsEvents";
import NewsAnnouncements from "./components/News/NewsAnnouncements";

import Research from "./components/Research/research";
import Centers from "./components/Research/centers";
import Publications from "./components/Research/publications";
import Conferences from "./components/Research/conferences";
import Grants from "./components/Research/grants";
import ResearchManagement from "./components/Research/ResearchManagement";
import ScientificJournals from "./components/Research/ScientificJournals";

import Infrastructure from "./components/Infrastructure/Infrastructure";
import Hospitals from "./components/Infrastructure/Hospitals";
import Laboratories from "./components/Infrastructure/Laboratories";
import AcademicBuildings from "./components/Infrastructure/AcademicBuildings";
import Dormitories from "./components/Infrastructure/Dormitories";
import Audience from "./components/Infrastructure/Audience";
import Startups from "./components/Infrastructure/Startups";

import Contacts from "./components/Contacts/contacts";
import Media from "./components/Contacts/Media";
import MainRoutes from "./routes";

// Заглушка для временных страниц
const Page = ({ title }) => <div className="min-h-screen pt-20"><h1 className="text-2xl font-bold p-8">{title}</h1></div>;

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && ['ru', 'kg', 'en'].includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <Routes>
            {/* Главная */}
            <Route path="/" element={<Hero />} />

            {/* About */}
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/about/management" element={<Management />} />
            <Route path="/about/vacancies" element={<Careers />} />
            <Route path="/about/careers" element={<Careers />} />
            <Route path="/about/careers/:id" element={<VacancyDetail />} />
            <Route path="/about/partners" element={<Partners />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/advices" element={<Advices />} />
            <Route path="/about/status" element={<Status />} />
            <Route path="/about/founders" element={<Founders />} />
            <Route path="/about/structure" element={<Structure />} />
            <Route path="/about/achievements" element={<Achievements />} />

            {/* HSM */}
            <Route path="/hsm/programs" element={<HSM />} />
            <Route path="/hsm/eduprograms" element={<Programs />} />
            <Route path="/hsm/departments" element={<Deparments />} />
            <Route path="/hsm/calendar" element={<Calendar />} />
            <Route path="/hsm/resources" element={<Resources />} />
            <Route path="/hsm/accreditation" element={<HSMAccreditation />} />
            <Route path="/hsm/learning-goals" element={<HSMLearningGoals />} />
            <Route path="/hsm/about" element={<HSMInfo />} />
            <Route path="/hsm/AS" element={<HSMAcademicStuff />} />
            <Route path="/hsm/manage" element={<HSMManagement />} />
            <Route path="/hsm/partners" element={<Partners />} />
            <Route path="/hsm/cmk" element={<HSMCMK />} />

            {/* Admission */}
            <Route path="/admissions" element={<AdmissionsOverview />} />
            <Route path="/admissions/requirements" element={<Requirements />} />
            <Route path="/admissions/tuition" element={<Tuition />} />
            <Route path="/admissions/faq" element={<FAQ />} />
            <Route path="/admissions/apply" element={<OnlineApplication />} />
            <Route path="/admissions/process" element={<AdmissionProcess />} />
            <Route path="/admissions/applicants" element={<ForApplicants />} />
            <Route path="/admissions/applicants/citizens-kg" element={<ForCitizensKG />} />
            <Route path="/admissions/applicants/foreign-citizens" element={<ForForeignCitizens />} />
            <Route path="/admissions/requirements/citizens-kg" element={<RequirementsCitizensKG />} />
            <Route path="/admissions/requirements/foreign-citizens" element={<RequirementsForeignCitizens />} />
            <Route path="/admissions/apply/citizens-kg" element={<ApplyCitizensKG />} />
            <Route path="/admissions/apply/foreign-citizens" element={<ApplyForeignCitizens />} />
            <Route path="/admissions/tuition/citizens-kg" element={<TuitionCitizensKG />} />
            <Route path="/admissions/tuition/foreign-citizens" element={<TuitionForeignCitizens />} />
            <Route path="/admissions/committee" element={<Committee />} />
            <Route path="/admissions/courses" element={<Courses />} />
            <Route path="/admissions/procedure" element={<Procedure />} />
            <Route path="/admissions/payments" element={<Payments />} />

            {/* Infrastructure */}
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/infrastructure/hospitals" element={<Hospitals />} />
            <Route path="/infrastructure/laboratories" element={<Laboratories />} />
            <Route path="/infrastructure/dormitories" element={<Dormitories />} />
            <Route path="/infrastructure/audience" element={<Audience />} />
            <Route path="/infrastructure/startups" element={<Startups />} />

            {/* Research */}
            <Route path="/research" element={<Research />} />
            <Route path="/research/centers" element={<Centers />} />
            <Route path="/research/publications" element={<Publications />} />
            <Route path="/research/conferences" element={<Conferences />} />
            <Route path="/research/grants" element={<Grants />} />
            <Route path="/research/management" element={<ResearchManagement />} />
            <Route path="/research/journals" element={<ScientificJournals />} />

            {/* Student Life */}
            {/* <Route path="/student/gallery" element={<Gallery />} /> */}
            <Route path="/student/international" element={<InternationalStudents />} />
            <Route path="/student/internships" element={<Internships />} />
            <Route path="/student/academic-mobility" element={<AcademicMobility />} />
            <Route path="/student/regulations" element={<StudentRegulations />} />
            <Route path="/student/instructions" element={<Instructions />} />
            <Route path="/student/appeal" element={<AppealForm />} />
            <Route path="/student/clubs" element={<ClubsSection />} />
            <Route path="/student/calendar" element={<StudentCalendar />} />
            <Route path="/student/eresources" element={<StudentEResources />} />
            <Route path="/student/acadop" element={<AcadOp />} />
            <Route path="/student/socop" element={<SocOp />} />

            {/* News */}
            <Route path="/news" element={<News />} />
            <Route path="/news/detail/:id" element={<NewsDetail />} />
            <Route path="/news/events" element={<NewsEvents />} />
            <Route path="/news/announcements" element={<NewsAnnouncements />} />

            {/* Contacts */}
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/media" element={<Media />} />

            {/* Legacy routes */}
            <Route path="/admission" element={<AdmissionsOverview />} />
            <Route path="/admission/requirements" element={<Requirements />} />
            <Route path="/admission/tuition" element={<Tuition />} />
            <Route path="/admission/scholarships" element={<Scholarships />} />
            <Route path="/admission/apply" element={<OnlineApplication />} />
            <Route path="/campus-life" element={<LifeOverview />} />
            <Route path="/campus-life/events" element={<CampusEvents />} />
            <Route path="/campus-life/clubs" element={<ClubsSection />} />
            <Route path="/campus-life/gallery" element={<Gallery />} />
            <Route path="/campus-life/international" element={<InternationalStudents />} />

            {/* 404 */}
            <Route path="*" element={<Page title="Страница не найдена" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
