import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/data/projects";
import CaseStudy from "./CaseStudy";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — Case study · Shinas AR`,
    description: project.caseStudy.problem.slice(0, 160),
    openGraph: {
      title: `${project.title} — Case study`,
      description: project.caseStudy.problem.slice(0, 160),
      type: "article",
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
