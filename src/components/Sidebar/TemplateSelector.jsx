import templates from '../../data/templates'

function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3 text-[#E67E22]">
        Templates
      </h2>
      <div className="space-y-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`
              w-full px-4 py-3 rounded text-left transition-all
              flex items-center gap-3
              ${selectedTemplate?.id === template.id
                ? 'bg-[#E67E22] text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }
            `}
          >
            <span className="text-2xl">{template.thumbnail}</span>
            <div className="flex-1">
              <div className="font-semibold">{template.name}</div>
              <div className="text-xs opacity-75 mt-0.5">
                {template.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default TemplateSelector
