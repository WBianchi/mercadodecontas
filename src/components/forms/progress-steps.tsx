import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Dados de Acesso",
    description: "Crie suas credenciais",
  },
  {
    title: "Dados da Empresa",
    description: "Informações do negócio",
  },
  {
    title: "Endereço",
    description: "Localização da empresa",
  },
  {
    title: "Documentação",
    description: "Envio de documentos",
  },
]

interface ProgressStepsProps {
  currentStep: number
  className?: string
}

export function ProgressSteps({ currentStep, className }: ProgressStepsProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="relative">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#097bff] to-blue-600 transition-all duration-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-sm">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={cn(
              "text-center space-y-1",
              index + 1 <= currentStep
                ? "text-blue-600"
                : "text-gray-400"
            )}
          >
            <div className="font-medium">{step.title}</div>
            <div className="text-xs">{step.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
