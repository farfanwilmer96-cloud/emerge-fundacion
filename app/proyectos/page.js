import { Badge } from '@/components/ui/badge'
import { getAllProjects } from '@/lib/content'
import ProjectsGrid from '@/components/ProjectsGrid'

export const metadata = { title: 'Proyectos y Campañas — Funda Crecer' }

export default function ProyectosPage() {
  const projects = getAllProjects()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl">
        <Badge variant="outline" className="border-secondary/40 text-secondary">Nuestro trabajo</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-3">Proyectos y campañas</h1>
        <p className="text-muted-foreground mt-3 text-lg">Cada iniciativa nace de una necesidad concreta de la comunidad. Explorá en qué estamos trabajando y lo que ya logramos.</p>
      </div>

      <ProjectsGrid projects={projects} />
    </div>
  )
}
