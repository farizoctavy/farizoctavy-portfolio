import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import type { MouseEvent } from 'react'

import type { Project } from '@/data/projects'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSplashComplete } from '@/hooks/useSplashComplete'
import { getAppHref, navigateTo } from '@/lib/navigation'

export interface ProjectCardProps {
  index?: number
  project: Project
}

export function ProjectCard({ index = 0, project }: ProjectCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const splashComplete = useSplashComplete()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !project.href.startsWith('/')
    ) {
      return
    }

    event.preventDefault()
    navigateTo(project.href)
  }

  return (
    <motion.li
      className="border-b border-border-30 first:border-t"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={
        prefersReducedMotion
          ? undefined
          : {
              delay: index * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }
      }
      viewport={{ amount: 0.2, once: false }}
      whileInView={
        splashComplete && !prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : undefined
      }
    >
      <a
        aria-label={`View ${project.title} project`}
        className="group block px-0 py-5 transition-[padding-left,padding-right] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:px-0 focus-visible:px-0 focus-visible:outline-none motion-reduce:transition-none md:grid md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:gap-8 md:px-6 md:py-6 md:hover:px-14 md:focus-visible:px-14 lg:gap-12 lg:px-8 lg:py-8 lg:hover:px-16 lg:focus-visible:px-16"
        href={
          project.href.startsWith('/')
            ? getAppHref(project.href)
            : project.href
        }
        onClick={handleClick}
      >
        <div
          aria-label={project.imageSrc ? undefined : `${project.title} thumbnail coming soon`}
          className="aspect-[16/9] overflow-hidden bg-border-20"
          role={project.imageSrc ? undefined : 'img'}
        >
          {project.imageSrc ? (
            <img
              alt={project.imageAlt}
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              decoding="async"
              loading={index === 0 ? 'eager' : 'lazy'}
              src={project.imageSrc}
            />
          ) : (
            <span className="flex size-full items-center justify-center px-4 text-center text-body-s-regular text-body-70">
              Thumbnail coming soon
            </span>
          )}
        </div>

        <div className="mt-4 flex min-w-0 flex-col justify-between md:mt-0">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="mobile-project-title min-w-0 tracking-tight text-title-100">
                {project.title}
              </h3>
              <span
                aria-hidden="true"
                className="mt-0.5 block size-6 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none"
              >
                <ArrowUpRightIcon className="size-6" />
              </span>
            </div>
            <p className="mt-2 max-w-prose text-body-l-regular leading-snug text-body-70">
              {project.description}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-m-regular text-body-70">
            <span>{project.category}</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-body-70" />
            <span>{project.date}</span>
          </div>
        </div>
      </a>
    </motion.li>
  )
}
