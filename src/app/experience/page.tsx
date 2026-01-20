"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Saayam for All",
    location: "San-Jose, CA",
    period: "Aug 2025 - Present",
    description:
      "Cloud-native volunteer matching platform serving 10K+ active users across event-driven microservices architecture.",
    achievements: [
      "Built 6 domain-driven microservices (Volunteer, Request, Communications, Spatial, DataML, GenAI) using Spring Boot 3/JDK 17 on AWS EKS, orchestrating event workflows through Kafka (AWS MSK) for 10K+ charity volunteers",
      "Designed event-driven request matching system with Kafka producers/consumers for async volunteer coordination, leveraging AWS Lambda for serverless tasks and Redis (ElastiCache) for <50ms query performance",
      "Created polyglot service ecosystem: Java/Spring Boot for domain logic, Python/FastAPI for analytics/ML pipelines, React/React Native for responsive web/mobile experiences, secured via API Gateway + AWS Cognito OAuth2",
      "Implemented full DevOps lifecycle with CloudFormation IaC, comprehensive test coverage (JUnit/Mockito/Selenium), and production monitoring (CloudWatch/X-Ray/distributed tracing) achieving 99.9% platform reliability",
    ],
    current: false,
  },
  {
    title: "Full Stack Engineer Co-op",
    company: "Founderwayai",
    location: "Richmond, VA",
    period: "May 2024 - Aug 2024",
    description:
      "Integrated Generative AI (LLM APIs with RAG) into a SaaS platform, building Java/Spring Boot microservices and React/Express fullstack solutions.",
    achievements: [
      "Integrated Generative AI (LLM APIs with RAG) into a SaaS platform, building building Java/Spring Boot microservices and React/Express UIs with checks, surveys, GVM forms",
      "Engineered backend orchestration with prompt validation, error handling, and usage/cost tracking, backed by a PostgreSQL history service for reliable, auditable AI operations",
      "Built context checks and reusable React/Next.js UI components to validate inputs and streamline chat workflows, improving reusability, performance, and secure user interactions",
      "Deployed across multi-cloud environments (Azure, AWS S3, API Gateway) for serverless AI endpoints and Azure PaaS for orchestration, integrated with CI/CD pipelines for secure, automated delivery",
    ],
    current: false,
  },
  {
    title: "Senior Software Engineer",
    company: "Infosys Limited",
    location: "Pune, India",
    period: "Nov 2018 - Nov 2019",
    description:
      "Designed, developed, and deployed RESTful microservices and integration APIs in Spring Boot, improving service scalability.",
    achievements: [
      "Designed, developed, and deployed RESTful microservices and integration APIs in Spring Boot, leveraging MVC/SQL and JVM/XML messaging to improve service scalability, reducing provisioning cycle time by 30%, ensuring scalable and secure OSS/BSS data flow",
      "Led migration of legacy services to AWS Lambda, introducing EC2 for compute, S3 for storage, and IAM roles for fine-grained access control, improving scalability and compliance",
      "Refactored monolithic backend modules into independently deployable AWS-hosted microservices, integrated with CI/CD pipelines (Git, Jenkins), increasing deployment speed by 50%",
      "Implemented Infrastructure-as-Code (IaC) automation using Terraform and AWS CloudFormation templates, enhancing predictability and reducing manual intervention in AWS/OSS/BSS deployments",
    ],
    current: false,
  },
  {
    title: "Software Engineer",
    company: "Tech Mahindra Limited",
    location: "Pune, India & Leeds, UK",
    period: "Aug 2015 - Nov 2018",
    description:
      "Engineered and automated FTL pipelines using Java, PL/SQL, and shell scripts to extract, transform, and load large telecom order datasets.",
    achievements: [
      "Engineered and automated FTL pipelines using Java, PL/SQL, and shell scripts to extract, transform, and load large telecom order datasets across FTTC, FTTP, and TVA products, improving SI-A compliance and traceability by 45%",
      "Developed and maintained the ASG Portal, enabling bulk data extraction, log retrieval, and automated deployment checks, reducing manual intervention by 50%",
      "Collaborated with QA teams to design and execute unit, integration, and regression test cases using JUnit and Selenium, ensuring defect-free and faster turnaround",
      "Delivered RCA reports and Customer Service Improvement Plans (CSIP) under ITIL practices, coordinating with infrastructure teams to stabilize provisioning workflows and achieve 95% SLA adherence",
    ],
    current: false,
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Work <span className="text-red-600">Experience</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">My professional journey</p>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800" />

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-6 top-2 w-5 h-5 rounded-full border-4 ${
                      exp.current
                        ? "bg-red-600 border-red-600"
                        : "bg-gray-800 border-gray-700"
                    }`}
                  />

                  {/* Content card */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                    {/* Current badge */}
                    {exp.current && (
                      <span className="inline-block px-3 py-1 bg-red-600/10 text-red-600 text-sm rounded-full border border-red-600/20 mb-4">
                        Current
                      </span>
                    )}

                    {/* Title and company */}
                    <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>
                          {exp.company} • {exp.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-red-600 mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-400"
                          >
                            <span className="text-red-600 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
