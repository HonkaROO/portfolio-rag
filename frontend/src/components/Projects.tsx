import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { projects } from "@/data/resume";
import SectionKicker from "@/components/SectionKicker";
import TechnologyIcon from "@/components/TechnologyIcon";

type Project = (typeof projects)[number];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="scroll-anchor border-b border-border"
    >
      <div className="container py-20">
        <SectionKicker
          index="03"
          question="What has Christian built"
        />

        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Projects
          </h2>

          <p className="mt-3 text-muted-foreground max-w-2xl">
            A selection of systems, AI applications, and software projects
            I've worked on across engineering and project management.
          </p>
        </div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.button
              key={project.name}
              layoutId={`project-${project.name}`}
              onClick={() => setSelectedProject(project)}
              className="
                group
                relative
                text-left
                overflow-hidden
                rounded-2xl
                border border-border
                bg-card
                hover:border-accent/50
                transition-colors
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent
              "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              {/* IMAGE */}
              <motion.div
                layoutId={`project-image-${project.name}`}
                className="relative aspect-[16/9] overflow-hidden"
              >
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Image overlay */}
                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-black/10
                  to-transparent
                " />

                {/* Project number */}
                <span className="
                  absolute
                  top-4
                  left-4
                  font-mono
                  text-xs
                  text-white/70
                ">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Role */}
                <span className="
                  absolute
                  top-4
                  right-4
                  rounded-full
                  bg-black/40
                  backdrop-blur-sm
                  px-3
                  py-1
                  text-xs
                  text-white
                  border
                  border-white/10
                ">
                  {project.role}
                </span>

                {/* Title */}
                <div className="absolute bottom-5 left-5 right-5">
                  <motion.h3
                    layoutId={`project-title-${project.name}`}
                    className="
                      font-display
                      text-xl
                      md:text-2xl
                      font-bold
                      text-white
                    "
                  >
                    {project.name}
                  </motion.h3>
                </div>
              </motion.div>

              {/* CARD CONTENT */}
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-md
                        border
                        border-border
                        bg-background
                        px-2
                        py-1
                        text-xs
                        text-muted-foreground
                      "
                    >
                      <TechnologyIcon
                        name={tech}
                        size={14}
                      />
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="
                  text-sm
                  text-muted-foreground
                  line-clamp-2
                ">
                  {project.bullets[0]}
                </p>

                <div className="
                  mt-4
                  text-xs
                  font-medium
                  text-accent
                  opacity-0
                  translate-y-1
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  transition-all
                ">
                  View project →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* EXPANDED PROJECT */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="
                fixed
                inset-0
                z-[90]
                bg-black/70
                backdrop-blur-sm
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* MODAL */}
            <div
              className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                p-4
                md:p-8
                pointer-events-none
              "
            >
              <motion.div
                layoutId={`project-${selectedProject.name}`}
                className="
                  pointer-events-auto
                  relative
                  w-full
                  max-w-4xl
                  max-h-[90vh]
                  overflow-y-auto
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  shadow-2xl
                "
              >
                {/* CLOSE */}
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project"
                  className="
                    absolute
                    z-20
                    right-4
                    top-4
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-black/50
                    text-white
                    backdrop-blur-sm
                    hover:bg-black/70
                    transition-colors
                  "
                >
                  <X className="h-4 w-4" />
                </button>

                {/* HERO IMAGE */}
                <motion.div
                  layoutId={`project-image-${selectedProject.name}`}
                  className="
                    relative
                    aspect-[16/9]
                    overflow-hidden
                  "
                >
                  <img
                    src={selectedProject.images[0]}
                    alt={selectedProject.name}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                  <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/10
                    to-transparent
                  " />

                  <div className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                  ">
                    <span className="
                      text-xs
                      font-mono
                      text-white/70
                    ">
                      {selectedProject.role}
                    </span>

                    <motion.h3
                      layoutId={`project-title-${selectedProject.name}`}
                      className="
                        mt-1
                        font-display
                        text-2xl
                        md:text-4xl
                        font-bold
                        text-white
                      "
                    >
                      {selectedProject.name}
                    </motion.h3>
                  </div>
                </motion.div>

                {/* DETAILS */}
                <div className="p-6 md:p-8">
                  {/* STACK */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-md
                          border
                          border-border
                          bg-background
                          px-3
                          py-1.5
                          text-xs
                          text-muted-foreground
                        "
                      >
                        <TechnologyIcon
                          name={tech}
                          size={16}
                        />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* DESCRIPTION */}
                  <div className="space-y-4">
                    {selectedProject.bullets.map((bullet) => (
                      <p
                        key={bullet}
                        className="
                          text-sm
                          md:text-base
                          leading-relaxed
                          text-muted-foreground
                        "
                      >
                        {bullet}
                      </p>
                    ))}
                  </div>

                  {/* PROJECT GALLERY */}
                  {selectedProject.images.length > 1 && (
                    <div className="mt-8">
                      <h4 className="
                        mb-4
                        text-sm
                        font-medium
                      ">
                        Project screenshots
                      </h4>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {selectedProject.images
                          .slice(1)
                          .map((image, index) => (
                            <motion.img
                              key={image}
                              src={image}
                              alt={`${selectedProject.name} screenshot ${
                                index + 2
                              }`}
                              className="
                                w-full
                                rounded-xl
                                border
                                border-border
                                object-cover
                              "
                              initial={{
                                opacity: 0,
                                y: 15,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                delay: 0.15 + index * 0.08,
                              }}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}