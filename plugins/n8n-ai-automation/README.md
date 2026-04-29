# n8n AI Automation

Codex plugin scaffold for creating n8n AI automations. It includes a Codex skill, an importable starter workflow template, and a small renderer script for filling common workflow placeholders.

## Contents

- `.codex-plugin/plugin.json` - plugin manifest scaffold.
- `skills/n8n-ai-automation/SKILL.md` - workflow for designing and exporting n8n AI automations.
- `assets/webhook-ai-agent-template.json` - starter n8n workflow JSON for a webhook-driven AI agent.
- `scripts/render_workflow.py` - renders the workflow template with project-specific values.

## Render A Starter Workflow

```bash
python3 plugins/n8n-ai-automation/scripts/render_workflow.py \
  --output /tmp/n8n-ai-agent.json \
  --name "AI Intake Agent" \
  --webhook-path "ai-intake" \
  --system-prompt "Classify the request, ask one clarifying question if needed, and return concise next steps."
```

Import `/tmp/n8n-ai-agent.json` into n8n, then attach your credentials to the OpenAI Chat Model node before activating the workflow.

## Notes

- Secrets are not embedded in templates. Configure credentials inside n8n.
- The starter template is intentionally inactive on import.
- Keep author, repository, policy, and visual asset metadata in `plugin.json` as TODOs until you have the final publishing details.
