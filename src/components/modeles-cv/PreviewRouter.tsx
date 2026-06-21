import { CVStructure } from "@/types/cv";
import { TemplateSlug } from "@/lib/cv-templates";
import { SectionId } from "@/lib/cv-sections";
import CVPreview from "@/components/CVPreview";
import PreviewModerne from "./PreviewModerne";
import PreviewElegant from "./PreviewElegant";

type Props = {
  cv: CVStructure;
  templateSlug: TemplateSlug;
  fluid?: boolean;
  ordreSections?: SectionId[];
};

export default function PreviewRouter({ cv, templateSlug, fluid = false, ordreSections }: Props) {
  if (templateSlug === "moderne") return <PreviewModerne cv={cv} fluid={fluid} ordreSections={ordreSections} />;
  if (templateSlug === "elegant") return <PreviewElegant cv={cv} fluid={fluid} ordreSections={ordreSections} />;
  return <CVPreview cv={cv} fluid={fluid} ordreSections={ordreSections} />;
}
