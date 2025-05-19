'use client';
// filepath: d:\projects\Github projects\new_resume\src\app\page.tsx
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram, FaCode, FaLaptopCode, FaLanguage, FaUserFriends } from "react-icons/fa";
import { RiThreadsLine } from "react-icons/ri";
import { MdEmail, MdDownload, MdOutlineToll } from "react-icons/md";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import RepoListItem from "@/components/RepoListItem";
import ProjectCard from "@/components/ProjectCard";
import SkillCategory from "@/components/SkillCategory";
import SocialLink from "@/components/SocialLink";
import ClientOnly from "@/components/ClientOnly";
// Import the ScrollToTop component with dynamic import to avoid hydration issues
import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import BackgroundGradient from "@/components/BackgroundGradient";

// Dynamically import ScrollToTop with SSR disabled
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });

export default function Home() {
  const { repos, featuredRepos, isLoading } = useGithubRepos();
  const [pageLoaded, setPageLoaded] = useState(false);

  // Only show content after the page has been hydrated
  // This ensures client and server renders match
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    // Slight delay for smoother appearance
    const timer = setTimeout(() => {
      setPageLoaded(true);
      // Trigger animations after a brief delay
      setTimeout(() => setAnimationsReady(true), 100);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 font-[family-name:var(--font-geist-sans)] bg-[var(--background)]">
      <BackgroundGradient />
      <ScrollToTop />
      <div className="max-w-7xl mx-auto">
        {!pageLoaded ? (
          // Show a loading state before hydration completes
          <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-md animate-spin"></div>
              <div className="animate-pulse text-[var(--primary)]">
                Loading Portfolio...
              </div>
            </div>
          </div>
        ) : (
        /* Grid layout with 7 sections */
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-none gap-3 md:grid-rows-8 md:gap-4">

          {/* Section 1: Profile Photo */}
          <div className={`borderless-section md:row-span-2 md:col-span-1 relative p-0 overflow-hidden h-[400px] sm:h-auto group animate-entry animate-slideInLeft ${animationsReady ? 'animate-slideInLeft' : ''} rounded-[8px]`} style={{ animationDelay: '0.1s' }}>
            {/* No border, just the photo */}
            <div className="absolute inset-0 bg-[var(--secondary)] rounded-[8px] overflow-hidden shadow-lg">
              <Image 
                src="/profilephoto.png"
                alt="Hamad Ullah"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Section 2: About Me */}
          <div className={`portfolio-section md:col-span-3 md:row-span-2 flex flex-col justify-center animate-entry animate-slideInDown ${animationsReady ? 'animate-slideInDown' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className="mb-2 relative">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--primary)]">Hamad Ullah</h1>
              <div className="h-1 w-24 bg-[#565449] mt-2 rounded-md"></div>
            </div>
            <h2 className="text-lg md:text-xl text-[var(--primary)] opacity-80 mb-3">CS Student | AI Enthusiast</h2>
            <p className="mb-3 text-sm md:text-base text-[var(--primary)] opacity-90">
              I’m a CS bachelor’s student at the University of Eastern Finland, passionate about software development and AI. With skills in Python, Java, SQL, and web development, I aim to build efficient applications. My experience includes software development and robotics academic projects, applying coding, problem-solving, and critical thinking to real-world challenges. Outside tech, I’m an amateur footballer, bringing teamwork and discipline into my studies and personal growth.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="/ullah_hamad_cv.pdf" 
                download
                className="btn-primary w-fit flex items-center gap-2 text-sm hover-scale group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--background)] to-transparent opacity-0 group-hover:opacity-30 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></span>
                <MdDownload className="text-lg group-hover:animate-bounce-subtle" />
                Download CV
              </a>
              <span className="text-xs text-[var(--primary)] opacity-60">Updated May 2025</span>
            </div>
          </div>

          {/* Section 3: GitHub Projects List */}
          <div className={`portfolio-section md:row-span-4 md:col-start-5 flex flex-col animate-entry animate-slideInRight ${animationsReady ? 'animate-slideInRight' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="mb-3 relative">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--primary)]">
                  <FaGithub className="text-[var(--primary)]" /> 
                  GitHub Projects
                </h2>
              </div>
              <div className="h-1 w-24 bg-[#565449] mt-2 rounded-md"></div>
            </div>
            
            <div className="overflow-y-auto custom-scrollbar pr-2 px-0.5" style={{ height: "550px" }}>
              <ClientOnly
                fallback={
                  <div className="space-y-3 px-1">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="animate-shimmer rounded-md h-16 w-full"></div>
                    ))}
                  </div>
                }
              >
                {isLoading ? (
                  <div className="space-y-3 px-1">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="animate-shimmer rounded-xl h-16 w-full"></div>
                    ))}
                  </div>
                ) : (
                  repos.slice(0, 20).map((repo, index) => (
                    <div key={repo.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <RepoListItem repo={repo} />
                    </div>
                  ))
                )}
                <div className="h-2"></div>
              </ClientOnly>
            </div>
          </div>

          {/* Section 4: Skills & Technologies */}
          <div className={`portfolio-section md:col-span-3 md:row-span-3 md:row-start-3 overflow-auto animate-entry animate-slideInLeft ${animationsReady ? 'animate-slideInLeft' : ''}`} style={{ animationDelay: '0.4s' }}>
            <div className="mb-3 relative">
              <h2 className="text-xl font-bold text-[var(--primary)]">
                Skills & Technologies
              </h2>
              <div className="h-1 w-24 bg-[#565449] mt-1 rounded-md"></div>
            </div>
            
            <div className="space-y-3">
              <SkillCategory 
                title="Programming Languages" 
                icon={<FaCode />}
                skills={["Python", "JavaScript", "HTML/CSS","SQL", "Java", "Dart"]} 
              />
              
              <SkillCategory 
                title="Frameworks & UI Toolkits" 
                icon={<FaLaptopCode />}
                skills={["React", "Node.js", "TailwindCSS", "JavaFX", "Bootstrap", "Flutter"]} 
              />
              
              <SkillCategory 
                title="Development Tools" 
                icon={<MdOutlineToll />}
                skills={["Git", "GitHub", "Figma", "Azure DevOps", "Firebase", "Google Colab"]} 
              />
              
              <SkillCategory 
                title="Soft Skills" 
                icon={<FaUserFriends />}
                skills={["Problem Solving", "Teamwork", "Communication", "Time Management", "Adaptability", "Critical Thinking"]} 
              />
              
              <SkillCategory 
                title="Languages" 
                icon={<FaLanguage />}
                skills={["English (Fluent)", "Finnish* (A2.1)", "Urdu (Fluent)", "Pashto (Native)"]} 
              />
            </div>
          </div>

          {/* Section 5: Contact Information */}
          <div className={`portfolio-section md:row-span-2 md:col-start-4 md:row-start-3 flex flex-col animate-entry animate-slideInUp ${animationsReady ? 'animate-slideInUp' : ''}`} style={{ animationDelay: '0.5s' }}>
            <div className="mb-2 relative">
              <h2 className="text-xl font-bold text-[var(--primary)]">Contact Me</h2>
              <div className="h-1 w-24 bg-[#565449] mt-2 rounded-md"></div>
            </div>
            <p className="text-sm text-[var(--primary)] opacity-80 mb-2">Have a question or project in mind?</p>
            
            <div className="bg-[#565449] bg-opacity-20 p-2 rounded-md border border-[#565449] mb-3 text-center">
              <p className="text-xs text-[var(--primary)] opacity-90">Let&apos;s collaborate and build something amazing together!</p>
            </div>
            
            <a 
              href="mailto:hamad5427449@gmail.com"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-auto text-sm group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--background)] to-transparent opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></span>
              <MdEmail className="group-hover:scale-110 transition-transform duration-300" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Section 6: Social Media Links */}
          <div className={`portfolio-section md:col-span-2 md:col-start-4 md:row-start-5 flex flex-col animate-entry animate-slideInRight ${animationsReady ? 'animate-slideInRight' : ''}`} style={{ animationDelay: '0.6s' }}>
            <div className="mb-3 relative">
              <h2 className="text-xl font-bold text-[var(--primary)]">
                Connect With Me
              </h2>
              <div className="h-1 w-24 bg-[#565449] mt-2 rounded-md"></div>
            </div>
            <div className="flex justify-center gap-4 mt-auto">
              <SocialLink 
                href="https://linkedin.com/in/hammadaiy" 
                Icon={FaLinkedin} 
                label="LinkedIn" 
              />
              <SocialLink 
                href="https://github.com/hammadaiy" 
                Icon={FaGithub} 
                label="GitHub" 
              />
              <SocialLink 
                href="https://instagram.com/hammadaiy" 
                Icon={FaInstagram} 
                label="Instagram" 
              />
              <SocialLink 
                href="https://threads.net/hammadaiy" 
                Icon={RiThreadsLine} 
                label="Threads" 
              />
            </div>
          </div>

          {/* Section 7: Featured Projects */}
          <div className={`borderless-section md:col-span-5 md:row-span-4 md:row-start-6 animate-entry animate-scaleFadeIn ${animationsReady ? 'animate-scaleFadeIn' : ''} p-3`} style={{ animationDelay: '0.7s' }}>
            <div className="mb-3 relative">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[var(--primary)]">Featured Projects</h2>
                <div className="flex items-center gap-1.5 text-xs text-[var(--primary)] opacity-70 group">
              
                  
                </div>
              </div>
              <div className="h-1 w-24 bg-[#565449] mt-2 rounded-md"></div>
            </div>
            
            <ClientOnly
              fallback={
                <div className="flex gap-4 overflow-x-auto h-[330px] items-center px-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="animate-shimmer rounded-md h-[280px] min-w-[300px] sm:min-w-[340px]"></div>
                  ))}
                </div>
              }
            >
              {isLoading ? (
                <div className="flex gap-4 overflow-x-auto h-[330px] items-center px-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="animate-shimmer rounded-md h-[280px] min-w-[300px] sm:min-w-[340px]"></div>
                  ))}
                </div>
              ) : (
                <div className="relative h-[320px] flex items-center">
                  {/* Left scroll button (hidden on mobile) */}
                  <button 
                    className="hidden md:flex absolute left-0 z-10 h-12 w-8 items-center justify-center bg-[rgba(23,23,23,0.4)] text-[var(--primary)] rounded-r-md hover:bg-[rgba(23,23,23,0.6)] transition-all duration-300 opacity-70 hover:opacity-100 backdrop-blur-sm"
                    onClick={() => {
                      const container = document.querySelector('.featured-scroll-container');
                      if (container) {
                        container.scrollBy({ left: -350, behavior: 'smooth' });
                      }
                    }}
                  >
                    ←
                  </button>
                  
                  {/* Scrollable content */}
                  <div 
                    className="featured-scroll-container overflow-x-auto hide-scrollbar snap-x snap-mandatory h-full w-full flex items-center scroll-smooth"
                  >
                    <div className="flex gap-6 px-2">
                      {/* Projects */}
                      {featuredRepos.map((project, index) => (
                        <div 
                          key={project.id} 
                          className="animate-fade-in w-[300px] sm:w-[340px] snap-start" 
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <ProjectCard project={project} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right scroll button (hidden on mobile) */}
                  <button 
                    className="hidden md:flex absolute right-0 z-10 h-12 w-8 items-center justify-center bg-[rgba(23,23,23,0.4)] text-[var(--primary)] rounded-l-md hover:bg-[rgba(23,23,23,0.6)] transition-all duration-300 opacity-70 hover:opacity-100 backdrop-blur-sm"
                    onClick={() => {
                      const container = document.querySelector('.featured-scroll-container');
                      if (container) {
                        container.scrollBy({ left: 350, behavior: 'smooth' });
                      }
                    }}
                  >
                    →
                  </button>
                </div>
              )}
            </ClientOnly>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
