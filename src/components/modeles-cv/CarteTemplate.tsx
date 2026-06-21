import Link from "next/link";
import { Template } from "@/lib/cv-templates";
import ApercuMini from "./ApercuMini";

export default function CarteTemplate({ template }: { template: Template }) {
  return (
    <Link
      href={`/modeles-cv/${template.slug}`}
      className="group bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
    >
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex justify-center">
        <div className="w-[180px]">
          <ApercuMini slug={template.slug} />
        </div>
      </div>
      <div className="flex-1 px-5 pt-4 pb-5">
        <h2 className="text-base font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-indigo-600 transition-colors duration-150">
          {template.nom}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">{template.tagline}</p>
      </div>
      <div className="px-5 pb-5">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
          Utiliser ce modèle
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
